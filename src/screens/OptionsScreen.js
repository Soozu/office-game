import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useMusic } from '../contexts/MusicContext';

export default function OptionsScreen({ navigation }) {
  const { musicEnabled, toggleMusic } = useMusic();

  const handleBack = () => {
    navigation.goBack();
  };

  const optionItems = [
    {
      id: 'music',
      title: 'Background Music',
      description: 'Enable or disable background music',
      value: musicEnabled,
<<<<<<< HEAD
      onToggle: toggleMusic,
      icon: '🎵'
=======
      onToggle: toggleMusic
>>>>>>> df4fd4376f775ff067a6ef744ffe13c1667e16bd
    }
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
<<<<<<< HEAD
=======
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Options</Text>
        <Text style={styles.headerSubtitle}>Game settings and preferences</Text>
      </View>

>>>>>>> df4fd4376f775ff067a6ef744ffe13c1667e16bd
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
<<<<<<< HEAD
        <View style={styles.heroCard}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>‹ Back</Text>
          </TouchableOpacity>
          <View style={styles.heroContent}>
            <Text style={styles.heroIcon}>🎮</Text>
            <Text style={styles.heroTitle}>Options</Text>
            <Text style={styles.heroSubtitle}>Game settings and preferences</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Audio Settings</Text>
          {optionItems.map((item) => (
            <View key={item.id} style={styles.optionCard}>
              <View style={styles.optionIconContainer}>
                <Text style={styles.optionIcon}>{item.icon}</Text>
              </View>
              <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>{item.title}</Text>
                <Text style={styles.optionDescription}>{item.description}</Text>
              </View>
              <Switch
                value={item.value}
                onValueChange={item.onToggle}
                trackColor={{ false: 'rgba(189, 195, 199, 0.5)', true: 'rgba(74, 144, 226, 0.6)' }}
                thumbColor={item.value ? '#4A90E2' : '#f4f3f4'}
                ios_backgroundColor="rgba(189, 195, 199, 0.5)"
              />
            </View>
          ))}
        </View>
=======
        {optionItems.map((item) => (
          <View key={item.id} style={styles.optionCard}>
            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>{item.title}</Text>
              <Text style={styles.optionDescription}>{item.description}</Text>
            </View>
            <Switch
              value={item.value}
              onValueChange={item.onToggle}
              trackColor={{ false: '#BDC3C7', true: '#4A90E2' }}
              thumbColor={item.value ? '#fff' : '#f4f3f4'}
            />
          </View>
        ))}
>>>>>>> df4fd4376f775ff067a6ef744ffe13c1667e16bd

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Game Information</Text>
          <Text style={styles.infoText}>
            • Total Questions: 135{'\n'}
            • Applications: MS Word, PowerPoint, Excel{'\n'}
            • Difficulty Levels: Easy, Medium, Hard{'\n'}
            • Quiz Options: 10, 20, 30, 50 questions
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD
    backgroundColor: 'transparent',
=======
    backgroundColor: '#F5F7FA',
  },
  header: {
    backgroundColor: '#4A90E2',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  backButton: {
    marginBottom: 10,
  },
  backButtonText: {
    color: '#E8F4FD',
    fontSize: 18,
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
>>>>>>> df4fd4376f775ff067a6ef744ffe13c1667e16bd
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
<<<<<<< HEAD
    paddingTop: 50,
    paddingBottom: 40,
  },
  heroCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  backButton: {
    marginBottom: 16,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  heroContent: {
    alignItems: 'center',
  },
  heroIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  heroSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  section: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
    marginLeft: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  optionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
=======
  },
  optionCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
>>>>>>> df4fd4376f775ff067a6ef744ffe13c1667e16bd
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
<<<<<<< HEAD
  optionIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  optionIcon: {
    fontSize: 22,
  },
=======
>>>>>>> df4fd4376f775ff067a6ef744ffe13c1667e16bd
  optionContent: {
    flex: 1,
    marginRight: 15,
  },
  optionTitle: {
<<<<<<< HEAD
    fontSize: 17,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  optionDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.85)',
  },
  infoCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    padding: 20,
    marginTop: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
=======
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 5,
  },
  optionDescription: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginTop: 10,
>>>>>>> df4fd4376f775ff067a6ef744ffe13c1667e16bd
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
<<<<<<< HEAD
    color: '#fff',
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  infoText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 22,
=======
    color: '#2C3E50',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#7F8C8D',
    lineHeight: 20,
>>>>>>> df4fd4376f775ff067a6ef744ffe13c1667e16bd
  },
});

