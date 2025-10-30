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
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { Aircraft } from '../types/volcano';
import { useBookmarks } from '../context/BookmarksContext';
import Share from 'react-native-share';

interface RouteParams {
  aircraft: Aircraft;
}

type AircraftDetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Legend'>;

const AircraftDetailScreen: React.FC = () => {
  const navigation = useNavigation<AircraftDetailScreenNavigationProp>();
  const route = useRoute();
  const { aircraft } = route.params as RouteParams;
  const { isBookmarked: isAircraftBookmarked, toggleBookmark } = useBookmarks();
  
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

  const handleBookmark = () => {
    toggleBookmark(aircraft);
  };

  const handleShare = async () => {
    try {
      const shareOptions = {
        title: `Aircraft: ${aircraft.name}`,
        message: `Check out this amazing aircraft: ${aircraft.name} by ${aircraft.manufacturer}! ${aircraft.description}`,
      };
      await Share.open(shareOptions);
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleLegend = () => {
    navigation.navigate('Legend', { aircraft });
  };

  const handleClose = () => {
    navigation.goBack();
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
        <View style={styles.overlay} />
      </View>
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Aircraft Detail Card */}
        <Animated.View
          style={[
            styles.aircraftCard,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Aircraft Image */}
          <View style={styles.aircraftImageContainer}>
            <Image source={aircraft.image} style={styles.aircraftImage} />
          </View>

          {/* Aircraft Info */}
          <View style={styles.aircraftInfo}>
            <Text style={styles.aircraftTitle}>{aircraft.name}</Text>
            <Text style={styles.aircraftManufacturer}>{aircraft.manufacturer} ({aircraft.country})</Text>
            
            {/* Coordinates */}
            <Text style={styles.coordinates}>
              {aircraft.coordinates.latitude.toFixed(3)}° N, {aircraft.coordinates.longitude.toFixed(3)}° E
            </Text>
            
            {/* Description */}
            <Text style={styles.description}>{aircraft.description}</Text>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.actionButton} onPress={handleLegend}>
                <Image source={require('../assets/img/Icons/Vector.png')} style={styles.actionButtonImage} />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
              <Image source={require('../assets/img/Icons/Vector-1.png')} style={styles.actionButtonImage} />
                
              </TouchableOpacity>
              
              <TouchableOpacity 
                  style={[styles.actionButton, isAircraftBookmarked(aircraft.id) && styles.bookmarkedButton]} 
                  onPress={handleBookmark}
                >
                  <Image source={require('../assets/img/Icons/Vector-2.png')} style={styles.actionButtonImage} />
                </TouchableOpacity>
            </View>
          </View>
        </Animated.View>

        {/* Close Button */}
        <Animated.View
          style={[
            styles.closeButtonContainer,
            {
              opacity: buttonAnim,
              transform: [{ scale: buttonAnim }],
            },
          ]}
        >
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </Animated.View>
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
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    opacity: 0.8,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  aircraftCard: {
    backgroundColor: '#000',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#FF0000',
    overflow: 'hidden',
    width: '100%',
    maxWidth: 400,
  },
  aircraftImageContainer: {
    height: 250,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  aircraftImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ff6b35',
    opacity: 0.7,
  },
  aircraftInfo: {
    padding: 20,
  },
  aircraftTitle: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  aircraftManufacturer: {
    color: '#FF0000',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  coordinates: {
    color: '#FF0000',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'monospace',
  },
  description: {
    color: '#ffffff',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 25,
    textAlign: 'justify',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  actionButton: {
    backgroundColor: '#FF0000',
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FF0000',
  },
  bookmarkedButton: {
    backgroundColor: '#FF0000',
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  actionButtonImage: {
    width: 24,
    height: 24,
    tintColor: '#ffffff',
  },
  closeButtonContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: '#FF0000',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FF0000',
  },
  closeButtonText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default AircraftDetailScreen;

