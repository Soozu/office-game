import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function StartMenuScreen({ navigation }) {

  const menuOptions = [
    {
      id: 'start',
      name: 'Start',
      icon: '🎮',
      color: '#27AE60',
      description: 'Begin Microsoft Office quiz'
    },
    {
      id: 'multiplayer',
      name: 'Multiplayer',
      icon: '👥',
      color: '#E67E22',
      description: 'Challenge a friend on the same WiFi'
    },
    {
      id: 'options',
      name: 'Options',
      icon: '⚙️',
      color: '#3498DB',
      description: 'Game settings and preferences'
    },
    {
      id: 'settings',
      name: 'Settings',
      icon: '🔧',
      color: '#9B59B6',
      description: 'App configuration and preferences'
    }
  ];

  const quickStats = [
    { id: 'apps', label: 'Applications', value: '03', detail: 'Word • PowerPoint • Excel' },
    { id: 'questions', label: 'Question Bank', value: '450+', detail: 'Curated challenges' },
    { id: 'awards', label: 'Achievements', value: 'Unlimited', detail: 'Track your mastery' },
  ];

  const highlights = [
    { id: 'adaptive', label: 'Adaptive difficulty' },
    { id: 'rewards', label: 'Gamified rewards' },
    { id: 'insights', label: 'Actionable insights' },
  ];

  const handleMenuSelection = (optionId) => {
    switch (optionId) {
      case 'start':
        navigation.navigate('AppSelection');
        break;
      case 'multiplayer':
        navigation.navigate('MultiplayerMenu');
        break;
      case 'options':
        navigation.navigate('Options');
        break;
      case 'settings':
        navigation.navigate('Settings');
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroCard}>
          <Text style={styles.heroLabel}>Welcome back</Text>
          <Text style={styles.heroTitle}>Office Quiz Game</Text>
          <Text style={styles.heroSubtitle}>
            Challenge yourself with adaptive quizzes, unlock achievements, and master Microsoft Office
            faster.
          </Text>

          <View style={styles.highlightRow}>
            {highlights.map((item) => (
              <View key={item.id} style={styles.highlightPill}>
                <Text style={styles.highlightText}>• {item.label}</Text>
              </View>
            ))}
          </View>

          <View style={styles.heroActions}>
            <TouchableOpacity style={styles.primaryButton} onPress={() => handleMenuSelection('start')}>
              <Text style={styles.primaryButtonText}>Start Training</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton} onPress={() => handleMenuSelection('options')}>
              <Text style={styles.secondaryButtonText}>Quick Options</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.statGrid}>
          {quickStats.map((stat) => (
            <View key={stat.id} style={styles.statCard}>
              <Text style={styles.statLabel}>{stat.label}</Text>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statDetail}>{stat.detail}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Navigate</Text>
        <View style={styles.menuGrid}>
          {menuOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[styles.menuCard, { borderColor: `${option.color}55` }]}
              onPress={() => handleMenuSelection(option.id)}
              activeOpacity={0.9}
            >
              <View style={[styles.menuIcon, { backgroundColor: `${option.color}1A` }]}>
                <Text style={styles.menuIconText}>{option.icon}</Text>
              </View>
              <Text style={styles.menuName}>{option.name}</Text>
              <Text style={styles.menuDescription}>{option.description}</Text>
              <View style={[styles.menuPill, { backgroundColor: `${option.color}22` }]}>
                <Text style={[styles.menuPillText, { color: option.color }]}>Tap to open →</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
    borderColor: 'rgba(255,255,255,0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    gap: 16,
  },
  heroLabel: {
    color: '#A5B4FC',
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontSize: 12,
    fontWeight: '600',
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  heroSubtitle: {
    fontSize: 16,
    lineHeight: 22,
    color: '#E2E8F0',
  },
  highlightRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  highlightPill: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  highlightText: {
    color: '#F8FAFC',
    fontSize: 13,
    fontWeight: '500',
  },
  heroActions: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  primaryButton: {
    flexGrow: 1,
    backgroundColor: '#4A90E2',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    flexGrow: 1,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  secondaryButtonText: {
    color: '#E2E8F0',
    fontSize: 16,
    fontWeight: '600',
  },
  statGrid: {
    flexDirection: 'column',
    gap: 12,
  },
  statCard: {
    width: '100%',
    backgroundColor: 'rgba(15,23,42,0.55)',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(148,163,184,0.25)',
  },
  statLabel: {
    color: '#94A3B8',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 6,
  },
  statValue: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
  },
  statDetail: {
    color: '#CBD5F5',
    fontSize: 13,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#E2E8F0',
  },
  menuGrid: {
    flexDirection: 'column',
    gap: 16,
  },
  menuCard: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    gap: 12,
  },
  menuIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIconText: {
    fontSize: 28,
  },
  menuName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  menuDescription: {
    fontSize: 14,
    color: '#E2E8F0',
  },
  menuPill: {
    marginTop: 4,
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
  },
  menuPillText: {
    fontSize: 12,
    fontWeight: '600',
  },
});

