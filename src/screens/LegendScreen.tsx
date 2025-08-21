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
import { Volcano } from '../types/volcano';

interface RouteParams {
  volcano: Volcano;
}

type LegendScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const LegendScreen: React.FC = () => {
  const navigation = useNavigation<LegendScreenNavigationProp>();
  const route = useRoute();
  const { volcano } = route.params as RouteParams;
  
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

  const handleShare = () => {
    // Share functionality would go here
    console.log('Sharing legend for:', volcano.name);
  };

  const handleBookmark = () => {
    // Bookmark functionality would go here
    console.log('Bookmarking legend for:', volcano.name);
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
        {/* <View style={styles.overlay} /> */}
      </View>
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Legend Card */}
        <Animated.View
          style={[
            styles.legendCard,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Header with back button */}
          <View style={styles.cardHeader}>
            {/* <TouchableOpacity style={styles.backButton} onPress={handleClose}>
              <Text style={styles.backButtonText}>‹</Text>
            </TouchableOpacity> */}
            <Text style={styles.legendTitle}>{volcano.name} ({volcano.country}) Legend</Text>
          </View>

          {/* Legend Icon */}
          <View style={styles.legendIconContainer}>
          <Image 
            source={require('../assets/img/LOGO1.png')} 
            style={styles.backgroundImage}
            // resizeMode="cover"
            />
          </View>

          {/* Legend Text */}
          <View style={styles.legendTextContainer}>
            <Text style={styles.legendText}>{volcano.legend}</Text>
          </View>

          {/* Action Buttons */}
          
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
    width: 200,
    height: 200,
    borderRadius: 10,
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
  legendCard: {
    backgroundColor: '#000',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#FF0000',
    overflow: 'hidden',
    width: '100%',
    maxWidth: 400,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  backButton: {
    marginRight: 15,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ff6b35',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  legendTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  legendIconContainer: {
    alignItems: 'center',
    padding: 30,
  },
  legendIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ff6b35',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#FF0000',
  },
  legendIconText: {
    fontSize: 40,
  },
  legendTextContainer: {
    padding: 20,
    paddingTop: 0,
  },
  legendText: {
    color: '#ffffff',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
    paddingTop: 10,
  },
  actionButton: {
    backgroundColor: '#ff6b35',
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffd700',
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
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
    borderWidth: 1,
    borderColor: '#ffd700',
  },
  closeButtonText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default LegendScreen;
