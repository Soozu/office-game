import React, { useState, useEffect } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, TextInput,
    ScrollView, ActivityIndicator, Alert, KeyboardAvoidingView, Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useMultiplayer } from '../contexts/MultiplayerContext';
import { questionsData } from '../data/questions';
import { useLanguage } from '../contexts/LanguageContext';

const applications = [
    { id: 'msword', name: 'MS Word', icon: '📝', color: '#2B579A' },
    { id: 'powerpoint', name: 'PowerPoint', icon: '📊', color: '#D24726' },
    { id: 'excel', name: 'Excel', icon: '📈', color: '#217346' },
];

const difficulties = [
    { id: 'easy', label: 'Easy', icon: '🙂', color: '#27AE60' },
    { id: 'medium', label: 'Medium', icon: '😎', color: '#3498DB' },
    { id: 'hard', label: 'Hard', icon: '🔥', color: '#9B59B6' },
];

const EMPTY_OPTION = () => ({ text: '' });

export default function MultiplayerLobbyScreen({ route, navigation }) {
    const { mode, playerName } = route.params;
    const isHostMode = mode === 'host';
    const { getLanguageSuffix } = useLanguage();

    const {
        createRoom, joinRoom, startGame, isConnected,
        opponentName, roomId, serverIp, disconnect, gameReady,
    } = useMultiplayer();

    const [relayIp, setRelayIp] = useState(serverIp || '');
    const [joinCode, setJoinCode] = useState('');
    const [selectedApp, setSelectedApp] = useState(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [roomCreated, setRoomCreated] = useState(false);
    const [error, setError] = useState('');

    // Quiz mode: 'preset' or 'custom'
    const [quizMode, setQuizMode] = useState('preset');

    // Custom question builder state
    const [customQuestions, setCustomQuestions] = useState([]);
    const [cqQuestion, setCqQuestion] = useState('');
    const [cqOptions, setCqOptions] = useState(['', '', '', '']);
    const [cqCorrect, setCqCorrect] = useState(null); // index 0-3
    const [cqPoints, setCqPoints] = useState('10');

    const handleCreateRoom = async () => {
        if (!relayIp.trim()) return;
        try {
            setIsLoading(true);
            setError('');
            await createRoom(playerName, relayIp.trim());
            setRoomCreated(true);
        } catch (err) {
            setError('Failed to create room: ' + (err?.message || err));
        } finally {
            setIsLoading(false);
        }
    };

    const handleJoinRoom = async () => {
        if (!relayIp.trim() || !joinCode.trim()) return;
        try {
            setIsLoading(true);
            setError('');
            await joinRoom(relayIp.trim(), joinCode.trim().toUpperCase(), playerName);
        } catch (err) {
            setError('Failed to join: ' + (err?.message || err));
        } finally {
            setIsLoading(false);
        }
    };

    // ── Add a custom question ──────────────────────────────────────
    const handleAddCustomQuestion = () => {
        if (!cqQuestion.trim()) {
            Alert.alert('Missing', 'Enter a question.');
            return;
        }
        const filledOptions = cqOptions.filter((o) => o.trim());
        if (filledOptions.length < 2) {
            Alert.alert('Missing', 'Enter at least 2 answer options.');
            return;
        }
        if (cqCorrect === null || !cqOptions[cqCorrect]?.trim()) {
            Alert.alert('Missing', 'Select which answer is correct.');
            return;
        }

        const newQ = {
            id: Date.now(),
            question: cqQuestion.trim(),
            options: cqOptions.map((o) => o.trim() || '—'),
            correctAnswer: cqCorrect,
            points: parseInt(cqPoints, 10) || 10,
        };

        setCustomQuestions([...customQuestions, newQ]);
        // Reset form
        setCqQuestion('');
        setCqOptions(['', '', '', '']);
        setCqCorrect(null);
        setCqPoints('10');
    };

    const handleRemoveCustomQuestion = (id) => {
        setCustomQuestions(customQuestions.filter((q) => q.id !== id));
    };

    // ── Start game ─────────────────────────────────────────────────
    const handleStartGame = () => {
        if (!isConnected) return;

        let pool;

        if (quizMode === 'preset') {
            if (!selectedApp || !selectedDifficulty) return;

            const languageSuffix = getLanguageSuffix();
            const languageKey = `${selectedApp}${languageSuffix}`;
            const questionSource = questionsData[languageKey] || questionsData[selectedApp];

            if (!questionSource || !questionSource[selectedDifficulty]) {
                Alert.alert('Error', 'No questions available for this selection.');
                return;
            }

            pool = [...questionSource[selectedDifficulty]];
            // Shuffle
            for (let i = pool.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [pool[i], pool[j]] = [pool[j], pool[i]];
            }
        } else {
            // Custom mode
            if (customQuestions.length === 0) {
                Alert.alert('No Questions', 'Add at least one custom question before starting.');
                return;
            }
            pool = [...customQuestions];
        }

        const appId = quizMode === 'preset' ? selectedApp : 'custom';
        const difficulty = quizMode === 'preset' ? selectedDifficulty : 'custom';

        startGame(appId, difficulty, pool);
        navigation.replace('MultiplayerQuiz', { appId, difficulty });
    };

    const handleBack = () => {
        disconnect();
        navigation.goBack();
    };

    // Guest: auto-navigate when host starts the game
    useEffect(() => {
        if (!isHostMode && gameReady) {
            navigation.replace('MultiplayerQuiz', { appId: null, difficulty: null });
        }
    }, [gameReady, isHostMode]);

    // Check if start is allowed
    const canStart =
        isConnected &&
        (quizMode === 'preset'
            ? selectedApp && selectedDifficulty
            : customQuestions.length > 0);

    // ── Custom question form ───────────────────────────────────────
    const renderCustomQuestionForm = () => (
        <View style={styles.customSection}>
            <Text style={styles.sectionLabel}>✏️ Add Custom Question</Text>

            <View style={styles.formCard}>
                {/* Question text */}
                <Text style={styles.formLabel}>Question</Text>
                <TextInput
                    style={styles.formInput}
                    value={cqQuestion}
                    onChangeText={setCqQuestion}
                    placeholder="Type your question here..."
                    placeholderTextColor="rgba(255,255,255,0.3)"
                    multiline
                />

                {/* Options */}
                <Text style={styles.formLabel}>Answer Options (tap to mark correct)</Text>
                {cqOptions.map((opt, idx) => (
                    <View key={idx} style={styles.optionRow}>
                        <TouchableOpacity
                            style={[
                                styles.correctRadio,
                                cqCorrect === idx && styles.correctRadioSelected,
                            ]}
                            onPress={() => setCqCorrect(idx)}
                        >
                            <Text style={styles.correctRadioText}>
                                {cqCorrect === idx ? '✓' : String.fromCharCode(65 + idx)}
                            </Text>
                        </TouchableOpacity>
                        <TextInput
                            style={[styles.optionInput, cqCorrect === idx && styles.optionInputSelected]}
                            value={opt}
                            onChangeText={(text) => {
                                const updated = [...cqOptions];
                                updated[idx] = text;
                                setCqOptions(updated);
                            }}
                            placeholder={`Option ${String.fromCharCode(65 + idx)}`}
                            placeholderTextColor="rgba(255,255,255,0.25)"
                        />
                    </View>
                ))}

                {/* Points */}
                <View style={styles.pointsRow}>
                    <Text style={styles.formLabel}>Points</Text>
                    <TextInput
                        style={styles.pointsInput}
                        value={cqPoints}
                        onChangeText={setCqPoints}
                        keyboardType="numeric"
                        maxLength={3}
                    />
                </View>

                {/* Add button */}
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={handleAddCustomQuestion}
                    activeOpacity={0.85}
                >
                    <Text style={styles.addButtonText}>+ Add Question</Text>
                </TouchableOpacity>
            </View>

            {/* Added questions list */}
            {customQuestions.length > 0 && (
                <View style={styles.addedSection}>
                    <Text style={styles.sectionLabel}>
                        📋 Your Questions ({customQuestions.length})
                    </Text>
                    {customQuestions.map((q, idx) => (
                        <View key={q.id} style={styles.addedCard}>
                            <View style={styles.addedHeader}>
                                <Text style={styles.addedIndex}>Q{idx + 1}</Text>
                                <Text style={styles.addedPoints}>+{q.points} pts</Text>
                                <TouchableOpacity
                                    onPress={() => handleRemoveCustomQuestion(q.id)}
                                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                >
                                    <Text style={styles.removeBtn}>✕</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.addedQuestion} numberOfLines={2}>
                                {q.question}
                            </Text>
                            <View style={styles.addedOptions}>
                                {q.options.map((o, oi) => (
                                    <Text
                                        key={oi}
                                        style={[
                                            styles.addedOption,
                                            oi === q.correctAnswer && styles.addedOptionCorrect,
                                        ]}
                                        numberOfLines={1}
                                    >
                                        {String.fromCharCode(65 + oi)}. {o}
                                    </Text>
                                ))}
                            </View>
                        </View>
                    ))}
                </View>
            )}
        </View>
    );

    // ── HOST view ──────────────────────────────────────────────────
    const renderHostView = () => (
        <>
            {/* Step 1: Enter relay server IP */}
            {!roomCreated ? (
                <View style={styles.statusCard}>
                    <Text style={styles.statusLabel}>Step 1 — Connect to Relay Server</Text>
                    <Text style={styles.ipHint}>
                        Enter the IP of the computer running the relay server{'\n'}
                        (same machine as your Expo dev server)
                    </Text>
                    <TextInput
                        style={styles.ipInput}
                        value={relayIp}
                        onChangeText={setRelayIp}
                        placeholder="e.g. 192.168.1.100"
                        placeholderTextColor="rgba(255,255,255,0.3)"
                        keyboardType="numeric"
                        autoCapitalize="none"
                    />
                    <TouchableOpacity
                        style={[styles.connectButton, (!relayIp.trim() || isLoading) && styles.buttonDisabled]}
                        onPress={handleCreateRoom}
                        disabled={!relayIp.trim() || isLoading}
                        activeOpacity={0.85}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.connectButtonText}>Create Room</Text>
                        )}
                    </TouchableOpacity>
                    {error ? <Text style={styles.errorText}>{error}</Text> : null}
                </View>
            ) : (
                <>
                    {/* Step 2: Show room code + wait for guest */}
                    <View style={styles.statusCard}>
                        <Text style={styles.statusLabel}>Room Created!</Text>
                        <View style={styles.roomCodeDisplay}>
                            <Text style={styles.roomCodeLabel}>Room Code</Text>
                            <Text style={styles.roomCodeValue}>{roomId}</Text>
                            <Text style={styles.ipHint}>Share this code with your opponent</Text>
                        </View>
                        <View style={[styles.connectionBadge, isConnected ? styles.connectedBadge : styles.waitingBadge]}>
                            <Text style={styles.connectionBadgeText}>
                                {isConnected ? `✅ ${opponentName || 'Player'} connected!` : '⏳ Waiting for opponent...'}
                            </Text>
                        </View>
                    </View>

                    {/* Quiz Mode Toggle */}
                    <View style={styles.modeToggleContainer}>
                        <Text style={styles.sectionLabel}>Quiz Mode</Text>
                        <View style={styles.modeToggle}>
                            <TouchableOpacity
                                style={[styles.modeToggleBtn, quizMode === 'preset' && styles.modeToggleBtnActive]}
                                onPress={() => setQuizMode('preset')}
                                activeOpacity={0.85}
                            >
                                <Text style={[styles.modeToggleBtnText, quizMode === 'preset' && styles.modeToggleBtnTextActive]}>
                                    📚 Preset
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modeToggleBtn, quizMode === 'custom' && styles.modeToggleBtnActive]}
                                onPress={() => setQuizMode('custom')}
                                activeOpacity={0.85}
                            >
                                <Text style={[styles.modeToggleBtnText, quizMode === 'custom' && styles.modeToggleBtnTextActive]}>
                                    ✏️ Custom
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Preset: App + Difficulty selection */}
                    {quizMode === 'preset' && (
                        <>
                            <View style={styles.selectionSection}>
                                <Text style={styles.sectionLabel}>Choose Application</Text>
                                <View style={styles.selectionGrid}>
                                    {applications.map((app) => (
                                        <TouchableOpacity
                                            key={app.id}
                                            style={[
                                                styles.selectionCard,
                                                { borderColor: selectedApp === app.id ? app.color : 'rgba(255,255,255,0.1)' },
                                                selectedApp === app.id && { backgroundColor: `${app.color}25` },
                                            ]}
                                            onPress={() => setSelectedApp(app.id)}
                                            activeOpacity={0.85}
                                        >
                                            <Text style={styles.selectionIcon}>{app.icon}</Text>
                                            <Text style={styles.selectionName}>{app.name}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>

                            <View style={styles.selectionSection}>
                                <Text style={styles.sectionLabel}>Choose Difficulty</Text>
                                <View style={styles.selectionGrid}>
                                    {difficulties.map((d) => (
                                        <TouchableOpacity
                                            key={d.id}
                                            style={[
                                                styles.selectionCard,
                                                { borderColor: selectedDifficulty === d.id ? d.color : 'rgba(255,255,255,0.1)' },
                                                selectedDifficulty === d.id && { backgroundColor: `${d.color}25` },
                                            ]}
                                            onPress={() => setSelectedDifficulty(d.id)}
                                            activeOpacity={0.85}
                                        >
                                            <Text style={styles.selectionIcon}>{d.icon}</Text>
                                            <Text style={styles.selectionName}>{d.label}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>
                        </>
                    )}

                    {/* Custom: question builder */}
                    {quizMode === 'custom' && renderCustomQuestionForm()}

                    {/* Start button */}
                    <TouchableOpacity
                        style={[styles.startButton, !canStart && styles.buttonDisabled]}
                        onPress={handleStartGame}
                        disabled={!canStart}
                        activeOpacity={0.85}
                    >
                        <Text style={styles.startButtonText}>
                            {!isConnected
                                ? 'Waiting for opponent...'
                                : quizMode === 'custom'
                                    ? `Start with ${customQuestions.length} question${customQuestions.length !== 1 ? 's' : ''} 🚀`
                                    : 'Start Game 🚀'}
                        </Text>
                    </TouchableOpacity>
                </>
            )}
        </>
    );

    // ── GUEST view ─────────────────────────────────────────────────
    const renderGuestView = () => (
        <>
            {!isConnected ? (
                <View style={styles.statusCard}>
                    <Text style={styles.statusLabel}>Connect to Game</Text>
                    <Text style={styles.ipHint}>Enter the relay server IP and the room code from the host</Text>

                    <Text style={styles.fieldLabel}>Server IP</Text>
                    <TextInput
                        style={styles.ipInput}
                        value={relayIp}
                        onChangeText={setRelayIp}
                        placeholder="e.g. 192.168.1.100"
                        placeholderTextColor="rgba(255,255,255,0.3)"
                        keyboardType="numeric"
                        autoCapitalize="none"
                    />

                    <Text style={styles.fieldLabel}>Room Code</Text>
                    <TextInput
                        style={[styles.ipInput, styles.codeInput]}
                        value={joinCode}
                        onChangeText={setJoinCode}
                        placeholder="e.g. A3XZ"
                        placeholderTextColor="rgba(255,255,255,0.3)"
                        autoCapitalize="characters"
                        maxLength={6}
                    />

                    <TouchableOpacity
                        style={[styles.connectButton, (!relayIp.trim() || !joinCode.trim() || isLoading) && styles.buttonDisabled]}
                        onPress={handleJoinRoom}
                        disabled={!relayIp.trim() || !joinCode.trim() || isLoading}
                        activeOpacity={0.85}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.connectButtonText}>Join Room</Text>
                        )}
                    </TouchableOpacity>
                    {error ? <Text style={styles.errorText}>{error}</Text> : null}
                </View>
            ) : (
                <View style={styles.statusCard}>
                    <View style={[styles.connectionBadge, styles.connectedBadge]}>
                        <Text style={styles.connectionBadgeText}>✅ Connected to room {roomId}!</Text>
                    </View>
                    <View style={styles.waitingContainer}>
                        <ActivityIndicator color="#FBBF24" size="large" />
                        <Text style={styles.waitingText}>Waiting for host to start the game...</Text>
                        {opponentName ? (
                            <Text style={styles.opponentInfo}>Playing against: {opponentName}</Text>
                        ) : null}
                    </View>
                </View>
            )}
        </>
    );

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.heroCard}>
                        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                            <Text style={styles.backButtonText}>‹ Back</Text>
                        </TouchableOpacity>
                        <Text style={styles.heroEyebrow}>{isHostMode ? 'hosting' : 'joining'}</Text>
                        <Text style={styles.heroTitle}>{isHostMode ? 'Game Room' : 'Join Game'}</Text>
                        <Text style={styles.heroSubtitle}>
                            {isHostMode
                                ? `Hosting as ${playerName}. Create a room, then share the code with your opponent.`
                                : `Joining as ${playerName}. Enter the server IP and room code to connect.`}
                        </Text>
                    </View>

                    {isHostMode ? renderHostView() : renderGuestView()}
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'transparent' },
    scrollContent: { paddingHorizontal: 20, paddingTop: 60, paddingBottom: 40, gap: 20 },
    heroCard: {
        backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 28, padding: 24,
        borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)',
        shadowColor: '#000', shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.25, shadowRadius: 24,
        gap: 12,
    },
    backButton: {
        alignSelf: 'flex-start', paddingVertical: 6, paddingHorizontal: 12,
        borderRadius: 999, backgroundColor: 'rgba(255,255,255,0.15)',
    },
    backButtonText: { fontSize: 16, color: '#fff', fontWeight: '600' },
    heroEyebrow: {
        textTransform: 'uppercase', letterSpacing: 3, fontSize: 12, fontWeight: '700', color: '#FBBF24',
    },
    heroTitle: { fontSize: 30, fontWeight: '800', color: '#fff' },
    heroSubtitle: { color: '#E2E8F0', fontSize: 15, lineHeight: 22 },

    statusCard: {
        backgroundColor: 'rgba(15,23,42,0.55)', borderRadius: 22, padding: 22,
        borderWidth: 1, borderColor: 'rgba(148,163,184,0.25)', gap: 14,
    },
    statusLabel: {
        color: '#94A3B8', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, fontWeight: '700',
    },
    ipHint: { color: '#94A3B8', fontSize: 13, lineHeight: 18 },
    fieldLabel: { color: '#E2E8F0', fontSize: 13, fontWeight: '600', marginTop: 4 },
    roomCodeDisplay: {
        backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 16, padding: 18, alignItems: 'center', gap: 6,
    },
    roomCodeLabel: {
        color: '#94A3B8', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1,
    },
    roomCodeValue: { color: '#FBBF24', fontSize: 36, fontWeight: '800', letterSpacing: 8 },
    connectionBadge: { borderRadius: 14, padding: 14, alignItems: 'center' },
    connectedBadge: {
        backgroundColor: 'rgba(39,174,96,0.2)', borderWidth: 1, borderColor: 'rgba(39,174,96,0.4)',
    },
    waitingBadge: {
        backgroundColor: 'rgba(251,191,36,0.15)', borderWidth: 1, borderColor: 'rgba(251,191,36,0.3)',
    },
    connectionBadgeText: { color: '#fff', fontSize: 15, fontWeight: '600' },

    // Mode toggle
    modeToggleContainer: { gap: 10 },
    modeToggle: {
        flexDirection: 'row', backgroundColor: 'rgba(15,23,42,0.5)', borderRadius: 16,
        padding: 4, gap: 4,
    },
    modeToggleBtn: {
        flex: 1, paddingVertical: 14, alignItems: 'center', borderRadius: 14,
    },
    modeToggleBtnActive: { backgroundColor: 'rgba(255,255,255,0.15)' },
    modeToggleBtnText: { color: '#94A3B8', fontSize: 15, fontWeight: '600' },
    modeToggleBtnTextActive: { color: '#fff' },

    // Preset selections
    selectionSection: { gap: 10 },
    sectionLabel: { color: '#E2E8F0', fontSize: 16, fontWeight: '700' },
    selectionGrid: { flexDirection: 'row', gap: 10 },
    selectionCard: {
        flex: 1, backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 18, padding: 16,
        alignItems: 'center', borderWidth: 1.5, gap: 8,
    },
    selectionIcon: { fontSize: 28 },
    selectionName: { color: '#fff', fontSize: 13, fontWeight: '600', textAlign: 'center' },

    // Custom question form
    customSection: { gap: 16 },
    formCard: {
        backgroundColor: 'rgba(15,23,42,0.55)', borderRadius: 22, padding: 20,
        borderWidth: 1, borderColor: 'rgba(148,163,184,0.25)', gap: 12,
    },
    formLabel: {
        color: '#94A3B8', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, fontWeight: '700',
    },
    formInput: {
        backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 14,
        paddingHorizontal: 16, paddingVertical: 14, fontSize: 16, color: '#fff',
        borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)', minHeight: 50,
    },
    optionRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    correctRadio: {
        width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center', alignItems: 'center', borderWidth: 1.5,
        borderColor: 'rgba(255,255,255,0.15)',
    },
    correctRadioSelected: {
        backgroundColor: 'rgba(39,174,96,0.25)', borderColor: '#27AE60',
    },
    correctRadioText: { color: '#fff', fontSize: 14, fontWeight: '700' },
    optionInput: {
        flex: 1, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 12,
        paddingHorizontal: 14, paddingVertical: 12, fontSize: 15, color: '#fff',
        borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
    },
    optionInputSelected: { borderColor: 'rgba(39,174,96,0.4)' },
    pointsRow: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    },
    pointsInput: {
        backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 12,
        paddingHorizontal: 16, paddingVertical: 10, fontSize: 18, color: '#FBBF24',
        fontWeight: '700', textAlign: 'center', width: 80,
        borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
    },
    addButton: {
        backgroundColor: 'rgba(52,152,219,0.25)', borderRadius: 14, paddingVertical: 14,
        alignItems: 'center', borderWidth: 1, borderColor: 'rgba(52,152,219,0.4)',
    },
    addButtonText: { color: '#3498DB', fontSize: 16, fontWeight: '700' },

    // Added questions list
    addedSection: { gap: 10 },
    addedCard: {
        backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 16, padding: 14,
        borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', gap: 6,
    },
    addedHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    addedIndex: {
        color: '#FBBF24', fontSize: 13, fontWeight: '800', flex: 1,
    },
    addedPoints: { color: '#7DC4FF', fontSize: 12, fontWeight: '600' },
    removeBtn: { color: '#EF4444', fontSize: 18, fontWeight: '700', paddingHorizontal: 6 },
    addedQuestion: { color: '#E2E8F0', fontSize: 14, lineHeight: 20 },
    addedOptions: { gap: 2 },
    addedOption: { color: '#94A3B8', fontSize: 12 },
    addedOptionCorrect: { color: '#27AE60', fontWeight: '700' },

    // Inputs
    ipInput: {
        backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 14,
        paddingHorizontal: 18, paddingVertical: 14, fontSize: 20, color: '#fff',
        borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)', textAlign: 'center', letterSpacing: 2,
    },
    codeInput: { fontSize: 24, fontWeight: '700', letterSpacing: 6 },
    connectButton: {
        backgroundColor: '#3498DB', borderRadius: 16, paddingVertical: 16, alignItems: 'center',
    },
    connectButtonText: { color: '#fff', fontSize: 17, fontWeight: '700' },
    startButton: {
        backgroundColor: '#E67E22', borderRadius: 18, paddingVertical: 18, alignItems: 'center',
        shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 12,
    },
    startButtonText: { color: '#fff', fontSize: 18, fontWeight: '700' },
    buttonDisabled: { opacity: 0.4 },
    errorText: { color: '#EF4444', fontSize: 14, textAlign: 'center' },
    waitingContainer: { alignItems: 'center', gap: 14, paddingVertical: 20 },
    waitingText: { color: '#E2E8F0', fontSize: 16, fontWeight: '600', textAlign: 'center' },
    opponentInfo: { color: '#FBBF24', fontSize: 15, fontWeight: '700' },
});
