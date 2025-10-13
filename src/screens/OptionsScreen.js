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
      onToggle: toggleMusic
    }
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Options</Text>
        <Text style={styles.headerSubtitle}>Game settings and preferences</Text>
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
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
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  optionCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  optionContent: {
    flex: 1,
    marginRight: 15,
  },
  optionTitle: {
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#7F8C8D',
    lineHeight: 20,
  },
});

