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
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { aircraft } from '../data/aircraft';
import { Aircraft } from '../types/volcano';
import { useBookmarks } from '../context/BookmarksContext';

type BookmarksScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AircraftDetail' | 'MainTabs'>;

const BookmarksScreen: React.FC = () => {
  const navigation = useNavigation<BookmarksScreenNavigationProp>();
  const { bookmarkedAircraft, removeBookmark } = useBookmarks();
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));

  useEffect(() => {
    // Animate in
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleAircraftPress = (aircraft: Aircraft) => {
    navigation.navigate('AircraftDetail', { aircraft });
  };

  const handleRemoveBookmark = (aircraftId: string) => {
    removeBookmark(aircraftId);
  };

  const renderBookmarkedAircraft = (aircraft: Aircraft) => (
    <Animated.View
      key={aircraft.id}
      style={[
        styles.aircraftCard,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <TouchableOpacity
        style={styles.aircraftContent}
        onPress={() => handleAircraftPress(aircraft)}
      >
        <View style={styles.aircraftImageContainer}>
          <Image source={aircraft.image} style={styles.aircraftImage} />
        </View>
        <View style={styles.aircraftInfo}>
          <Text style={styles.aircraftTitle}>{aircraft.name}</Text>
          <Text style={styles.aircraftManufacturer}>{aircraft.manufacturer}</Text>
          <Text style={styles.aircraftDescription} numberOfLines={2}>
            {aircraft.description}
          </Text>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => handleRemoveBookmark(aircraft.id)}
      >
        <Text style={styles.removeButtonText}>✕</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderEmptyState = () => (
    <Animated.View
      style={[
        styles.emptyState,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <View style={styles.emptyIcon}>
       <Image source={require('../assets/img/Icons/Vector-2.png')} style={styles.emptyIconImage} />
      </View>
      <Text style={styles.emptyTitle}>No bookmarks yet</Text>
      <Text style={styles.emptyDescription}>
        Start exploring aircraft and save your favorites to see them here!
      </Text>
      
    </Animated.View>
  );

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
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bookmarks</Text>
        <Text style={styles.headerSubtitle}>Your favorite aircraft</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {bookmarkedAircraft.length > 0 ? (
          bookmarkedAircraft.map(renderBookmarkedAircraft)
        ) : (
          renderEmptyState()
        )}
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
    // backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  headerSubtitle: {
    color: '#cccccc',
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 0,
  },
  aircraftCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#FF0000',
    marginBottom: 20,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  aircraftContent: {
    flex: 1,
    flexDirection: 'row',
  },
  aircraftImageContainer: {
    width: 120,
    height: 120,
    backgroundColor: '#333333',
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
    flex: 1,
    padding: 15,
    justifyContent: 'center',
  },
  aircraftTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  aircraftManufacturer: {
    color: '#FF0000',
    fontSize: 14,
    marginBottom: 8,
  },
  aircraftDescription: {
    color: '#cccccc',
    fontSize: 14,
    lineHeight: 18,
  },
  removeButton: {
    width: 40,
    height: 40,
    backgroundColor: '#ff4444',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    margin: 10,
  },
  removeButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
  },
  emptyIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FF0000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyIconImage: {
    width: 50,
    height: 50,
    tintColor: '#ffffff',
  },
  emptyIconText: {
    fontSize: 40,
  },
  emptyTitle: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptyDescription: {
    color: '#cccccc',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
    maxWidth: 300,
  },
  exploreButton: {
    backgroundColor: '#FF0000',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    // borderWidth: 2,
    borderColor: '#ffd700',
  },
  exploreButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BookmarksScreen;
