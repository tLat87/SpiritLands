import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { aircraft } from '../data/aircraft';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const AircraftQuizScreen: React.FC = () => {
  const navigation = useNavigation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));

  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: "Which aircraft is known as the 'Queen of the Skies'?",
      options: ["Boeing 747", "Airbus A380", "Concorde", "F-22 Raptor"],
      correctAnswer: 0,
      explanation: "The Boeing 747 is famously known as the 'Queen of the Skies' due to its distinctive hump design and pioneering role in commercial aviation."
    },
    {
      id: 2,
      question: "What is the maximum speed of the SR-71 Blackbird?",
      options: ["2,410 km/h", "3,540 km/h", "2,179 km/h", "1,930 km/h"],
      correctAnswer: 1,
      explanation: "The SR-71 Blackbird can reach speeds of up to 3,540 km/h, making it the fastest air-breathing manned aircraft ever built."
    },
    {
      id: 3,
      question: "Which aircraft was the first supersonic commercial airliner?",
      options: ["Boeing 747", "Airbus A380", "Concorde", "F-35 Lightning II"],
      correctAnswer: 2,
      explanation: "The Concorde was the first and only supersonic commercial airliner to operate regular passenger flights."
    },
    {
      id: 4,
      question: "What is the heaviest aircraft ever built?",
      options: ["Boeing 747", "C-5 Galaxy", "Antonov An-225", "Airbus A380"],
      correctAnswer: 2,
      explanation: "The Antonov An-225 Mriya is the heaviest aircraft ever built, designed to carry the Soviet space shuttle."
    },
    {
      id: 5,
      question: "Which aircraft can carry up to 853 passengers?",
      options: ["Boeing 747", "Airbus A380", "Concorde", "C-5 Galaxy"],
      correctAnswer: 1,
      explanation: "The Airbus A380 is the world's largest passenger airliner, capable of carrying up to 853 passengers in a single-class configuration."
    },
    {
      id: 6,
      question: "What is the nickname of the F-22 Raptor?",
      options: ["Stealth Eagle", "Flying Tiger", "Raptor", "Sky Warrior"],
      correctAnswer: 2,
      explanation: "The F-22 is commonly known simply as the 'Raptor', representing its role as a fifth-generation stealth fighter."
    },
    {
      id: 7,
      question: "Which country manufactured the MiG-29?",
      options: ["USA", "France", "Russia", "Germany"],
      correctAnswer: 2,
      explanation: "The MiG-29 was designed and manufactured in the Soviet Union (now Russia) by Mikoyan."
    },
    {
      id: 8,
      question: "What makes the F-35 unique among fighter aircraft?",
      options: ["It can fly underwater", "It has three variants for different military branches", "It's made of wood", "It has no wings"],
      correctAnswer: 1,
      explanation: "The F-35 has three variants designed specifically for the Air Force, Navy, and Marine Corps, each with unique capabilities."
    }
  ];

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, [currentQuestion]);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    if (answerIndex === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizCompleted(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage >= 90) return "🏆 Aviation Expert!";
    if (percentage >= 70) return "✈️ Great Knowledge!";
    if (percentage >= 50) return "🎯 Good Effort!";
    return "📚 Keep Learning!";
  };

  if (quizCompleted) {
    return (
      <View style={styles.container}>
        <View style={styles.backgroundContainer}>
          <View style={styles.overlay} />
        </View>
        
        <Animated.View
          style={[
            styles.completionContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.completionTitle}>Quiz Complete!</Text>
          <Text style={styles.scoreText}>{score}/{quizQuestions.length}</Text>
          <Text style={styles.scoreMessage}>{getScoreMessage()}</Text>
          
          <View style={styles.percentageContainer}>
            <Text style={styles.percentageText}>
              {Math.round((score / quizQuestions.length) * 100)}%
            </Text>
          </View>

          <TouchableOpacity style={styles.restartButton} onPress={restartQuiz}>
            <Text style={styles.restartButtonText}>🔄 Try Again</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>← Back to Home</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }

  const currentQ = quizQuestions[currentQuestion];

  return (
    <View style={styles.container}>
      <View style={styles.backgroundContainer}>
        <View style={styles.overlay} />
      </View>

      <Animated.View
        style={[
          styles.header,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <TouchableOpacity style={styles.headerBackButton} onPress={() => navigation.goBack()}>
          <Text style={styles.headerBackButtonText}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Aircraft Quiz</Text>
        <Text style={styles.progressText}>{currentQuestion + 1}/{quizQuestions.length}</Text>
      </Animated.View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Animated.View
          style={[
            styles.questionContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.questionText}>{currentQ.question}</Text>
          
          <View style={styles.optionsContainer}>
            {currentQ.options.map((option, index) => {
              let buttonStyle = styles.optionButton;
              let textStyle = styles.optionText;
              
              if (showResult && selectedAnswer === index) {
                if (index === currentQ.correctAnswer) {
                  buttonStyle = styles.correctButton;
                  textStyle = styles.correctText;
                } else {
                  buttonStyle = styles.incorrectButton;
                  textStyle = styles.incorrectText;
                }
              } else if (showResult && index === currentQ.correctAnswer) {
                buttonStyle = styles.correctButton;
                textStyle = styles.correctText;
              }

              return (
                <TouchableOpacity
                  key={index}
                  style={buttonStyle}
                  onPress={() => !showResult && handleAnswerSelect(index)}
                  disabled={showResult}
                >
                  <Text style={textStyle}>{option}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {showResult && (
            <Animated.View
              style={[
                styles.explanationContainer,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              <Text style={styles.explanationTitle}>Explanation:</Text>
              <Text style={styles.explanationText}>{currentQ.explanation}</Text>
            </Animated.View>
          )}

          {showResult && (
            <Animated.View
              style={[
                styles.nextButtonContainer,
                {
                  opacity: fadeAnim,
                  transform: [{ scale: fadeAnim }],
                },
              ]}
            >
              <TouchableOpacity style={styles.nextButton} onPress={handleNextQuestion}>
                <Text style={styles.nextButtonText}>
                  {currentQuestion < quizQuestions.length - 1 ? 'Next Question →' : 'Finish Quiz'}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          )}
        </Animated.View>

        <View style={{ marginBottom: 100 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000000',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 60,
  },
  headerBackButton: {
    backgroundColor: '#FF0000',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  headerBackButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  progressText: {
    color: '#FF0000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  questionContainer: {
    padding: 20,
  },
  questionText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 32,
  },
  optionsContainer: {
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#1a1a1a',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#333333',
  },
  optionText: {
    color: '#ffffff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
  },
  correctButton: {
    backgroundColor: '#1a4a1a',
    borderColor: '#00ff00',
  },
  correctText: {
    color: '#00ff00',
    fontWeight: 'bold',
  },
  incorrectButton: {
    backgroundColor: '#4a1a1a',
    borderColor: '#ff4444',
  },
  incorrectText: {
    color: '#ff4444',
  },
  explanationContainer: {
    backgroundColor: '#1a1a1a',
    borderRadius: 15,
    padding: 20,
    borderWidth: 2,
    borderColor: '#FF0000',
    marginBottom: 20,
  },
  explanationTitle: {
    color: '#FF0000',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  explanationText: {
    color: '#ffffff',
    fontSize: 16,
    lineHeight: 24,
  },
  nextButtonContainer: {
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: '#FF0000',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#ffd700',
  },
  nextButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  completionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  completionTitle: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  scoreText: {
    color: '#FF0000',
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scoreMessage: {
    color: '#ffd700',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  percentageContainer: {
    backgroundColor: '#FF0000',
    borderRadius: 50,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  percentageText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  restartButton: {
    backgroundColor: '#FF0000',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#ffd700',
  },
  restartButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#333333',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AircraftQuizScreen;
