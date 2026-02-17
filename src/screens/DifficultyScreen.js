<<<<<<< HEAD
import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function DifficultyScreen({ route, navigation }) {
  const { appId } = route.params;
  const [highScores, setHighScores] = useState({});
=======
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function DifficultyScreen({ route, navigation }) {
  const { appId } = route.params;
>>>>>>> df4fd4376f775ff067a6ef744ffe13c1667e16bd

  const appNames = {
    msword: 'MS Word',
    powerpoint: 'PowerPoint',
    excel: 'Excel'
  };

<<<<<<< HEAD
  const difficultyOptions = [
    {
      id: 'easy',
      label: 'Easy',
      icon: '🙂',
      color: '#27AE60',
      description: 'Focused on fundamentals'
    },
    {
      id: 'medium',
      label: 'Medium',
      icon: '😎',
      color: '#3498DB',
      description: 'Mix of core and advanced topics'
    },
    {
      id: 'hard',
      label: 'Hard',
      icon: '🔥',
      color: '#9B59B6',
      description: 'Challenging mastery questions'
    }
  ];

  const handleDifficultySelection = (difficulty) => {
    navigation.navigate('Quiz', { appId, difficulty });
=======
  const questionOptions = [
    {
      count: 10,
      icon: '🎯',
      color: '#27AE60',
      description: 'Quick quiz'
    },
    {
      count: 20,
      icon: '🎮',
      color: '#3498DB',
      description: 'Standard quiz'
    },
    {
      count: 30,
      icon: '🏆',
      color: '#9B59B6',
      description: 'Challenge quiz'
    },
    {
      count: 50,
      icon: '🔥',
      color: '#E74C3C',
      description: 'Expert quiz'
    }
  ];

  const handleQuestionSelection = (count) => {
    navigation.navigate('Quiz', { appId, questionCount: count });
>>>>>>> df4fd4376f775ff067a6ef744ffe13c1667e16bd
  };

  const handleBack = () => {
    navigation.goBack();
  };

<<<<<<< HEAD
  const loadHighScores = useCallback(async () => {
    try {
      const savedScores = await AsyncStorage.getItem(`scores_${appId}`);
      const parsedScores = savedScores ? JSON.parse(savedScores) : {};
      const collectedScores = {};

      difficultyOptions.forEach((option) => {
        const entry = parsedScores[`difficulty_${option.id}`];
        if (entry) {
          const percentage = entry.percentage ?? Math.round((entry.score / entry.totalPoints) * 100);
          collectedScores[option.id] = {
            scoreText: `${entry.score} / ${entry.totalPoints}`,
            percentage,
            lastPlayed: entry.date ? new Date(entry.date).toLocaleDateString() : null,
          };
        }
      });

      setHighScores(collectedScores);
    } catch (error) {
      console.log('Error loading difficulty high scores:', error);
    }
  }, [appId]);

  useFocusEffect(
    useCallback(() => {
      loadHighScores();
    }, [loadHighScores])
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroCard}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Text style={styles.backButtonText}>‹ Back</Text>
          </TouchableOpacity>
          <Text style={styles.heroEyebrow}>choose difficulty</Text>
          <Text style={styles.heroTitle}>{appNames[appId]}</Text>
          <Text style={styles.heroSubtitle}>
            Pick the intensity that matches your confidence. Each track keeps its own high score so you can
            spot progress instantly.
          </Text>
        </View>

        <View style={styles.difficultyGrid}>
          {difficultyOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[styles.card, { borderColor: `${option.color}55`, backgroundColor: `${option.color}22` }]}
              onPress={() => handleDifficultySelection(option.id)}
              activeOpacity={0.9}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.icon}>{option.icon}</Text>
                <View style={[styles.levelPill, { backgroundColor: `${option.color}33` }]}>
                  <Text style={[styles.levelPillText, { color: option.color }]}>Tap to play</Text>
                </View>
              </View>
              <Text style={styles.questionCount}>{option.label}</Text>
              <Text style={styles.questionLabel}>Difficulty</Text>
              <Text style={styles.description}>{option.description}</Text>
              <View style={styles.difficultyHighScore}>
                <Text style={styles.highScoreLabel}>High Score</Text>
                {highScores[option.id] ? (
                  <>
                    <Text style={styles.highScoreValue}>
                      {highScores[option.id].scoreText} • {highScores[option.id].percentage}%
                    </Text>
                    {highScores[option.id].lastPlayed && (
                      <Text style={styles.highScoreMeta}>Last played {highScores[option.id].lastPlayed}</Text>
                    )}
                  </>
                ) : (
                  <Text style={styles.highScoreMeta}>No attempts yet</Text>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
=======
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{appNames[appId]}</Text>
        <Text style={styles.headerSubtitle}>How many questions?</Text>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {questionOptions.map((option) => (
          <TouchableOpacity
            key={option.count}
            style={[styles.card, { backgroundColor: option.color }]}
            onPress={() => handleQuestionSelection(option.count)}
            activeOpacity={0.8}
          >
            <Text style={styles.icon}>{option.icon}</Text>
            <Text style={styles.questionCount}>{option.count}</Text>
            <Text style={styles.questionLabel}>Questions</Text>
            <Text style={styles.description}>{option.description}</Text>
          </TouchableOpacity>
        ))}
>>>>>>> df4fd4376f775ff067a6ef744ffe13c1667e16bd
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD
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
    borderColor: 'rgba(255,255,255,0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    gap: 12,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  backButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  heroEyebrow: {
    textTransform: 'uppercase',
    letterSpacing: 3,
    fontSize: 12,
    fontWeight: '700',
    color: '#A5B4FC',
  },
  heroTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: '#fff',
  },
  heroSubtitle: {
    color: '#E2E8F0',
    fontSize: 16,
    lineHeight: 22,
  },
  difficultyGrid: {
    gap: 16,
  },
  card: {
    borderRadius: 26,
    padding: 24,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    fontSize: 50,
  },
  questionCount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
    textTransform: 'uppercase'
  },
  questionLabel: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
    fontWeight: '600',
    letterSpacing: 1,
=======
    backgroundColor: '#F5F7FA',
  },
  header: {
    backgroundColor: '#4A90E2',
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  backButton: {
    marginBottom: 15,
  },
  backButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#E8F4FD',
  },
  scrollContent: {
    padding: 20,
    paddingTop: 30,
  },
  card: {
    borderRadius: 20,
    padding: 30,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  icon: {
    fontSize: 50,
    marginBottom: 10,
  },
  questionCount: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  questionLabel: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
    fontWeight: '600',
>>>>>>> df4fd4376f775ff067a6ef744ffe13c1667e16bd
  },
  description: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
<<<<<<< HEAD
  levelPill: {
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  levelPillText: {
    fontSize: 12,
    fontWeight: '600',
  },
  difficultyHighScore: {
    marginTop: 16,
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 14,
    borderRadius: 12,
    backgroundColor: 'rgba(15,23,42,0.45)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  highScoreLabel: {
    fontSize: 12,
    color: '#ECF0F1',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  highScoreValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  highScoreMeta: {
    fontSize: 13,
    color: '#ECF0F1',
    marginTop: 4,
  },
=======
>>>>>>> df4fd4376f775ff067a6ef744ffe13c1667e16bd
});

