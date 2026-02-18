import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Audio } from 'expo-av';
import congratsSfx from '../../assets/congrats.mp3';
import { useMultiplayer } from '../contexts/MultiplayerContext';

const MEDALS = ['🥇', '🥈', '🥉'];

export default function MultiplayerResultScreen({ route, navigation }) {
    const { allPlayers, totalQuestions, totalPoints } = route.params;
    const { disconnect } = useMultiplayer();

    const [scaleAnim] = useState(new Animated.Value(0));
    const [fadeAnim] = useState(new Animated.Value(0));
    const [burstAnim] = useState(new Animated.Value(0));

    // Sort players by score descending
    const ranked = useMemo(
        () => [...allPlayers].sort((a, b) => b.score - a.score),
        [allPlayers],
    );

    // Find the current player's rank (1-indexed)
    const myRank = useMemo(() => {
        const idx = ranked.findIndex((p) => p.isSelf);
        return idx >= 0 ? idx + 1 : ranked.length;
    }, [ranked]);

    const getResultData = () => {
        if (myRank === 1) return { emoji: '🏆', message: '1st Place!', color: '#27AE60' };
        if (myRank === 2) return { emoji: '🥈', message: '2nd Place!', color: '#3498DB' };
        if (myRank === 3) return { emoji: '🥉', message: '3rd Place!', color: '#E67E22' };
        return { emoji: '😤', message: `${myRank}th Place`, color: '#E74C3C' };
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

                {/* Ranked leaderboard */}
                <Animated.View style={[styles.leaderboardSection, { opacity: fadeAnim }]}>
                    <Text style={styles.sectionTitle}>🏆 Final Standings</Text>
                    {ranked.map((p, idx) => {
                        const percentage = totalPoints > 0 ? Math.round((p.score / totalPoints) * 100) : 0;
                        return (
                            <View
                                key={idx}
                                style={[
                                    styles.playerRow,
                                    p.isSelf && styles.playerRowSelf,
                                    idx === 0 && styles.playerRowFirst,
                                ]}
                            >
                                <Text style={styles.rankBadge}>
                                    {idx < 3 ? MEDALS[idx] : `#${idx + 1}`}
                                </Text>
                                <View style={styles.playerInfo}>
                                    <Text
                                        style={[styles.playerName, p.isSelf && styles.playerNameSelf]}
                                        numberOfLines={1}
                                    >
                                        {p.name}{p.isSelf ? ' (You)' : ''}
                                    </Text>
                                    <Text style={styles.playerStats}>
                                        ✅ {p.correct}/{totalQuestions}  •  {percentage}%
                                    </Text>
                                </View>
                                <View style={styles.scoreBlock}>
                                    <Text style={[styles.playerScore, idx === 0 && { color: '#27AE60' }]}>
                                        {p.score}
                                    </Text>
                                    <Text style={styles.playerPts}>pts</Text>
                                </View>
                            </View>
                        );
                    })}
                </Animated.View>

                {/* Detail card */}
                <Animated.View style={[styles.detailCard, { opacity: fadeAnim }]}>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Total Players</Text>
                        <Text style={styles.detailValue}>{ranked.length}</Text>
                    </View>
                    <View style={styles.separator} />
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Total Questions</Text>
                        <Text style={styles.detailValue}>{totalQuestions}</Text>
                    </View>
                    <View style={styles.separator} />
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Max Points</Text>
                        <Text style={styles.detailValue}>{totalPoints}</Text>
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

    // Leaderboard
    leaderboardSection: { gap: 10 },
    sectionTitle: { fontSize: 18, fontWeight: '700', color: '#E2E8F0' },
    playerRow: {
        flexDirection: 'row', alignItems: 'center', gap: 12,
        backgroundColor: 'rgba(15,23,42,0.6)', borderRadius: 18, padding: 16,
        borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
    },
    playerRowSelf: {
        backgroundColor: 'rgba(74,144,226,0.15)', borderColor: 'rgba(74,144,226,0.35)',
    },
    playerRowFirst: {
        borderColor: 'rgba(39,174,96,0.5)', backgroundColor: 'rgba(39,174,96,0.1)',
    },
    rankBadge: { fontSize: 24, width: 36, textAlign: 'center' },
    playerInfo: { flex: 1, gap: 2 },
    playerName: { fontSize: 16, fontWeight: '700', color: '#fff' },
    playerNameSelf: { color: '#7DC4FF' },
    playerStats: { fontSize: 12, color: '#CBD5F5' },
    scoreBlock: { alignItems: 'center' },
    playerScore: { fontSize: 28, fontWeight: '800', color: '#fff' },
    playerPts: { fontSize: 11, color: '#94A3B8', marginTop: -2 },

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
