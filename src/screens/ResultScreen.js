import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';
import congratsSfx from '../../assets/congrats.mp3';

export default function ResultScreen({ route, navigation }) {
  const { score, correctAnswers, totalQuestions, totalPoints, appId, questionCount, difficulty } = route.params;

  const [scaleAnim] = useState(new Animated.Value(0));
  const [fadeAnim] = useState(new Animated.Value(0));
  const [burstAnim] = useState(new Animated.Value(0));
  const [isNewHighScore, setIsNewHighScore] = useState(false);
  const congratsSoundRef = useRef(null);

  const percentage = Math.round((score / totalPoints) * 100);

  const getPerformanceData = () => {
    if (percentage >= 80) {
      return {
        emoji: '🌟',
        message: 'Excellent!',
        color: '#27AE60'
      };
    } else if (percentage >= 60) {
      return {
        emoji: '👍',
        message: 'Good Job!',
        color: '#F39C12'
      };
    } else {
      return {
        emoji: '💪',
        message: 'Keep Practicing!',
        color: '#E74C3C'
      };
    }
  };

  const performance = getPerformanceData();
  const modeLabel = difficulty ? `${difficulty.charAt(0).toUpperCase()}${difficulty.slice(1)}` : `${questionCount} Questions`;

  useEffect(() => {
    let isMounted = true;

    const loadSound = async () => {
      try {
        const { sound } = await Audio.Sound.createAsync(congratsSfx, { shouldPlay: false, volume: 0.6 });
        if (isMounted) {
          congratsSoundRef.current = sound;
          await sound.replayAsync();
        } else {
          await sound.unloadAsync();
        }
      } catch (error) {
        console.log('Error loading congrats sound:', error?.message || error);
      }
    };

    loadSound();

    return () => {
      isMounted = false;
      if (congratsSoundRef.current) {
        congratsSoundRef.current.unloadAsync();
        congratsSoundRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    saveScore();

    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 10,
        friction: 3,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      })
    ]).start();

    Animated.sequence([
      Animated.delay(300),
      Animated.timing(burstAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(burstAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const saveScore = async () => {
    try {
      // Load existing scores
      const savedScores = await AsyncStorage.getItem(`scores_${appId}`);
      const scores = savedScores ? JSON.parse(savedScores) : {};
      const scoreKey = difficulty ? `difficulty_${difficulty}` : `count_${questionCount}`;

      // Check if this is a new high score
      const existingScore = scores[scoreKey];
      const isHighScore = !existingScore || score > existingScore.score;

      if (isHighScore) {
        setIsNewHighScore(true);
        // Save new high score
        scores[scoreKey] = {
          score,
          totalPoints,
          totalQuestions,
          percentage,
          difficulty: difficulty || null,
          questionCount,
          date: new Date().toISOString()
        };

        await AsyncStorage.setItem(`scores_${appId}`, JSON.stringify(scores));
      }
    } catch (error) {
      console.log('Error saving score:', error);
    }
  };

  const handlePlayAgain = () => {
    navigation.navigate('Difficulty', { appId });
  };

  const handleGoHome = () => {
    navigation.navigate('AppSelection');
  };

  const burstScale = burstAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1.3],
  });

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.heroCard, { borderColor: `${performance.color}33` }]}>
          <View style={styles.heroHeader}>
            <View>
              <Text style={styles.heroEyebrow}>Quiz complete</Text>
              <Text style={styles.heroTitle}>{performance.message}</Text>
            </View>
            <Animated.View
              style={[
                styles.emojiBubble,
                { borderColor: `${performance.color}55` },
                { transform: [{ scale: scaleAnim }] }
              ]}
            >
              <Text style={styles.emoji}>{performance.emoji}</Text>
            </Animated.View>
          </View>
          <Text style={[styles.heroScore, { color: performance.color }]}>
            {score} / {totalPoints}
          </Text>
          <Text style={styles.heroSubtitle}>
            You answered {correctAnswers} of {totalQuestions} questions.
          </Text>
          <View style={styles.heroMetaRow}>
            <View style={styles.heroMetaCard}>
              <Text style={styles.metaLabel}>Accuracy</Text>
              <Text style={styles.metaValue}>{percentage}%</Text>
            </View>
            <View style={styles.heroMetaCard}>
              <Text style={styles.metaLabel}>Mode</Text>
              <Text style={styles.metaValue}>{modeLabel}</Text>
            </View>
          </View>
        </View>

        <Animated.View style={[styles.bodySection, { opacity: fadeAnim }]}>
          {isNewHighScore && (
            <View style={styles.highScoreBadge}>
              <Text style={styles.highScoreText}>🏆 New High Score! 🏆</Text>
            </View>
          )}

          <View style={styles.metricGrid}>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Total Questions</Text>
              <Text style={styles.metricValue}>{totalQuestions}</Text>
              <Text style={styles.metricHint}>Completed</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Correct Answers</Text>
              <Text style={styles.metricValue}>{correctAnswers}</Text>
              <Text style={styles.metricHint}>Out of {totalQuestions}</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Score</Text>
              <Text style={styles.metricValue}>{score}</Text>
              <Text style={styles.metricHint}>of {totalPoints} pts</Text>
            </View>
          </View>

          <View style={styles.detailCard}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Percentage</Text>
              <Text style={styles.detailValue}>{percentage}%</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Mode</Text>
              <Text style={styles.detailValue}>{modeLabel}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Points Earned</Text>
              <Text style={styles.detailValue}>{score} pts</Text>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.primaryButton]}
              onPress={handlePlayAgain}
              activeOpacity={0.85}
            >
              <Text style={styles.primaryButtonText}>Play Again</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={handleGoHome}
              activeOpacity={0.85}
            >
              <Text style={styles.secondaryButtonText}>Back to Menu</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>

      <Animated.View
        pointerEvents="none"
        style={[
          styles.burstOverlay,
          {
            opacity: burstAnim,
            transform: [{ scale: burstScale }]
          }
        ]}
      >
        <Text style={styles.burstText}>Quiz Complete 🎉</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
    gap: 24,
  },
  heroCard: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 28,
    padding: 24,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    gap: 16,
  },
  heroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heroEyebrow: {
    textTransform: 'uppercase',
    letterSpacing: 3,
    fontSize: 12,
    fontWeight: '700',
    color: '#A5B4FC',
    marginBottom: 6,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
  },
  emojiBubble: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  emoji: {
    fontSize: 48,
  },
  heroScore: {
    fontSize: 34,
    fontWeight: '800',
  },
  heroSubtitle: {
    color: '#E2E8F0',
    fontSize: 16,
    lineHeight: 22,
  },
  heroMetaRow: {
    flexDirection: 'row',
    gap: 12,
  },
  heroMetaCard: {
    flex: 1,
    backgroundColor: 'rgba(15,23,42,0.55)',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  metaLabel: {
    fontSize: 12,
    color: '#94A3B8',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  metaValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  bodySection: {
    gap: 20,
  },
  highScoreBadge: {
    backgroundColor: 'rgba(255,215,0,0.15)',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,215,0,0.4)',
    alignItems: 'center',
  },
  highScoreText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFE082',
  },
  metricGrid: {
    gap: 12,
  },
  metricCard: {
    backgroundColor: 'rgba(15,23,42,0.55)',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(148,163,184,0.25)',
  },
  metricLabel: {
    color: '#94A3B8',
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  metricValue: {
    fontSize: 26,
    fontWeight: '700',
    color: '#fff',
  },
  metricHint: {
    fontSize: 13,
    color: '#CBD5F5',
    marginTop: 4,
  },
  detailCard: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 24,
    padding: 22,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 15,
    color: '#E2E8F0',
  },
  detailValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.12)',
    marginVertical: 4,
  },
  buttonContainer: {
    gap: 14,
  },
  button: {
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },
  primaryButton: {
    backgroundColor: '#4A90E2',
    borderColor: '#4A90E2',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderColor: 'rgba(255,255,255,0.3)',
  },
  secondaryButtonText: {
    color: '#E2E8F0',
    fontSize: 18,
    fontWeight: '600',
  },
  burstOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  burstText: {
    fontSize: 34,
    fontWeight: '800',
    color: '#F8FAFC',
    letterSpacing: 4,
    textShadowColor: 'rgba(0,0,0,0.35)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 12,
  },
});

