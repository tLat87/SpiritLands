import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Image,
} from 'react-native';
import Share from 'react-native-share';

const InfoScreen: React.FC = () => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));
  const [buttonAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    // Animate in
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
      Animated.timing(buttonAnim, {
        toValue: 1,
        duration: 1000,
        delay: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleShare = async () => {
    try {
      const shareOptions = {
        title: 'SpiritLands - Volcano Travel Guide',
        message: 'Check out this amazing volcano travel app! Explore the world\'s most fascinating volcanoes with interactive maps, legends, and facts.',
        url: 'https://spiritlands.com', // Replace with your app URL
      };
      await Share.open(shareOptions);
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleRate = () => {
    // Rate app functionality would go here
    console.log('Rating app...');
  };

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <View style={styles.backgroundContainer}>
        <Image 
          source={require('../assets/img/b2c1e1e22ee146d97e9cfca236a375211af0ccbf.png')} 
          style={styles.backgroundImage}
          resizeMode="cover"
        />
        {/* <View style={styles.overlay} /> */}
      </View>
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View
          style={[
            styles.header,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.headerTitle}>INFO</Text>
        </Animated.View>

        {/* App Logo */}
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Image 
            source={require('../assets/img/LOGO1.png')} 
            style={{width: 200,
                height: 200,
                borderRadius: 10,}}
            // resizeMode="cover"
            />
        </Animated.View>

        {/* Description */}
        <Animated.View
          style={[
            styles.descriptionContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.description}>
            Spirit of Volcano Lands is your personal guide to the world of volcanoes. 
            The app features top volcanoes from around the world, interesting facts, 
            legends, and the ability to save your favorite discoveries. Immerse yourself 
            in the world of fiery mountains with Sandra and discover the power and beauty of nature.
          </Text>
        </Animated.View>

        {/* Action Buttons */}
        <Animated.View
          style={[
            styles.buttonContainer,
            {
              opacity: buttonAnim,
              transform: [{ scale: buttonAnim }],
            },
          ]}
        >
          <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
          <Image source={require('../assets/img/Icons/Vector-1.png')} style={styles.actionButtonImage} />
            
          </TouchableOpacity>
          
          {/* <TouchableOpacity style={styles.actionButton} onPress={handleRate}>
            <Text style={styles.actionButtonText}>Rate App</Text>
          </TouchableOpacity> */}
        </Animated.View>

      
        {/* App Features */}
        <Animated.View
          style={[
            styles.featuresContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.featuresTitle}>App Features</Text>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🌋</Text>
            <Text style={styles.featureText}>Explore famous volcanoes worldwide</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>📚</Text>
            <Text style={styles.featureText}>Learn fascinating facts and legends</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🔖</Text>
            <Text style={styles.featureText}>Save your favorite discoveries</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🗺️</Text>
            <Text style={styles.featureText}>Interactive maps and locations</Text>
          </View>
        </Animated.View>
        <View style={{marginBottom: 100}}/>
      </ScrollView>
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
    // opacity: 0.8,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  header: {
    marginBottom: 30,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  logoContainer: {
    marginBottom: 30,
  },
  appLogo: {
    backgroundColor: '#ff6b35',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#ff6b35',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  logoText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logoTextLarge: {
    color: '#ffd700',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
  },
  descriptionContainer: {
    marginBottom: 30,
    maxWidth: 350,
  },
  description: {
    color: '#ffffff',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    maxWidth: 300,
    marginBottom: 40,
  },
  actionButton: {
    backgroundColor: '#FF0000',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 25,
    // borderWidth: 2,
    borderColor: '#ffd700',
    minWidth: 120,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionButtonImage: {
    width: 24,
    height: 24,
    tintColor: '#ffffff',
  },
  characterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
    maxWidth: 350,
  },
  characterImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ff6b35',
    borderWidth: 3,
    borderColor: '#ffd700',
    marginRight: 20,
  },
  characterInfo: {
    flex: 1,
  },
  characterName: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  characterRole: {
    color: '#ffd700',
    fontSize: 14,
    marginBottom: 10,
  },
  characterDescription: {
    color: '#cccccc',
    fontSize: 14,
    lineHeight: 20,
  },
  featuresContainer: {
    alignItems: 'center',
    maxWidth: 350,
  },
  featuresTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    width: '100%',
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 15,
    width: 30,
    textAlign: 'center',
  },
  featureText: {
    color: '#ffffff',
    fontSize: 16,
    flex: 1,
  },
});

export default InfoScreen;
