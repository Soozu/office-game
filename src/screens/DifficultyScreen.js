import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function DifficultyScreen({ route, navigation }) {
  const { appId } = route.params;

  const appNames = {
    msword: 'MS Word',
    powerpoint: 'PowerPoint',
    excel: 'Excel'
  };

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
  };

  const handleBack = () => {
    navigation.goBack();
  };

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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  description: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
});

