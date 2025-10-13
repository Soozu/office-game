import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

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

  const handleMenuSelection = (optionId) => {
    switch (optionId) {
      case 'start':
        navigation.navigate('AppSelection');
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
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Office Quiz Game</Text>
        <Text style={styles.headerSubtitle}>Test your Microsoft Office knowledge</Text>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {menuOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[styles.card, { borderLeftColor: option.color }]}
            onPress={() => handleMenuSelection(option.id)}
            activeOpacity={0.8}
          >
            <View style={[styles.iconContainer, { backgroundColor: option.color }]}>
              <Text style={styles.icon}>{option.icon}</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.optionName}>{option.name}</Text>
              <Text style={styles.optionDescription}>{option.description}</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
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
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#E8F4FD',
    textAlign: 'center',
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
  optionName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 5,
  },
  optionDescription: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  arrow: {
    fontSize: 30,
    color: '#BDC3C7',
    fontWeight: 'bold',
  },
});

