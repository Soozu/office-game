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
<<<<<<< HEAD
      onToggle: toggleLanguage,
      icon: '🌐'
=======
      onToggle: toggleLanguage
>>>>>>> df4fd4376f775ff067a6ef744ffe13c1667e16bd
    }
  ];

  const actionItems = [
    {
      id: 'reset',
      title: 'Reset Progress',
      description: 'Clear all quiz scores and progress',
      color: '#E74C3C',
<<<<<<< HEAD
      icon: '🗑️',
=======
>>>>>>> df4fd4376f775ff067a6ef744ffe13c1667e16bd
      onPress: handleResetProgress
    },
    {
      id: 'cache',
      title: 'Clear Cache',
      description: 'Free up storage space',
      color: '#F39C12',
<<<<<<< HEAD
      icon: '🧹',
=======
>>>>>>> df4fd4376f775ff067a6ef744ffe13c1667e16bd
      onPress: handleClearCache
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
        <Text style={styles.headerTitle}>Settings</Text>
        <Text style={styles.headerSubtitle}>App configuration and preferences</Text>
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
            <Text style={styles.heroIcon}>⚙️</Text>
            <Text style={styles.heroTitle}>Settings</Text>
            <Text style={styles.heroSubtitle}>App configuration and preferences</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Language Settings</Text>
          {settingItems.map((item) => (
            <View key={item.id} style={styles.settingCard}>
              <View style={styles.settingIconContainer}>
                <Text style={styles.settingIcon}>{item.icon}</Text>
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>{item.title}</Text>
                <Text style={styles.settingDescription}>{item.description}</Text>
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

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Data Management</Text>
          {actionItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.actionCard, { borderLeftColor: item.color }]}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <View style={[styles.actionIconContainer, { backgroundColor: `${item.color}20` }]}>
                <Text style={styles.actionIcon}>{item.icon}</Text>
              </View>
              <View style={styles.actionContent}>
                <Text style={styles.actionTitle}>{item.title}</Text>
                <Text style={styles.actionDescription}>{item.description}</Text>
              </View>
              <Text style={styles.actionArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>
=======
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
>>>>>>> df4fd4376f775ff067a6ef744ffe13c1667e16bd

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>App Information</Text>
          <Text style={styles.infoText}>
<<<<<<< HEAD
=======

>>>>>>> df4fd4376f775ff067a6ef744ffe13c1667e16bd
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
  settingCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
=======
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
>>>>>>> df4fd4376f775ff067a6ef744ffe13c1667e16bd
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
<<<<<<< HEAD
  settingIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  settingIcon: {
    fontSize: 22,
  },
=======
>>>>>>> df4fd4376f775ff067a6ef744ffe13c1667e16bd
  settingContent: {
    flex: 1,
    marginRight: 15,
  },
  settingTitle: {
<<<<<<< HEAD
    fontSize: 17,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  settingDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.85)',
  },
  actionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    borderLeftWidth: 4,
=======
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
>>>>>>> df4fd4376f775ff067a6ef744ffe13c1667e16bd
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
<<<<<<< HEAD
  },
  actionIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  actionIcon: {
    fontSize: 22,
=======
    borderLeftWidth: 5,
>>>>>>> df4fd4376f775ff067a6ef744ffe13c1667e16bd
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
<<<<<<< HEAD
    fontSize: 17,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  actionDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.85)',
  },
  actionArrow: {
    fontSize: 28,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: 'bold',
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

