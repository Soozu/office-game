import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

export default function AppSelectionScreen({ navigation }) {
  const applications = [
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

  const handleAppSelection = (appId) => {
    navigation.navigate('Difficulty', { appId });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
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
  },
});

