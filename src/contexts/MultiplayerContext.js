import React, { createContext, useContext, useState, useCallback, useRef, useEffect, useMemo } from 'react';
import Constants from 'expo-constants';
import networkService from '../services/NetworkService';

const MultiplayerContext = createContext();

export const useMultiplayer = () => {
    const context = useContext(MultiplayerContext);
    if (!context) {
        throw new Error('useMultiplayer must be used within a MultiplayerProvider');
    }
    return context;
};

/**
 * Try to auto-detect the dev machine's IP from the Expo dev server URL.
 * Falls back to empty string (user must enter manually).
 */
const getDevServerIp = () => {
    try {
        const hostUri =
            Constants.expoConfig?.hostUri ||
            Constants.manifest?.debuggerHost ||
            Constants.manifest2?.extra?.expoGo?.debuggerHost ||
            '';
        return hostUri.split(':')[0] || '';
    } catch {
        return '';
    }
};

export const MultiplayerProvider = ({ children }) => {
    const [isHost, setIsHost] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [playerName, setPlayerName] = useState('');
    const [roomId, setRoomId] = useState('');
    const [questions, setQuestions] = useState([]);
    const [gameConfig, setGameConfig] = useState(null);
    const [gameReady, setGameReady] = useState(false);
    const [serverIp, setServerIp] = useState(getDevServerIp());

    // ── N-player state ─────────────────────────────────────────────
    // players = { [playerId]: { name, score, correctAnswers, answered, finished } }
    const [players, setPlayers] = useState({});

    const messageCleanupRef = useRef(null);
    const playerNameRef = useRef(playerName);

    // Derived: how many opponents are connected
    const connectedCount = useMemo(() => Object.keys(players).length, [players]);

    // Derived: have ALL opponents finished?
    const allOpponentsFinished = useMemo(() => {
        const ids = Object.keys(players);
        if (ids.length === 0) return false;
        return ids.every((id) => players[id].finished);
    }, [players]);

    // ── Backward compat helpers (for screens that still reference a single opponent) ──
    const opponentName = useMemo(() => {
        const ids = Object.keys(players);
        return ids.length > 0 ? players[ids[0]]?.name || '' : '';
    }, [players]);

    const opponentScore = useMemo(() => {
        const ids = Object.keys(players);
        return ids.length > 0 ? players[ids[0]]?.score || 0 : 0;
    }, [players]);

    const opponentCorrect = useMemo(() => {
        const ids = Object.keys(players);
        return ids.length > 0 ? players[ids[0]]?.correctAnswers || 0 : 0;
    }, [players]);

    const opponentAnswered = useMemo(() => {
        const ids = Object.keys(players);
        return ids.length > 0 ? players[ids[0]]?.answered ?? -1 : -1;
    }, [players]);

    const opponentFinished = useMemo(() => allOpponentsFinished, [allOpponentsFinished]);

    // ── Message handler ────────────────────────────────────────────
    const setupMessageHandler = useCallback(() => {
        if (messageCleanupRef.current) {
            messageCleanupRef.current();
        }

        const cleanup = networkService.onMessage((type, payload) => {
            const senderId = payload?.senderId;

            switch (type) {
                // Server tells us a new player joined the room
                case 'PLAYER_JOINED':
                    setPlayers((prev) => ({
                        ...prev,
                        [payload.playerId]: { name: '', score: 0, correctAnswers: 0, answered: -1, finished: false },
                    }));
                    setIsConnected(true);
                    // Send our name so the new player (and everyone) knows who we are
                    networkService.sendMessage('PLAYER_INFO', { name: playerNameRef.current });
                    break;

                // A player sent their name
                case 'PLAYER_INFO':
                    if (senderId) {
                        setPlayers((prev) => ({
                            ...prev,
                            [senderId]: { ...(prev[senderId] || { score: 0, correctAnswers: 0, answered: -1, finished: false }), name: payload.name },
                        }));
                    }
                    break;

                case 'GAME_CONFIG':
                    setGameConfig(payload);
                    break;

                case 'GAME_START':
                    setQuestions(payload.questions);
                    setGameReady(true);
                    // Reset scores for all known players
                    setPlayers((prev) => {
                        const reset = {};
                        for (const id of Object.keys(prev)) {
                            reset[id] = { ...prev[id], score: 0, correctAnswers: 0, answered: -1, finished: false };
                        }
                        return reset;
                    });
                    break;

                case 'ANSWER_SUBMITTED':
                    if (senderId) {
                        setPlayers((prev) => ({
                            ...prev,
                            [senderId]: {
                                ...(prev[senderId] || { name: '', finished: false }),
                                score: payload.score,
                                correctAnswers: payload.correctAnswers,
                                answered: payload.questionIndex,
                            },
                        }));
                    }
                    break;

                case 'GAME_OVER':
                    if (senderId) {
                        setPlayers((prev) => ({
                            ...prev,
                            [senderId]: {
                                ...(prev[senderId] || { name: '', answered: -1 }),
                                score: payload.finalScore,
                                correctAnswers: payload.correctAnswers,
                                finished: true,
                            },
                        }));
                    }
                    break;

                case 'PLAYER_LEFT':
                    if (payload.playerId) {
                        setPlayers((prev) => {
                            const next = { ...prev };
                            delete next[payload.playerId];
                            return next;
                        });
                        // If no players left, mark disconnected
                        setPlayers((prev) => {
                            if (Object.keys(prev).length === 0) setIsConnected(false);
                            return prev;
                        });
                    }
                    break;

                case 'DISCONNECTED':
                    setIsConnected(false);
                    break;

                default:
                    break;
            }
        });

        messageCleanupRef.current = cleanup;
    }, []);

    // ── Host: create room via relay ────────────────────────────────
    const createRoom = useCallback(async (name) => {
        setIsHost(true);
        setPlayerName(name);
        playerNameRef.current = name;
        setPlayers({});
        setGameReady(false);

        setupMessageHandler();
        const code = await networkService.createRoom(serverIp);
        setRoomId(code);
        return code;
    }, [serverIp, setupMessageHandler]);

    // ── Guest: join room via relay ─────────────────────────────────
    const joinRoom = useCallback(async (code, name) => {
        setIsHost(false);
        setPlayerName(name);
        playerNameRef.current = name;
        setPlayers({});
        setGameReady(false);

        setupMessageHandler();
        await networkService.joinRoom(serverIp, code);
        setIsConnected(true);
        setRoomId(code);

        // Send our name to everyone in the room
        networkService.sendMessage('PLAYER_INFO', { name });
    }, [serverIp, setupMessageHandler]);

    // ── Host: start the game ───────────────────────────────────────
    const startGame = useCallback((appId, difficulty, questionList) => {
        setQuestions(questionList);
        setGameReady(true);
        // Reset all player scores
        setPlayers((prev) => {
            const reset = {};
            for (const id of Object.keys(prev)) {
                reset[id] = { ...prev[id], score: 0, correctAnswers: 0, answered: -1, finished: false };
            }
            return reset;
        });

        networkService.sendMessage('GAME_CONFIG', { appId, difficulty });
        networkService.sendMessage('GAME_START', { questions: questionList });
    }, []);

    // ── Submit answer (all players) ────────────────────────────────
    const submitAnswer = useCallback((questionIndex, isCorrect, score, correctAnswers) => {
        networkService.sendMessage('ANSWER_SUBMITTED', {
            questionIndex, isCorrect, score, correctAnswers,
        });
    }, []);

    // ── End game (all players) ─────────────────────────────────────
    const endGame = useCallback((finalScore, correctAnswers) => {
        networkService.sendMessage('GAME_OVER', { finalScore, correctAnswers });
    }, []);

    // ── Disconnect ─────────────────────────────────────────────────
    const disconnect = useCallback(() => {
        networkService.disconnect();
        setIsHost(false);
        setIsConnected(false);
        setPlayers({});
        setRoomId('');
        setQuestions([]);
        setGameConfig(null);
        setGameReady(false);
        if (messageCleanupRef.current) {
            messageCleanupRef.current();
            messageCleanupRef.current = null;
        }
    }, []);

    useEffect(() => {
        return () => { disconnect(); };
    }, []);

    const value = {
        isHost,
        isConnected,
        playerName,
        roomId,
        questions,
        gameConfig,
        gameReady,
        // N-player state
        players,
        connectedCount,
        allOpponentsFinished,
        // Backward compat (single-opponent aliases)
        opponentName,
        opponentScore,
        opponentCorrect,
        opponentAnswered,
        opponentFinished,
        // Actions
        createRoom,
        joinRoom,
        startGame,
        submitAnswer,
        endGame,
        disconnect,
    };

    return (
        <MultiplayerContext.Provider value={value}>
            {children}
        </MultiplayerContext.Provider>
    );
};
