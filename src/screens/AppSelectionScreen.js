<<<<<<< HEAD
import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const applications = [
=======
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

export default function AppSelectionScreen({ navigation }) {
  const applications = [
>>>>>>> df4fd4376f775ff067a6ef744ffe13c1667e16bd
    {
      id: 'msword',
      name: 'MS Word',
      icon: '📝',
      color: '#2B579A',
      description: 'Learn Word Processing'
    },
    {
      id: 'powerpoint',
      name: 'PowerPoint',
      icon: '📊',
      color: '#D24726',
      description: 'Learn Presentations'
    },
    {
      id: 'excel',
      name: 'Excel',
      icon: '📈',
      color: '#217346',
      description: 'Learn Spreadsheets'
    }
  ];

<<<<<<< HEAD
const capitalize = (value = '') => value.charAt(0).toUpperCase() + value.slice(1);

export default function AppSelectionScreen({ navigation }) {
  const [highScores, setHighScores] = useState({});

  const loadHighScores = useCallback(async () => {
    const collectedScores = {};

    await Promise.all(
      applications.map(async (app) => {
        try {
          const savedScores = await AsyncStorage.getItem(`scores_${app.id}`);
          if (!savedScores) {
            return;
          }

          const parsedScores = JSON.parse(savedScores);
          const entries = Object.values(parsedScores);
          if (!entries.length) {
            return;
          }

          const bestEntry = entries.reduce((best, current) => {
            if (!best) {
              return current;
            }
            const bestPercentage = best.percentage ?? Math.round((best.score / best.totalPoints) * 100);
            const currentPercentage =
              current.percentage ?? Math.round((current.score / current.totalPoints) * 100);
            return currentPercentage > bestPercentage ? current : best;
          }, null);

          if (bestEntry) {
            const percentage = bestEntry.percentage ?? Math.round((bestEntry.score / bestEntry.totalPoints) * 100);
            const modeLabel = bestEntry.difficulty
              ? `${capitalize(bestEntry.difficulty)} difficulty`
              : `${bestEntry.questionCount} questions`;
            collectedScores[app.id] = {
              percentage,
              modeLabel,
              scoreText: `${bestEntry.score} / ${bestEntry.totalPoints}`
            };
          }
        } catch (error) {
          console.log('Error loading high score for', app.id, error);
        }
      })
    );

    setHighScores(collectedScores);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadHighScores();
    }, [loadHighScores])
  );

=======
>>>>>>> df4fd4376f775ff067a6ef744ffe13c1667e16bd
  const handleAppSelection = (appId) => {
    navigation.navigate('Difficulty', { appId });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
<<<<<<< HEAD
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroCard}>
          <Text style={styles.heroEyebrow}>learning paths</Text>
          <Text style={styles.heroTitle}>Choose an Application</Text>
          <Text style={styles.heroSubtitle}>
            Dive into focused tracks for Word, PowerPoint, or Excel. High scores are synced so you can
            instantly pick up where you left off.
          </Text>

          <View style={styles.heroMetaRow}>
            <View style={styles.heroMeta}>
              <Text style={styles.heroMetaValue}>3</Text>
              <Text style={styles.heroMetaLabel}>apps covered</Text>
            </View>
            <View style={styles.heroMeta}>
              <Text style={styles.heroMetaValue}>Adaptive</Text>
              <Text style={styles.heroMetaLabel}>difficulty modes</Text>
            </View>
          </View>
        </View>

        <View style={styles.appsGrid}>
          {applications.map((app) => {
            const highScore = highScores[app.id];

            return (
              <TouchableOpacity
                key={app.id}
                style={[styles.card, { borderColor: `${app.color}4D` }]}
                onPress={() => handleAppSelection(app.id)}
                activeOpacity={0.9}
              >
                <View style={styles.cardHeader}>
                  <View style={[styles.iconContainer, { backgroundColor: `${app.color}20` }]}>
                    <Text style={styles.icon}>{app.icon}</Text>
                  </View>
                  <View style={[styles.badge, { backgroundColor: `${app.color}33` }]}>
                    <Text style={[styles.badgeText, { color: app.color }]}>Tap to explore</Text>
                  </View>
                </View>

                <Text style={styles.appName}>{app.name}</Text>
                <Text style={styles.appDescription}>{app.description}</Text>

                <View style={styles.highScoreContainer}>
                  <Text style={styles.highScoreLabel}>High Score</Text>
                  {highScore ? (
                    <>
                      <Text style={styles.highScoreValue}>
                        {highScore.scoreText} • {highScore.percentage}%
                      </Text>
                      <Text style={styles.highScoreMode}>{highScore.modeLabel}</Text>
                    </>
                  ) : (
                    <Text style={styles.noHighScore}>No attempts yet</Text>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
=======
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Choose an Application</Text>
        <Text style={styles.headerSubtitle}>What do you want to learn?</Text>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {applications.map((app) => (
          <TouchableOpacity
            key={app.id}
            style={[styles.card, { borderLeftColor: app.color }]}
            onPress={() => handleAppSelection(app.id)}
            activeOpacity={0.8}
          >
            <View style={[styles.iconContainer, { backgroundColor: app.color }]}>
              <Text style={styles.icon}>{app.icon}</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.appName}>{app.name}</Text>
              <Text style={styles.appDescription}>{app.description}</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
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
    gap: 14,
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
  heroMetaRow: {
    flexDirection: 'row',
    gap: 12,
  },
  heroMeta: {
    flex: 1,
    borderRadius: 18,
    padding: 16,
    backgroundColor: 'rgba(15,23,42,0.45)',
    borderWidth: 1,
    borderColor: 'rgba(148,163,184,0.25)',
  },
  heroMetaValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
  },
  heroMetaLabel: {
    marginTop: 4,
    fontSize: 12,
    color: '#94A3B8',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  appsGrid: {
    gap: 18,
  },
  card: {
    backgroundColor: 'rgba(15,23,42,0.6)',
    borderRadius: 26,
    padding: 20,
    borderWidth: 1,
    gap: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 28,
  },
  appName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
  },
  appDescription: {
    fontSize: 14,
    color: '#E2E8F0',
  },
  highScoreContainer: {
    marginTop: 10,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)',
    gap: 4,
  },
  highScoreLabel: {
    fontSize: 11,
    color: '#CBD5F5',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  highScoreValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  highScoreMode: {
    fontSize: 12,
    color: '#94A3B8',
  },
  noHighScore: {
    fontSize: 14,
    color: '#94A3B8',
  },
  badge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
=======
    backgroundColor: '#F5F7FA',
  },
  header: {
    backgroundColor: '#4A90E2',
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
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
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 5,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  icon: {
    fontSize: 30,
  },
  cardContent: {
    flex: 1,
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 5,
  },
  appDescription: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  arrow: {
    fontSize: 30,
    color: '#BDC3C7',
    fontWeight: 'bold',
>>>>>>> df4fd4376f775ff067a6ef744ffe13c1667e16bd
  },
});

