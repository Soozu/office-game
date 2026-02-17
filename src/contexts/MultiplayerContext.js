import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
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
    const [opponentName, setOpponentName] = useState('');
    const [opponentScore, setOpponentScore] = useState(0);
    const [opponentCorrect, setOpponentCorrect] = useState(0);
    const [opponentAnswered, setOpponentAnswered] = useState(-1);
    const [opponentFinished, setOpponentFinished] = useState(false);
    const [roomId, setRoomId] = useState('');
    const [questions, setQuestions] = useState([]);
    const [gameConfig, setGameConfig] = useState(null);
    const [gameReady, setGameReady] = useState(false);
    const [serverIp, setServerIp] = useState(getDevServerIp());

    const messageCleanupRef = useRef(null);

    // Register message handler for game-level messages
    const setupMessageHandler = useCallback(() => {
        if (messageCleanupRef.current) {
            messageCleanupRef.current();
        }

        const cleanup = networkService.onMessage((type, payload) => {
            switch (type) {
                case 'GUEST_JOINED':
                    // Host receives this when a guest joins the room
                    setIsConnected(true);
                    break;

                case 'PLAYER_INFO':
                    setOpponentName(payload.name);
                    break;

                case 'GAME_CONFIG':
                    setGameConfig(payload);
                    break;

                case 'GAME_START':
                    setQuestions(payload.questions);
                    setGameReady(true);
                    setOpponentScore(0);
                    setOpponentCorrect(0);
                    setOpponentAnswered(-1);
                    setOpponentFinished(false);
                    break;

                case 'ANSWER_SUBMITTED':
                    setOpponentScore(payload.score);
                    setOpponentCorrect(payload.correctAnswers);
                    setOpponentAnswered(payload.questionIndex);
                    break;

                case 'GAME_OVER':
                    setOpponentScore(payload.finalScore);
                    setOpponentCorrect(payload.correctAnswers);
                    setOpponentFinished(true);
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
    const createRoom = useCallback(async (name, relayIp) => {
        setIsHost(true);
        setPlayerName(name);
        setOpponentScore(0);
        setOpponentCorrect(0);
        setOpponentAnswered(-1);
        setOpponentFinished(false);
        setGameReady(false);

        if (relayIp) setServerIp(relayIp);
        const ip = relayIp || serverIp;

        setupMessageHandler();
        const code = await networkService.createRoom(ip);
        setRoomId(code);
        return code;
    }, [serverIp, setupMessageHandler]);

    // ── Guest: join room via relay ─────────────────────────────────
    const joinRoom = useCallback(async (relayIp, code, name) => {
        setIsHost(false);
        setPlayerName(name);
        setOpponentScore(0);
        setOpponentCorrect(0);
        setOpponentAnswered(-1);
        setOpponentFinished(false);
        setGameReady(false);

        if (relayIp) setServerIp(relayIp);
        setupMessageHandler();
        await networkService.joinRoom(relayIp || serverIp, code);
        setIsConnected(true);
        setRoomId(code);

        // Send our name to the host
        networkService.sendMessage('PLAYER_INFO', { name });
    }, [serverIp, setupMessageHandler]);

    // ── Host: start the game ───────────────────────────────────────
    const startGame = useCallback((appId, difficulty, questionList) => {
        setQuestions(questionList);
        setGameReady(true);
        setOpponentScore(0);
        setOpponentCorrect(0);
        setOpponentAnswered(-1);
        setOpponentFinished(false);

        networkService.sendMessage('GAME_CONFIG', { appId, difficulty });
        networkService.sendMessage('GAME_START', { questions: questionList });
    }, []);

    // ── Submit answer (both sides) ─────────────────────────────────
    const submitAnswer = useCallback((questionIndex, isCorrect, score, correctAnswers) => {
        networkService.sendMessage('ANSWER_SUBMITTED', {
            questionIndex, isCorrect, score, correctAnswers,
        });
    }, []);

    // ── End game (both sides) ──────────────────────────────────────
    const endGame = useCallback((finalScore, correctAnswers) => {
        networkService.sendMessage('GAME_OVER', { finalScore, correctAnswers });
    }, []);

    // ── Disconnect ─────────────────────────────────────────────────
    const disconnect = useCallback(() => {
        networkService.disconnect();
        setIsHost(false);
        setIsConnected(false);
        setOpponentName('');
        setOpponentScore(0);
        setOpponentCorrect(0);
        setOpponentAnswered(-1);
        setOpponentFinished(false);
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
        opponentName,
        opponentScore,
        opponentCorrect,
        opponentAnswered,
        opponentFinished,
        roomId,
        serverIp,
        questions,
        gameConfig,
        gameReady,
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
