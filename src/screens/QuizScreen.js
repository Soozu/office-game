import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { questionsData } from '../data/questions';
import { useLanguage } from '../contexts/LanguageContext';

export default function QuizScreen({ route, navigation }) {
  const { appId, questionCount } = route.params;
  const { getLanguageSuffix } = useLanguage();
  
  // Get the appropriate language suffix and construct the key
  const languageSuffix = getLanguageSuffix();
  const languageAppId = appId + languageSuffix;
  
  // Combine all questions from all difficulty levels
  const allQuestions = [
    ...questionsData[languageAppId].easy,
    ...questionsData[languageAppId].medium,
    ...questionsData[languageAppId].hard
  ];
  
  // Shuffle and select the specified number of questions
  const [questions] = useState(() => {
    // Fisher-Yates shuffle algorithm for better randomness
    const shuffled = [...allQuestions];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, Math.min(questionCount, shuffled.length));
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(1));

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswerPress = (answerIndex) => {
    if (isAnswered) return;

    setSelectedAnswer(answerIndex);
    setIsAnswered(true);

    if (answerIndex === currentQuestion.correctAnswer) {
      setScore(score + currentQuestion.points);
      setCorrectAnswers(correctAnswers + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      });
    } else {
      navigation.navigate('Result', { 
        score, 
        correctAnswers,
        totalQuestions: questions.length,
        totalPoints: questions.reduce((sum, q) => sum + q.points, 0),
        appId,
        questionCount
      });
    }
  };

  const getOptionStyle = (index) => {
    if (!isAnswered) {
      return styles.option;
    }
    if (index === currentQuestion.correctAnswer) {
      return [styles.option, styles.correctOption];
    }
    if (index === selectedAnswer && selectedAnswer !== currentQuestion.correctAnswer) {
      return [styles.option, styles.wrongOption];
    }
    return [styles.option, styles.disabledOption];
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.questionCounter}>
            Question {currentQuestionIndex + 1} of {questions.length}
          </Text>
        </View>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreLabel}>Score</Text>
          <Text style={styles.scoreValue}>{score}</Text>
        </View>
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={{ opacity: fadeAnim }}>
          <View style={styles.questionCard}>
            <Text style={styles.question}>{currentQuestion.question}</Text>
            <Text style={styles.pointsLabel}>+{currentQuestion.points} points</Text>
          </View>

          <View style={styles.optionsContainer}>
            {currentQuestion.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={getOptionStyle(index)}
                onPress={() => handleAnswerPress(index)}
                disabled={isAnswered}
                activeOpacity={0.7}
              >
                <View style={styles.optionNumber}>
                  <Text style={styles.optionNumberText}>{String.fromCharCode(65 + index)}</Text>
                </View>
                <Text style={styles.optionText}>{option}</Text>
                {isAnswered && index === currentQuestion.correctAnswer && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
                {isAnswered && index === selectedAnswer && selectedAnswer !== currentQuestion.correctAnswer && (
                  <Text style={styles.crossmark}>✗</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>

          {isAnswered && (
            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleNext}
              activeOpacity={0.8}
            >
              <Text style={styles.nextButtonText}>
                {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}
              </Text>
            </TouchableOpacity>
          )}
        </Animated.View>
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
  progressContainer: {
    marginBottom: 15,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  questionCounter: {
    color: '#E8F4FD',
    fontSize: 14,
    fontWeight: '600',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  scoreLabel: {
    color: '#E8F4FD',
    fontSize: 16,
  },
  scoreValue: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  questionCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  question: {
    fontSize: 18,
    color: '#2C3E50',
    lineHeight: 26,
    marginBottom: 10,
  },
  pointsLabel: {
    fontSize: 14,
    color: '#27AE60',
    fontWeight: 'bold',
  },
  optionsContainer: {
    marginBottom: 20,
  },
  option: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E8E8E8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  correctOption: {
    backgroundColor: '#D5F5E3',
    borderColor: '#27AE60',
  },
  wrongOption: {
    backgroundColor: '#FADBD8',
    borderColor: '#E74C3C',
  },
  disabledOption: {
    opacity: 0.6,
  },
  optionNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  optionNumberText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: '#2C3E50',
  },
  checkmark: {
    fontSize: 24,
    color: '#27AE60',
    fontWeight: 'bold',
  },
  crossmark: {
    fontSize: 24,
    color: '#E74C3C',
    fontWeight: 'bold',
  },
  nextButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

