<<<<<<< HEAD
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Audio } from 'expo-av';
import correctSfx from '../../assets/correct.mp3';
import wrongSfx from '../../assets/wrong.mp3';
import { questionsData } from '../data/questions';
import { useLanguage } from '../contexts/LanguageContext';

const QUESTION_DURATION = 30;
const CORRECT_SOUND = correctSfx;
const WRONG_SOUND = wrongSfx;

export default function QuizScreen({ route, navigation }) {
  const { appId, questionCount: questionCountParam, difficulty } = route.params;
  const { getLanguageSuffix } = useLanguage();

  // Determine the appropriate question set based on the selected language
  const languageSuffix = getLanguageSuffix();
  const languageKey = `${appId}${languageSuffix}`;
  const questionSource = questionsData[languageKey] || questionsData[appId];

  if (!questionSource) {
    throw new Error(`Question data not found for application: ${appId}`);
  }

  const buildQuestionPool = () => {
    if (difficulty && questionSource[difficulty]) {
      return [...questionSource[difficulty]];
    }
    return [
      ...questionSource.easy,
      ...questionSource.medium,
      ...questionSource.hard
    ];
  };

  const questionPool = buildQuestionPool();
  const targetQuestionCount = difficulty
    ? questionPool.length
    : Math.min(questionCountParam || questionPool.length, questionPool.length);

  if (targetQuestionCount === 0) {
    throw new Error(`No questions available for ${appId}${difficulty ? ` (${difficulty})` : ''}`);
  }

  const [questions] = useState(() => {
    const shuffled = [...questionPool];
=======
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
>>>>>>> df4fd4376f775ff067a6ef744ffe13c1667e16bd
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
<<<<<<< HEAD
    return shuffled.slice(0, targetQuestionCount);
=======
    return shuffled.slice(0, Math.min(questionCount, shuffled.length));
>>>>>>> df4fd4376f775ff067a6ef744ffe13c1667e16bd
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(1));
<<<<<<< HEAD
  const [celebrationAnim] = useState(new Animated.Value(0));
  const [timeLeft, setTimeLeft] = useState(QUESTION_DURATION);

  const correctSoundRef = useRef(null);
  const wrongSoundRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    const loadSoundEffect = async (source, ref) => {
      try {
        const { sound } = await Audio.Sound.createAsync(source, { shouldPlay: false, volume: 0.6 });
        if (isMounted) {
          ref.current = sound;
        } else {
          await sound.unloadAsync();
        }
      } catch (error) {
        console.log('Error loading sound effect:', error?.message || error);
      }
    };

    loadSoundEffect(CORRECT_SOUND, correctSoundRef);
    loadSoundEffect(WRONG_SOUND, wrongSoundRef);

    return () => {
      isMounted = false;
      if (correctSoundRef.current) {
        correctSoundRef.current.unloadAsync();
        correctSoundRef.current = null;
      }
      if (wrongSoundRef.current) {
        wrongSoundRef.current.unloadAsync();
        wrongSoundRef.current = null;
      }
    };
  }, []);

  const playSound = useCallback(async (soundRef) => {
    try {
      if (soundRef.current) {
        await soundRef.current.setPositionAsync(0);
        await soundRef.current.playAsync();
      }
    } catch (error) {
      console.log('Error playing sound effect:', error?.message || error);
    }
  }, []);

  const playCorrectSound = useCallback(() => playSound(correctSoundRef), [playSound]);
  const playWrongSound = useCallback(() => playSound(wrongSoundRef), [playSound]);
=======
>>>>>>> df4fd4376f775ff067a6ef744ffe13c1667e16bd

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

<<<<<<< HEAD
  const handleTimeExpire = useCallback(() => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedAnswer(-1);
    playWrongSound();
  }, [isAnswered, playWrongSound]);

  useEffect(() => {
    if (isAnswered) {
      return;
    }

    setTimeLeft(QUESTION_DURATION);
    const intervalId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);
          handleTimeExpire();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [currentQuestionIndex, isAnswered, handleTimeExpire]);

  const triggerCelebration = useCallback(() => {
    celebrationAnim.stopAnimation();
    celebrationAnim.setValue(0);
    Animated.sequence([
      Animated.timing(celebrationAnim, {
        toValue: 1,
        duration: 450,
        useNativeDriver: true,
      }),
      Animated.timing(celebrationAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [celebrationAnim]);

=======
>>>>>>> df4fd4376f775ff067a6ef744ffe13c1667e16bd
  const handleAnswerPress = (answerIndex) => {
    if (isAnswered) return;

    setSelectedAnswer(answerIndex);
    setIsAnswered(true);

    if (answerIndex === currentQuestion.correctAnswer) {
      setScore(score + currentQuestion.points);
      setCorrectAnswers(correctAnswers + 1);
<<<<<<< HEAD
      playCorrectSound();
      triggerCelebration();
    } else {
      playWrongSound();
=======
>>>>>>> df4fd4376f775ff067a6ef744ffe13c1667e16bd
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
<<<<<<< HEAD
        questionCount: questions.length,
        difficulty
=======
        questionCount
>>>>>>> df4fd4376f775ff067a6ef744ffe13c1667e16bd
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
<<<<<<< HEAD
      <ScrollView
=======
      
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
>>>>>>> df4fd4376f775ff067a6ef744ffe13c1667e16bd
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
<<<<<<< HEAD
        <View style={styles.heroCard}>
          <View style={styles.progressMeta}>
            <Text style={styles.questionCounter}>
              Question {currentQuestionIndex + 1} of {questions.length}
            </Text>
            <View style={styles.timerChip}>
              <Text style={styles.timerChipLabel}>Time</Text>
              <Text style={[styles.timerChipValue, timeLeft <= 5 && styles.timerChipWarning]}>
                {timeLeft}s
              </Text>
            </View>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <View style={styles.heroStats}>
            <View style={styles.statBlock}>
              <Text style={styles.statLabel}>Score</Text>
              <Text style={styles.statValue}>{score}</Text>
            </View>
            <View style={styles.statBlock}>
              <Text style={styles.statLabel}>Difficulty</Text>
              <Text style={styles.statValue}>
                {difficulty ? difficulty.charAt(0).toUpperCase() + difficulty.slice(1) : 'Mixed'}
              </Text>
            </View>
          </View>
        </View>

        <Animated.View style={[styles.questionWrapper, { opacity: fadeAnim }]}>
          <View style={styles.questionCard}>
            <Text style={styles.questionEyebrow}>Prompt</Text>
            <Text style={styles.question}>{currentQuestion.question}</Text>
            <View style={styles.pointsPill}>
              <Text style={styles.pointsLabel}>+{currentQuestion.points} pts</Text>
            </View>
=======
        <Animated.View style={{ opacity: fadeAnim }}>
          <View style={styles.questionCard}>
            <Text style={styles.question}>{currentQuestion.question}</Text>
            <Text style={styles.pointsLabel}>+{currentQuestion.points} points</Text>
>>>>>>> df4fd4376f775ff067a6ef744ffe13c1667e16bd
          </View>

          <View style={styles.optionsContainer}>
            {currentQuestion.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={getOptionStyle(index)}
                onPress={() => handleAnswerPress(index)}
                disabled={isAnswered}
<<<<<<< HEAD
                activeOpacity={0.85}
=======
                activeOpacity={0.7}
>>>>>>> df4fd4376f775ff067a6ef744ffe13c1667e16bd
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
<<<<<<< HEAD
              activeOpacity={0.85}
            >
              <Text style={styles.nextButtonText}>
                {currentQuestionIndex < questions.length - 1 ? 'Next question' : 'See results'}
=======
              activeOpacity={0.8}
            >
              <Text style={styles.nextButtonText}>
                {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}
>>>>>>> df4fd4376f775ff067a6ef744ffe13c1667e16bd
              </Text>
            </TouchableOpacity>
          )}
        </Animated.View>
      </ScrollView>
<<<<<<< HEAD
      <Animated.View
        pointerEvents="none"
        style={[
          styles.celebrationOverlay,
          {
            opacity: celebrationAnim,
            transform: [
              {
                scale: celebrationAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.8, 1.3],
                }),
              },
            ],
          },
        ]}
      >
        <Text style={styles.celebrationText}>Great!</Text>
      </Animated.View>
=======
>>>>>>> df4fd4376f775ff067a6ef744ffe13c1667e16bd
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD
    backgroundColor: 'transparent',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 40,
    gap: 24,
  },
  heroCard: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 28,
    padding: 22,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    gap: 16,
  },
  progressMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
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
  progressContainer: {
    marginBottom: 15,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
>>>>>>> df4fd4376f775ff067a6ef744ffe13c1667e16bd
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  questionCounter: {
<<<<<<< HEAD
    color: '#E2E8F0',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1,
  },
  timerChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15,23,42,0.5)',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    gap: 6,
  },
  timerChipLabel: {
    color: '#E2E8F0',
    fontSize: 12,
    letterSpacing: 1,
  },
  timerChipValue: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  timerChipWarning: {
    color: '#FFD166',
  },
  heroStats: {
    flexDirection: 'row',
    gap: 12,
  },
  statBlock: {
    flex: 1,
    backgroundColor: 'rgba(15,23,42,0.5)',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  statLabel: {
    color: '#94A3B8',
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  statValue: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  questionWrapper: {
    gap: 18,
  },
  questionCard: {
    backgroundColor: 'rgba(15,23,42,0.65)',
    borderRadius: 26,
    padding: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    gap: 10,
  },
  questionEyebrow: {
    fontSize: 12,
    letterSpacing: 2,
    color: '#A5B4FC',
    textTransform: 'uppercase',
  },
  question: {
    fontSize: 20,
    color: '#fff',
    lineHeight: 28,
  },
  pointsPill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(74,144,226,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(74,144,226,0.35)',
  },
  pointsLabel: {
    fontSize: 13,
    color: '#7DC4FF',
    fontWeight: '600',
  },
  optionsContainer: {
    gap: 12,
  },
  option: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    gap: 12,
  },
  correctOption: {
    backgroundColor: 'rgba(39,174,96,0.15)',
    borderColor: '#27AE60',
  },
  wrongOption: {
    backgroundColor: 'rgba(231,76,60,0.15)',
=======
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
>>>>>>> df4fd4376f775ff067a6ef744ffe13c1667e16bd
    borderColor: '#E74C3C',
  },
  disabledOption: {
    opacity: 0.6,
  },
  optionNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
<<<<<<< HEAD
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionNumberText: {
    color: '#E2E8F0',
    fontSize: 15,
    fontWeight: '600',
=======
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  optionNumberText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
>>>>>>> df4fd4376f775ff067a6ef744ffe13c1667e16bd
  },
  optionText: {
    flex: 1,
    fontSize: 16,
<<<<<<< HEAD
    color: '#E2E8F0',
=======
    color: '#2C3E50',
>>>>>>> df4fd4376f775ff067a6ef744ffe13c1667e16bd
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
<<<<<<< HEAD
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
=======
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
>>>>>>> df4fd4376f775ff067a6ef744ffe13c1667e16bd
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
<<<<<<< HEAD
  celebrationOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  celebrationText: {
    fontSize: 42,
    fontWeight: '800',
    color: '#7CFCB8',
    textShadowColor: 'rgba(0,0,0,0.35)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 12,
    letterSpacing: 4,
  },
=======
>>>>>>> df4fd4376f775ff067a6ef744ffe13c1667e16bd
});

