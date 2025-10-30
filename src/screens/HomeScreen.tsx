import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { aircraft } from '../data/aircraft';
import { Aircraft } from '../types/volcano';
import { useBookmarks } from '../context/BookmarksContext';

type HomeScreenNavigationProp = {
  navigate: (screen: keyof RootStackParamList) => void;
};

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  
  const [searchText, setSearchText] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'speed' | 'year'>('name');

  useEffect(() => {
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
  }, [fadeAnim, slideAnim]);

  const handleReadMore = (aircraft: Aircraft) => {
    (navigation as any).navigate('AircraftDetail', { aircraft });
  };

  const handleLegend = (aircraft: Aircraft) => {
    (navigation as any).navigate('Legend', { aircraft });
  };

  // Filter and sort aircraft
  const getFilteredAircraft = () => {
    let filtered = aircraft.filter(aircraft => {
      const matchesSearch = aircraft.name.toLowerCase().includes(searchText.toLowerCase()) ||
                           aircraft.manufacturer.toLowerCase().includes(searchText.toLowerCase()) ||
                           aircraft.country.toLowerCase().includes(searchText.toLowerCase());
      
      const matchesType = selectedType === 'all' || aircraft.type === selectedType;
      const matchesCountry = selectedCountry === 'all' || aircraft.country === selectedCountry;
      
      return matchesSearch && matchesType && matchesCountry;
    });

    // Sort aircraft
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'speed':
          return b.maxSpeed - a.maxSpeed;
        case 'year':
          return parseInt(b.firstFlight || '0') - parseInt(a.firstFlight || '0');
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  };

  const getUniqueCountries = () => {
    const countries = [...new Set(aircraft.map(a => a.country))];
    return countries.sort();
  };

  const renderAircraftCard = (aircraft: Aircraft, index: number) => (
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
      <View style={styles.aircraftHeader}>
        <Text style={styles.aircraftName}>{aircraft.name}</Text>
        <Text style={styles.aircraftManufacturer}>{aircraft.manufacturer}</Text>
      </View>

      <Image source={aircraft.image} style={styles.aircraftImage} />
      
      <Text style={styles.aircraftDescription} numberOfLines={3}>
        {aircraft.description}
      </Text>
      
      <View style={styles.cardActions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.legendButton]}
          onPress={() => handleLegend(aircraft)}
        >
          <Text style={styles.buttonText}>History</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.actionButton, styles.readMoreButton]}
          onPress={() => handleReadMore(aircraft)}
        >
          <Text style={styles.buttonText}>Read More</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.actionButton, styles.bookmarkButton]}
          onPress={() => toggleBookmark(aircraft)}
        >
          <Image 
            source={require('../assets/img/Icons/Vector-2.png')} 
            style={[styles.bookmarkIcon, { tintColor: isBookmarked(aircraft.id) ? '#FF0000' : '#ffffff' }]} 
          />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  return (
    <View style={styles.backgroundContainer}>
      <Image
          source={require('../assets/img/b2c1e1e22ee146d97e9cfca236a375211af0ccbf.png')} 
          style={styles.backgroundImage}
      />
      <View style={styles.overlay}>
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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
            <Text style={styles.title}>AeroSpirit</Text>
            <Text style={styles.subtitle}>Aircraft Collection Guide</Text>
            
            <View style={styles.headerButtons}>
              <TouchableOpacity
                style={styles.compareButton}
                onPress={() => (navigation as any).navigate('AircraftComparison')}
              >
                <Text style={styles.compareButtonText}>⚖️ Compare</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.quizButton}
                onPress={() => (navigation as any).navigate('AircraftQuiz')}
              >
                <Text style={styles.quizButtonText}>🧠 Quiz</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.statsButton}
                onPress={() => (navigation as any).navigate('AircraftStats')}
              >
                <Text style={styles.statsButtonText}>📊 Stats</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>

          {/* Search and Filters */}
          <Animated.View
            style={[
              styles.filtersContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <TextInput
              style={styles.searchInput}
              placeholder="Search aircraft..."
              placeholderTextColor="#666666"
              value={searchText}
              onChangeText={setSearchText}
            />
            
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersRow}>
              <TouchableOpacity
                style={[styles.filterButton, selectedType === 'all' && styles.filterButtonActive]}
                onPress={() => setSelectedType('all')}
              >
                <Text style={[styles.filterButtonText, selectedType === 'all' && styles.filterButtonTextActive]}>All Types</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.filterButton, selectedType === 'fighter' && styles.filterButtonActive]}
                onPress={() => setSelectedType('fighter')}
              >
                <Text style={[styles.filterButtonText, selectedType === 'fighter' && styles.filterButtonTextActive]}>Fighters</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.filterButton, selectedType === 'passenger' && styles.filterButtonActive]}
                onPress={() => setSelectedType('passenger')}
              >
                <Text style={[styles.filterButtonText, selectedType === 'passenger' && styles.filterButtonTextActive]}>Passenger</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.filterButton, selectedType === 'cargo' && styles.filterButtonActive]}
                onPress={() => setSelectedType('cargo')}
              >
                <Text style={[styles.filterButtonText, selectedType === 'cargo' && styles.filterButtonTextActive]}>Cargo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.filterButton, selectedType === 'military' && styles.filterButtonActive]}
                onPress={() => setSelectedType('military')}
              >
                <Text style={[styles.filterButtonText, selectedType === 'military' && styles.filterButtonTextActive]}>Military</Text>
              </TouchableOpacity>
            </ScrollView>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersRow}>
              <TouchableOpacity
                style={[styles.filterButton, selectedCountry === 'all' && styles.filterButtonActive]}
                onPress={() => setSelectedCountry('all')}
              >
                <Text style={[styles.filterButtonText, selectedCountry === 'all' && styles.filterButtonTextActive]}>All Countries</Text>
              </TouchableOpacity>
              {getUniqueCountries().map(country => (
                <TouchableOpacity
                  key={country}
                  style={[styles.filterButton, selectedCountry === country && styles.filterButtonActive]}
                  onPress={() => setSelectedCountry(country)}
                >
                  <Text style={[styles.filterButtonText, selectedCountry === country && styles.filterButtonTextActive]}>{country}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersRow}>
              <TouchableOpacity
                style={[styles.filterButton, sortBy === 'name' && styles.filterButtonActive]}
                onPress={() => setSortBy('name')}
              >
                <Text style={[styles.filterButtonText, sortBy === 'name' && styles.filterButtonTextActive]}>Sort by Name</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.filterButton, sortBy === 'speed' && styles.filterButtonActive]}
                onPress={() => setSortBy('speed')}
              >
                <Text style={[styles.filterButtonText, sortBy === 'speed' && styles.filterButtonTextActive]}>Sort by Speed</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.filterButton, sortBy === 'year' && styles.filterButtonActive]}
                onPress={() => setSortBy('year')}
              >
                <Text style={[styles.filterButtonText, sortBy === 'year' && styles.filterButtonTextActive]}>Sort by Year</Text>
              </TouchableOpacity>
            </ScrollView>
          </Animated.View>

          {/* Aircraft List Header */}
          <Animated.View
            style={[
              styles.listHeader,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Text style={styles.listTitle}>Aircraft Collection</Text>
            <Text style={styles.listSubtitle}>{getFilteredAircraft().length} aircraft found</Text>
          </Animated.View>

          {/* Aircraft Cards List */}
          {getFilteredAircraft().map((aircraft, index) => renderAircraftCard(aircraft, index))}
          <View style={{marginBottom: 100}}/>
            <View style={{marginBottom: 100}}/>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 100,
    padding: 15,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF0000',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.8,
    marginBottom: 15,
  },
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    flexWrap: 'wrap',
  },
  compareButton: {
    backgroundColor: '#FF0000',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#ffd700',
    flex: 1,
    maxWidth: 120,
  },
  compareButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  quizButton: {
    backgroundColor: '#ff6b35',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#ffd700',
    flex: 1,
    maxWidth: 120,
  },
  quizButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  statsButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#ffd700',
    flex: 1,
    maxWidth: 120,
  },
  statsButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  filtersContainer: {
    marginBottom: 25,
    paddingHorizontal: 15,
  },
  searchInput: {
    backgroundColor: '#1a1a1a',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 16,
    color: '#ffffff',
    borderWidth: 2,
    borderColor: '#FF0000',
    marginBottom: 15,
  },
  filtersRow: {
    marginBottom: 10,
  },
  filterButton: {
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#333333',
  },
  filterButtonActive: {
    backgroundColor: '#FF0000',
    borderColor: '#FF0000',
  },
  filterButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  filterButtonTextActive: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  listHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  aircraftImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 15,
    marginBottom: 15,
  },
  listTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF0000',
    marginBottom: 5,
  },
  listSubtitle: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.8,
    textAlign: 'center',
  },
  aircraftCard: {
    backgroundColor: 'rgba(0, 0, 0)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 0, 0, 0.3)',
  },
  aircraftHeader: {
    marginBottom: 15,
  },
  aircraftName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  aircraftManufacturer: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.8,
  },
  aircraftInfo: {
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.7,
  },
  infoValue: {
    fontSize: 14,
    color: '#ff6b35',
    fontWeight: 'bold',
  },
  aircraftDescription: {
    fontSize: 14,
    color: '#ffffff',
    lineHeight: 20,
    marginBottom: 20,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  legendButton: {
    backgroundColor: '#FF0000',
    borderWidth: 1,
    borderColor: '#FF0000',
  },
  readMoreButton: {
    backgroundColor: '#FF0000',
    borderWidth: 1,
    borderColor: '#ff6b35',
  },
  bookmarkButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#FF0000',
  },
  bookmarkIcon: {
    width: 20,
    height: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
