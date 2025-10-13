import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useLanguage } from '../contexts/LanguageContext';

export default function SettingsScreen({ navigation }) {
  const { isEnglish, toggleLanguage } = useLanguage();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleResetProgress = () => {
    Alert.alert(
      'Reset Progress',
      'Are you sure you want to reset all quiz progress? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Reset', style: 'destructive', onPress: () => {
          // Reset progress logic here
          Alert.alert('Success', 'Progress has been reset successfully.');
        }}
      ]
    );
  };

  const handleClearCache = () => {
    Alert.alert(
      'Clear Cache',
      'This will clear all cached data. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', style: 'destructive', onPress: () => {
          // Clear cache logic here
          Alert.alert('Success', 'Cache cleared successfully.');
        }}
      ]
    );
  };

  const settingItems = [
    {
      id: 'language',
      title: 'Language',
      description: 'English / Filipino',
      value: isEnglish,
      onToggle: toggleLanguage
    }
  ];

  const actionItems = [
    {
      id: 'reset',
      title: 'Reset Progress',
      description: 'Clear all quiz scores and progress',
      color: '#E74C3C',
      onPress: handleResetProgress
    },
    {
      id: 'cache',
      title: 'Clear Cache',
      description: 'Free up storage space',
      color: '#F39C12',
      onPress: handleClearCache
    }
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <Text style={styles.headerSubtitle}>App configuration and preferences</Text>
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Language Settings</Text>
        {settingItems.map((item) => (
          <View key={item.id} style={styles.settingCard}>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>{item.title}</Text>
              <Text style={styles.settingDescription}>{item.description}</Text>
            </View>
            <Switch
              value={item.value}
              onValueChange={item.onToggle}
              trackColor={{ false: '#BDC3C7', true: '#4A90E2' }}
              thumbColor={item.value ? '#fff' : '#f4f3f4'}
            />
          </View>
        ))}

        <Text style={styles.sectionTitle}>Data Management</Text>
        {actionItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.actionCard, { borderLeftColor: item.color }]}
            onPress={item.onPress}
            activeOpacity={0.7}
          >
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>{item.title}</Text>
              <Text style={styles.actionDescription}>{item.description}</Text>
            </View>
            <Text style={styles.actionArrow}>›</Text>
          </TouchableOpacity>
        ))}

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>App Information</Text>
          <Text style={styles.infoText}>

            {'\n'}Developer Team:{'\n'}
            Leader: Charice C. Avila{'\n'}
            {'\n'}Members:{'\n'}
            John Noel C. Alfonso{'\n'}
            Andrew M. Cemanes{'\n'}
            Jean Ruth M. Malque{'\n'}
            Robert P. Manuel{'\n'}
            Vanessa Loraine D. Rito{'\n'}
            Gerald D. Rufo{'\n'}
            {'\n'}© 2025 All Rights Reserved
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginTop: 10,
    marginBottom: 15,
    marginLeft: 5,
  },
  settingCard: {
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
  settingContent: {
    flex: 1,
    marginRight: 15,
  },
  settingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 5,
  },
  settingDescription: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  actionCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 5,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 5,
  },
  actionDescription: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  actionArrow: {
    fontSize: 30,
    color: '#BDC3C7',
    fontWeight: 'bold',
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

