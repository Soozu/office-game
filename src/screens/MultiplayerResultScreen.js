import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Audio } from 'expo-av';
import congratsSfx from '../../assets/congrats.mp3';
import { useMultiplayer } from '../contexts/MultiplayerContext';

export default function MultiplayerResultScreen({ route, navigation }) {
    const {
        myScore, myCorrect, myName,
        oppScore, oppCorrect, oppName,
        totalQuestions, totalPoints,
    } = route.params;

    const { disconnect } = useMultiplayer();

    const [scaleAnim] = useState(new Animated.Value(0));
    const [fadeAnim] = useState(new Animated.Value(0));
    const [burstAnim] = useState(new Animated.Value(0));

    const myPercentage = Math.round((myScore / totalPoints) * 100);
    const oppPercentage = Math.round((oppScore / totalPoints) * 100);
    const isWinner = myScore > oppScore;
    const isDraw = myScore === oppScore;

    const getResultData = () => {
        if (isDraw) return { emoji: '🤝', message: "It's a Draw!", color: '#F39C12' };
        if (isWinner) return { emoji: '🏆', message: 'You Win!', color: '#27AE60' };
        return { emoji: '😤', message: 'You Lost!', color: '#E74C3C' };
    };

    const result = getResultData();

    useEffect(() => {
        let isMounted = true;
        let soundObj = null;

        (async () => {
            try {
                const { sound } = await Audio.Sound.createAsync(congratsSfx, { shouldPlay: false, volume: 0.6 });
                if (isMounted) {
                    soundObj = sound;
                    await sound.replayAsync();
                } else {
                    await sound.unloadAsync();
                }
            } catch (err) {
                console.log('Error loading congrats sound:', err?.message || err);
            }
        })();

        Animated.parallel([
            Animated.spring(scaleAnim, { toValue: 1, tension: 10, friction: 3, useNativeDriver: true }),
            Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
        ]).start();

        Animated.sequence([
            Animated.delay(300),
            Animated.timing(burstAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
            Animated.timing(burstAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
        ]).start();

        return () => {
            isMounted = false;
            if (soundObj) soundObj.unloadAsync();
        };
    }, []);

    const handlePlayAgain = () => {
        disconnect();
        navigation.navigate('MultiplayerMenu');
    };

    const handleGoHome = () => {
        disconnect();
        navigation.navigate('StartMenu');
    };

    const burstScale = burstAnim.interpolate({ inputRange: [0, 1], outputRange: [0.8, 1.3] });

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Result hero */}
                <View style={[styles.heroCard, { borderColor: `${result.color}33` }]}>
                    <View style={styles.heroHeader}>
                        <View>
                            <Text style={styles.heroEyebrow}>Match complete</Text>
                            <Text style={styles.heroTitle}>{result.message}</Text>
                        </View>
                        <Animated.View
                            style={[styles.emojiBubble, { borderColor: `${result.color}55` }, { transform: [{ scale: scaleAnim }] }]}
                        >
                            <Text style={styles.emoji}>{result.emoji}</Text>
                        </Animated.View>
                    </View>
                </View>

                {/* Head-to-head comparison */}
                <Animated.View style={[styles.comparisonSection, { opacity: fadeAnim }]}>
                    <Text style={styles.sectionTitle}>Head to Head</Text>
                    <View style={styles.vsContainer}>
                        {/* Player 1 (You) */}
                        <View style={[styles.playerCard, isWinner && styles.winnerCard]}>
                            {isWinner && <Text style={styles.crownIcon}>👑</Text>}
                            <Text style={styles.playerName}>{myName}</Text>
                            <Text style={styles.playerTag}>You</Text>
                            <Text style={[styles.playerScore, { color: result.color }]}>{myScore}</Text>
                            <Text style={styles.playerPts}>pts</Text>
                            <View style={styles.playerStats}>
                                <Text style={styles.playerStatText}>✅ {myCorrect}/{totalQuestions}</Text>
                                <Text style={styles.playerStatText}>{myPercentage}%</Text>
                            </View>
                        </View>

                        {/* VS */}
                        <View style={styles.vsBadge}>
                            <Text style={styles.vsText}>VS</Text>
                        </View>

                        {/* Player 2 (Opponent) */}
                        <View style={[styles.playerCard, !isWinner && !isDraw && styles.winnerCard]}>
                            {!isWinner && !isDraw && <Text style={styles.crownIcon}>👑</Text>}
                            <Text style={styles.playerName}>{oppName}</Text>
                            <Text style={styles.playerTag}>Opponent</Text>
                            <Text style={[styles.playerScore, { color: !isWinner && !isDraw ? '#27AE60' : '#94A3B8' }]}>
                                {oppScore}
                            </Text>
                            <Text style={styles.playerPts}>pts</Text>
                            <View style={styles.playerStats}>
                                <Text style={styles.playerStatText}>✅ {oppCorrect}/{totalQuestions}</Text>
                                <Text style={styles.playerStatText}>{oppPercentage}%</Text>
                            </View>
                        </View>
                    </View>
                </Animated.View>

                {/* Detail card */}
                <Animated.View style={[styles.detailCard, { opacity: fadeAnim }]}>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Total Questions</Text>
                        <Text style={styles.detailValue}>{totalQuestions}</Text>
                    </View>
                    <View style={styles.separator} />
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Max Points</Text>
                        <Text style={styles.detailValue}>{totalPoints}</Text>
                    </View>
                    <View style={styles.separator} />
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Score Difference</Text>
                        <Text style={styles.detailValue}>{Math.abs(myScore - oppScore)} pts</Text>
                    </View>
                </Animated.View>

                {/* Buttons */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, styles.primaryButton]} onPress={handlePlayAgain} activeOpacity={0.85}>
                        <Text style={styles.primaryButtonText}>Play Again</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={handleGoHome} activeOpacity={0.85}>
                        <Text style={styles.secondaryButtonText}>Back to Menu</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Burst overlay */}
            <Animated.View
                pointerEvents="none"
                style={[styles.burstOverlay, { opacity: burstAnim, transform: [{ scale: burstScale }] }]}
            >
                <Text style={styles.burstText}>{result.message} {result.emoji}</Text>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'transparent' },
    scrollContent: { paddingHorizontal: 20, paddingTop: 60, paddingBottom: 40, gap: 20 },

    // Hero
    heroCard: {
        backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 28, padding: 24,
        borderWidth: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.25, shadowRadius: 24, gap: 16,
    },
    heroHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    heroEyebrow: {
        textTransform: 'uppercase', letterSpacing: 3, fontSize: 12, fontWeight: '700',
        color: '#FBBF24', marginBottom: 6,
    },
    heroTitle: { fontSize: 28, fontWeight: '800', color: '#fff' },
    emojiBubble: {
        width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(255,255,255,0.15)',
        justifyContent: 'center', alignItems: 'center', borderWidth: 1,
    },
    emoji: { fontSize: 42 },

    // Comparison
    comparisonSection: { gap: 12 },
    sectionTitle: { fontSize: 18, fontWeight: '700', color: '#E2E8F0' },
    vsContainer: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    playerCard: {
        flex: 1, backgroundColor: 'rgba(15,23,42,0.6)', borderRadius: 22, padding: 18,
        alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', gap: 4,
    },
    winnerCard: { borderColor: 'rgba(39,174,96,0.5)', backgroundColor: 'rgba(39,174,96,0.1)' },
    crownIcon: { fontSize: 24 },
    playerName: { fontSize: 16, fontWeight: '700', color: '#fff', textAlign: 'center' },
    playerTag: { fontSize: 11, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: 1 },
    playerScore: { fontSize: 32, fontWeight: '800', marginTop: 4 },
    playerPts: { fontSize: 12, color: '#94A3B8', marginTop: -2 },
    playerStats: { marginTop: 8, gap: 2, alignItems: 'center' },
    playerStatText: { fontSize: 12, color: '#CBD5F5' },

    vsBadge: {
        width: 36, height: 36, borderRadius: 18,
        backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center',
    },
    vsText: { color: '#fff', fontSize: 12, fontWeight: '800' },

    // Detail
    detailCard: {
        backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 24, padding: 22,
        borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)', gap: 12,
    },
    detailRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    detailLabel: { fontSize: 15, color: '#E2E8F0' },
    detailValue: { fontSize: 18, fontWeight: '700', color: '#fff' },
    separator: { height: 1, backgroundColor: 'rgba(255,255,255,0.12)', marginVertical: 4 },

    // Buttons
    buttonContainer: { gap: 14 },
    button: {
        borderRadius: 16, paddingVertical: 18, alignItems: 'center', borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)',
        shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.2, shadowRadius: 12,
    },
    primaryButton: { backgroundColor: '#E67E22', borderColor: '#E67E22' },
    primaryButtonText: { color: '#fff', fontSize: 18, fontWeight: '700' },
    secondaryButton: { backgroundColor: 'transparent', borderColor: 'rgba(255,255,255,0.3)' },
    secondaryButtonText: { color: '#E2E8F0', fontSize: 18, fontWeight: '600' },

    // Burst
    burstOverlay: {
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        alignItems: 'center', justifyContent: 'center',
    },
    burstText: {
        fontSize: 30, fontWeight: '800', color: '#F8FAFC', letterSpacing: 4,
        textShadowColor: 'rgba(0,0,0,0.35)', textShadowOffset: { width: 0, height: 4 }, textShadowRadius: 12,
    },
});
