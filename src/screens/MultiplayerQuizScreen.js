import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Audio } from 'expo-av';
import correctSfx from '../../assets/correct.mp3';
import wrongSfx from '../../assets/wrong.mp3';
import { useMultiplayer } from '../contexts/MultiplayerContext';

const QUESTION_DURATION = 30;

export default function MultiplayerQuizScreen({ route, navigation }) {
    const {
        questions,
        isHost,
        opponentName,
        opponentScore,
        opponentCorrect,
        opponentAnswered,
        playerName,
        submitAnswer,
        endGame,
        opponentFinished,
    } = useMultiplayer();

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [fadeAnim] = useState(new Animated.Value(1));
    const [celebrationAnim] = useState(new Animated.Value(0));
    const [timeLeft, setTimeLeft] = useState(QUESTION_DURATION);
    const [finished, setFinished] = useState(false);

    const correctSoundRef = useRef(null);
    const wrongSoundRef = useRef(null);
    const scoreRef = useRef(0);
    const correctRef = useRef(0);
    const hasNavigated = useRef(false);

    // Load sounds
    useEffect(() => {
        let isMounted = true;
        const loadSound = async (source, ref) => {
            try {
                const { sound } = await Audio.Sound.createAsync(source, { shouldPlay: false, volume: 0.6 });
                if (isMounted) ref.current = sound;
                else await sound.unloadAsync();
            } catch (err) {
                console.log('Error loading sound:', err?.message || err);
            }
        };
        loadSound(correctSfx, correctSoundRef);
        loadSound(wrongSfx, wrongSoundRef);
        return () => {
            isMounted = false;
            if (correctSoundRef.current) { correctSoundRef.current.unloadAsync(); correctSoundRef.current = null; }
            if (wrongSoundRef.current) { wrongSoundRef.current.unloadAsync(); wrongSoundRef.current = null; }
        };
    }, []);

    const playSound = useCallback(async (ref) => {
        try {
            if (ref.current) { await ref.current.setPositionAsync(0); await ref.current.playAsync(); }
        } catch (err) { console.log('Sound error:', err?.message || err); }
    }, []);

    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    // Timer
    const handleTimeExpire = useCallback(() => {
        if (isAnswered) return;
        setIsAnswered(true);
        setSelectedAnswer(-1);
        playSound(wrongSoundRef);
        submitAnswer(currentQuestionIndex, false, scoreRef.current, correctRef.current);
    }, [isAnswered, currentQuestionIndex, submitAnswer, playSound]);

    useEffect(() => {
        if (isAnswered || finished) return;
        setTimeLeft(QUESTION_DURATION);
        const intervalId = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) { clearInterval(intervalId); handleTimeExpire(); return 0; }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(intervalId);
    }, [currentQuestionIndex, isAnswered, finished, handleTimeExpire]);

    // Celebration animation
    const triggerCelebration = useCallback(() => {
        celebrationAnim.stopAnimation();
        celebrationAnim.setValue(0);
        Animated.sequence([
            Animated.timing(celebrationAnim, { toValue: 1, duration: 450, useNativeDriver: true }),
            Animated.timing(celebrationAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
        ]).start();
    }, [celebrationAnim]);

    const handleAnswerPress = (answerIndex) => {
        if (isAnswered) return;
        setSelectedAnswer(answerIndex);
        setIsAnswered(true);

        let newScore = score;
        let newCorrect = correctAnswers;

        if (answerIndex === currentQuestion.correctAnswer) {
            newScore = score + currentQuestion.points;
            newCorrect = correctAnswers + 1;
            setScore(newScore);
            setCorrectAnswers(newCorrect);
            scoreRef.current = newScore;
            correctRef.current = newCorrect;
            playSound(correctSoundRef);
            triggerCelebration();
        } else {
            playSound(wrongSoundRef);
        }

        submitAnswer(currentQuestionIndex, answerIndex === currentQuestion.correctAnswer, newScore, newCorrect);
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true }).start(() => {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setSelectedAnswer(null);
                setIsAnswered(false);
                Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }).start();
            });
        } else {
            setFinished(true);
            endGame(scoreRef.current, correctRef.current);
        }
    };

    // Navigate to results when both players finish
    useEffect(() => {
        if (finished && opponentFinished && !hasNavigated.current) {
            hasNavigated.current = true;
            navigation.replace('MultiplayerResult', {
                myScore: scoreRef.current,
                myCorrect: correctRef.current,
                myName: playerName,
                oppScore: opponentScore,
                oppCorrect: opponentCorrect,
                oppName: opponentName,
                totalQuestions: questions.length,
                totalPoints: questions.reduce((sum, q) => sum + q.points, 0),
            });
        }
    }, [finished, opponentFinished, opponentScore, opponentCorrect]);

    const getOptionStyle = (index) => {
        if (!isAnswered) return styles.option;
        if (index === currentQuestion.correctAnswer) return [styles.option, styles.correctOption];
        if (index === selectedAnswer && selectedAnswer !== currentQuestion.correctAnswer)
            return [styles.option, styles.wrongOption];
        return [styles.option, styles.disabledOption];
    };

    if (!currentQuestion) return null;

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Opponent status bar */}
                <View style={styles.opponentBar}>
                    <View style={styles.opponentInfo}>
                        <Text style={styles.opponentLabel}>👤 {opponentName || 'Opponent'}</Text>
                        <Text style={styles.opponentScoreText}>Score: {opponentScore}</Text>
                    </View>
                    <View style={styles.opponentProgress}>
                        <Text style={styles.opponentProgressText}>
                            Q{Math.min(opponentAnswered + 2, questions.length)}/{questions.length}
                        </Text>
                    </View>
                </View>

                {/* Your status */}
                <View style={styles.heroCard}>
                    <View style={styles.progressMeta}>
                        <Text style={styles.questionCounter}>
                            Question {currentQuestionIndex + 1} of {questions.length}
                        </Text>
                        <View style={styles.timerChip}>
                            <Text style={styles.timerChipLabel}>Time</Text>
                            <Text style={[styles.timerChipValue, timeLeft <= 5 && styles.timerChipWarning]}>
                                {timeLeft}s
                            </Text>
                        </View>
                    </View>
                    <View style={styles.progressBar}>
                        <View style={[styles.progressFill, { width: `${progress}%` }]} />
                    </View>
                    <View style={styles.heroStats}>
                        <View style={styles.statBlock}>
                            <Text style={styles.statLabel}>Your Score</Text>
                            <Text style={styles.statValue}>{score}</Text>
                        </View>
                        <View style={styles.statBlock}>
                            <Text style={styles.statLabel}>vs Opponent</Text>
                            <Text style={styles.statValue}>{opponentScore}</Text>
                        </View>
                    </View>
                </View>

                {/* Question + Options */}
                <Animated.View style={[styles.questionWrapper, { opacity: fadeAnim }]}>
                    <View style={styles.questionCard}>
                        <Text style={styles.questionEyebrow}>Prompt</Text>
                        <Text style={styles.question}>{currentQuestion.question}</Text>
                        <View style={styles.pointsPill}>
                            <Text style={styles.pointsLabel}>+{currentQuestion.points} pts</Text>
                        </View>
                    </View>

                    <View style={styles.optionsContainer}>
                        {currentQuestion.options.map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                style={getOptionStyle(index)}
                                onPress={() => handleAnswerPress(index)}
                                disabled={isAnswered}
                                activeOpacity={0.85}
                            >
                                <View style={styles.optionNumber}>
                                    <Text style={styles.optionNumberText}>{String.fromCharCode(65 + index)}</Text>
                                </View>
                                <Text style={styles.optionText}>{option}</Text>
                                {isAnswered && index === currentQuestion.correctAnswer && (
                                    <Text style={styles.checkmark}>✓</Text>
                                )}
                                {isAnswered && index === selectedAnswer && selectedAnswer !== currentQuestion.correctAnswer && (
                                    <Text style={styles.crossmark}>✗</Text>
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>

                    {isAnswered && !finished && (
                        <TouchableOpacity style={styles.nextButton} onPress={handleNext} activeOpacity={0.85}>
                            <Text style={styles.nextButtonText}>
                                {currentQuestionIndex < questions.length - 1 ? 'Next question' : 'Finish'}
                            </Text>
                        </TouchableOpacity>
                    )}

                    {finished && !opponentFinished && (
                        <View style={styles.waitingCard}>
                            <Text style={styles.waitingText}>⏳ Waiting for {opponentName || 'opponent'} to finish...</Text>
                        </View>
                    )}
                </Animated.View>
            </ScrollView>

            {/* Celebration overlay */}
            <Animated.View
                pointerEvents="none"
                style={[
                    styles.celebrationOverlay,
                    {
                        opacity: celebrationAnim,
                        transform: [{ scale: celebrationAnim.interpolate({ inputRange: [0, 1], outputRange: [0.8, 1.3] }) }],
                    },
                ]}
            >
                <Text style={styles.celebrationText}>Great!</Text>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'transparent' },
    content: { flex: 1 },
    scrollContent: { paddingHorizontal: 20, paddingTop: 50, paddingBottom: 40, gap: 16 },

    opponentBar: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        backgroundColor: 'rgba(230,126,34,0.2)', borderRadius: 16, padding: 14,
        borderWidth: 1, borderColor: 'rgba(230,126,34,0.35)',
    },
    opponentInfo: { gap: 2 },
    opponentLabel: { color: '#FBBF24', fontSize: 14, fontWeight: '700' },
    opponentScoreText: { color: '#E2E8F0', fontSize: 13 },
    opponentProgress: {
        backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 999,
        paddingHorizontal: 12, paddingVertical: 6,
    },
    opponentProgressText: { color: '#fff', fontSize: 12, fontWeight: '600' },

    heroCard: {
        backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 28, padding: 22,
        borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)',
        shadowColor: '#000', shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.25, shadowRadius: 24,
        gap: 16,
    },
    progressMeta: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    progressBar: { height: 8, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 4, overflow: 'hidden' },
    progressFill: { height: '100%', backgroundColor: '#fff', borderRadius: 4 },
    questionCounter: { color: '#E2E8F0', fontSize: 14, fontWeight: '700', letterSpacing: 1 },
    timerChip: {
        flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(15,23,42,0.5)',
        borderRadius: 999, paddingHorizontal: 14, paddingVertical: 6,
        borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)', gap: 6,
    },
    timerChipLabel: { color: '#E2E8F0', fontSize: 12, letterSpacing: 1 },
    timerChipValue: { color: '#fff', fontSize: 16, fontWeight: '700' },
    timerChipWarning: { color: '#FFD166' },
    heroStats: { flexDirection: 'row', gap: 12 },
    statBlock: {
        flex: 1, backgroundColor: 'rgba(15,23,42,0.5)', borderRadius: 18, padding: 14,
        borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
    },
    statLabel: { color: '#94A3B8', fontSize: 12, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 },
    statValue: { color: '#fff', fontSize: 20, fontWeight: '700' },

    questionWrapper: { gap: 18 },
    questionCard: {
        backgroundColor: 'rgba(15,23,42,0.65)', borderRadius: 26, padding: 22,
        shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.2, shadowRadius: 16,
        borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', gap: 10,
    },
    questionEyebrow: { fontSize: 12, letterSpacing: 2, color: '#A5B4FC', textTransform: 'uppercase' },
    question: { fontSize: 20, color: '#fff', lineHeight: 28 },
    pointsPill: {
        alignSelf: 'flex-start', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 999,
        backgroundColor: 'rgba(74,144,226,0.2)', borderWidth: 1, borderColor: 'rgba(74,144,226,0.35)',
    },
    pointsLabel: { fontSize: 13, color: '#7DC4FF', fontWeight: '600' },

    optionsContainer: { gap: 12 },
    option: {
        backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 12, padding: 16,
        flexDirection: 'row', alignItems: 'center', borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)', gap: 12,
    },
    correctOption: { backgroundColor: 'rgba(39,174,96,0.15)', borderColor: '#27AE60' },
    wrongOption: { backgroundColor: 'rgba(231,76,60,0.15)', borderColor: '#E74C3C' },
    disabledOption: { opacity: 0.6 },
    optionNumber: {
        width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center', alignItems: 'center',
    },
    optionNumberText: { color: '#E2E8F0', fontSize: 15, fontWeight: '600' },
    optionText: { flex: 1, fontSize: 16, color: '#E2E8F0' },
    checkmark: { fontSize: 24, color: '#27AE60', fontWeight: 'bold' },
    crossmark: { fontSize: 24, color: '#E74C3C', fontWeight: 'bold' },

    nextButton: {
        backgroundColor: '#4A90E2', borderRadius: 16, paddingVertical: 18, alignItems: 'center',
        shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.25, shadowRadius: 12,
    },
    nextButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },

    waitingCard: {
        backgroundColor: 'rgba(251,191,36,0.15)', borderRadius: 18, padding: 20,
        alignItems: 'center', borderWidth: 1, borderColor: 'rgba(251,191,36,0.3)',
    },
    waitingText: { color: '#FBBF24', fontSize: 16, fontWeight: '600', textAlign: 'center' },

    celebrationOverlay: {
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        alignItems: 'center', justifyContent: 'center',
    },
    celebrationText: {
        fontSize: 42, fontWeight: '800', color: '#7CFCB8',
        textShadowColor: 'rgba(0,0,0,0.35)', textShadowOffset: { width: 0, height: 4 }, textShadowRadius: 12,
        letterSpacing: 4,
    },
});
