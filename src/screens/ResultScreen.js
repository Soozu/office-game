import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ResultScreen({ route, navigation }) {
  const { score, correctAnswers, totalQuestions, totalPoints, appId, questionCount } = route.params;
  
  const [scaleAnim] = useState(new Animated.Value(0));
  const [fadeAnim] = useState(new Animated.Value(0));
  const [isNewHighScore, setIsNewHighScore] = useState(false);
  
  const percentage = Math.round((score / totalPoints) * 100);
  
  const getPerformanceData = () => {
    if (percentage >= 80) {
      return {
        emoji: '🌟',
        message: 'Excellent!',
        color: '#27AE60'
      };
    } else if (percentage >= 60) {
      return {
        emoji: '👍',
        message: 'Good Job!',
        color: '#F39C12'
      };
    } else {
      return {
        emoji: '💪',
        message: 'Keep Practicing!',
        color: '#E74C3C'
      };
    }
  };

  const performance = getPerformanceData();

  useEffect(() => {
    saveScore();
    
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 10,
        friction: 3,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const saveScore = async () => {
    try {
      // Load existing scores
      const savedScores = await AsyncStorage.getItem(`scores_${appId}`);
      const scores = savedScores ? JSON.parse(savedScores) : {};
      
      // Check if this is a new high score
      const existingScore = scores[questionCount];
      const isHighScore = !existingScore || score > existingScore.score;
      
      if (isHighScore) {
        setIsNewHighScore(true);
        // Save new high score
        scores[questionCount] = {
          score,
          totalPoints,
          totalQuestions,
          percentage,
          date: new Date().toISOString()
        };
        
        await AsyncStorage.setItem(`scores_${appId}`, JSON.stringify(scores));
      }
    } catch (error) {
      console.log('Error saving score:', error);
    }
  };

  const handlePlayAgain = () => {
    navigation.navigate('Difficulty', { appId });
  };

  const handleGoHome = () => {
    navigation.navigate('AppSelection');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
       <View style={[styles.header, { backgroundColor: performance.color }]}>
         <Animated.View 
           style={[
             styles.emojiContainer,
             {
               transform: [{ scale: scaleAnim }]
             }
           ]}
         >
           <Text style={styles.emoji}>{performance.emoji}</Text>
         </Animated.View>
         <Text style={styles.performanceMessage}>{performance.message}</Text>
       </View>

       <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        
        {isNewHighScore && (
          <View style={styles.highScoreBadge}>
            <Text style={styles.highScoreText}>🏆 New High Score! 🏆</Text>
          </View>
        )}

        <View style={styles.scoreCard}>
          <View style={styles.scoreRow}>
            <Text style={styles.scoreLabel}>Your Score</Text>
            <Text style={[styles.scoreValue, { color: performance.color }]}>
              {score} / {totalPoints}
            </Text>
          </View>
          
          <View style={styles.separator} />
          
          <View style={styles.scoreRow}>
            <Text style={styles.scoreLabel}>Correct Answers</Text>
            <Text style={styles.scoreDetail}>{correctAnswers} / {totalQuestions}</Text>
          </View>
          
          <View style={styles.scoreRow}>
            <Text style={styles.scoreLabel}>Percentage</Text>
            <Text style={styles.scoreDetail}>{percentage}%</Text>
          </View>
        </View>

        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{totalQuestions}</Text>
            <Text style={styles.statLabel}>Questions Completed</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={handlePlayAgain}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>Play Again</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={handleGoHome}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryButtonText}>Back to Menu</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  emojiContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  emoji: {
    fontSize: 60,
  },
  content: {
    flex: 1,
    padding: 20,
    marginTop: -20,
  },
  performanceMessage: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  highScoreBadge: {
    backgroundColor: '#FFD700',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  highScoreText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
  },
  scoreCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  scoreLabel: {
    fontSize: 16,
    color: '#7F8C8D',
  },
  scoreValue: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  scoreDetail: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  separator: {
    height: 1,
    backgroundColor: '#E8E8E8',
    marginVertical: 10,
  },
  statsCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  buttonContainer: {
    gap: 15,
  },
  button: {
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  primaryButton: {
    backgroundColor: '#4A90E2',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#4A90E2',
  },
  secondaryButtonText: {
    color: '#4A90E2',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

