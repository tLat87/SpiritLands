import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { OnboardingStep } from '../types/volcano';

const { width, height } = Dimensions.get('window');

const onboardingSteps: OnboardingStep[] = [
  {
    id: 1,
    title: 'AEROSPIRIT LANDS',
    description: '',
    buttonText: 'Start',
    image: require('../assets/img/LOGO.png'),
  },
  {
    id: 2,
    title: "HI, I'M ALEX!",
    description:
      'Your guide to the world of the greatest aircraft. Together we will discover their power and engineering marvels.',
    buttonText: 'Hello, Alex!',
    image: require('../assets/img/Onboard/image5.png'),
  },
  {
    id: 3,
    title: 'AMAZING FACTS',
    description:
      "I'll show you incredible stories and history about aircraft that have shaped aviation over decades.",
    buttonText: 'Continue!',
    image: require('../assets/img/Onboard/image6.png'),
  },
  {
    id: 4,
    title: 'YOUR COLLECTION',
    description:
      "Save your favorite aircraft in your collection and return to them whenever you want. Let's begin the journey!",
    buttonText: 'Start!',
    image: require('../assets/img/Onboard/image7.png'),
  },
];

interface OnboardingScreenProps {
  onComplete: () => void;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(1));
  const [slideAnim] = useState(new Animated.Value(0));
  const [textAnim] = useState(new Animated.Value(0));
  const [buttonAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    animateIn();
  }, [currentStep]);

  const animateIn = () => {
    fadeAnim.setValue(0);
    slideAnim.setValue(50);
    textAnim.setValue(0);
    buttonAnim.setValue(0);

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
      Animated.timing(textAnim, {
        toValue: 1,
        duration: 1000,
        delay: 300,
        useNativeDriver: true,
      }),
      Animated.timing(buttonAnim, {
        toValue: 1,
        duration: 1000,
        delay: 600,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const nextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      (navigation as any).navigate('MainTabs');
    }
  };

  const currentStepData = onboardingSteps[currentStep];

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <View style={styles.backgroundContainer}>
        <Image
          source={require('../assets/img/b2c1e1e22ee146d97e9cfca236a375211af0ccbf.png')}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
        <View style={styles.volcanoOverlay} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Изображение для каждого шага */}
        {currentStepData.image && (
          <Animated.View
            style={[
              styles.imageContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Image
              source={currentStepData.image}
              style={styles.stepImage}
              resizeMode="contain"
            />
          </Animated.View>
        )}

        {/* Текстовый контент */}
        <Animated.View
          style={[
            styles.textContainer,
            {
              opacity: textAnim,
              transform: [
                {
                  translateY: textAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [30, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={styles.title}>{currentStepData.title}</Text>
          {currentStepData.description ? (
            <Text style={styles.description}>{currentStepData.description}</Text>
          ) : null}
        </Animated.View>

        {/* Кнопка */}
        <Animated.View
          style={[
            styles.buttonContainer,
            {
              opacity: buttonAnim,
              transform: [
                {
                  scale: buttonAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.8, 1],
                  }),
                },
              ],
            },
          ]}
        >
          <TouchableOpacity style={styles.button} onPress={nextStep}>
            <Text style={styles.buttonText}>{currentStepData.buttonText}</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Прогресс-точки */}
        <View style={styles.progressContainer}>
          {onboardingSteps.map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressDot,
                index === currentStep && styles.progressDotActive,
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  volcanoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  stepImage: {
    width: width * 0.8,
    height: height * 0.4,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    color: '#ffffff',
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 26,
    maxWidth: 300,
  },
  buttonContainer: {
    marginBottom: 60,
  },
  button: {
    backgroundColor: '#FF0000',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#ffd700',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#333333',
    marginHorizontal: 6,
  },
  progressDotActive: {
    backgroundColor: '#ffd700',
  },
});

export default OnboardingScreen;
