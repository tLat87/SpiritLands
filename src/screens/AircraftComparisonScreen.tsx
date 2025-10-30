import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Image,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Aircraft } from '../types/volcano';
import { aircraft } from '../data/aircraft';

const AircraftComparisonScreen: React.FC = () => {
  const navigation = useNavigation();
  const [selectedAircraft, setSelectedAircraft] = useState<Aircraft[]>([]);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));

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
  }, []);

  const handleAircraftSelect = (aircraft: Aircraft) => {
    if (selectedAircraft.find(a => a.id === aircraft.id)) {
      setSelectedAircraft(selectedAircraft.filter(a => a.id !== aircraft.id));
    } else if (selectedAircraft.length < 3) {
      setSelectedAircraft([...selectedAircraft, aircraft]);
    } else {
      Alert.alert('Limit Reached', 'You can compare up to 3 aircraft at once.');
    }
  };

  const clearSelection = () => {
    setSelectedAircraft([]);
  };

  const renderAircraftSelector = (aircraft: Aircraft) => {
    const isSelected = selectedAircraft.find(a => a.id === aircraft.id);
    
    return (
      <TouchableOpacity
        key={aircraft.id}
        style={[
          styles.aircraftSelector,
          isSelected && styles.aircraftSelectorSelected
        ]}
        onPress={() => handleAircraftSelect(aircraft)}
      >
        <Image source={aircraft.image} style={styles.selectorImage} />
        <Text style={[styles.selectorName, isSelected && styles.selectorNameSelected]}>
          {aircraft.name}
        </Text>
        <Text style={[styles.selectorType, isSelected && styles.selectorTypeSelected]}>
          {aircraft.type.toUpperCase()}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderComparisonTable = () => {
    if (selectedAircraft.length < 2) return null;

    return (
      <Animated.View
        style={[
          styles.comparisonTable,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <Text style={styles.comparisonTitle}>Comparison</Text>
        
        <View style={styles.tableHeader}>
          <Text style={styles.headerCell}>Property</Text>
          {selectedAircraft.map(aircraft => (
            <Text key={aircraft.id} style={styles.headerCell}>{aircraft.name}</Text>
          ))}
        </View>

        <View style={styles.tableRow}>
          <Text style={styles.propertyCell}>Manufacturer</Text>
          {selectedAircraft.map(aircraft => (
            <Text key={aircraft.id} style={styles.valueCell}>{aircraft.manufacturer}</Text>
          ))}
        </View>

        <View style={styles.tableRow}>
          <Text style={styles.propertyCell}>Country</Text>
          {selectedAircraft.map(aircraft => (
            <Text key={aircraft.id} style={styles.valueCell}>{aircraft.country}</Text>
          ))}
        </View>

        <View style={styles.tableRow}>
          <Text style={styles.propertyCell}>Max Speed (km/h)</Text>
          {selectedAircraft.map(aircraft => (
            <Text key={aircraft.id} style={styles.valueCell}>{aircraft.maxSpeed.toLocaleString()}</Text>
          ))}
        </View>

        <View style={styles.tableRow}>
          <Text style={styles.propertyCell}>First Flight</Text>
          {selectedAircraft.map(aircraft => (
            <Text key={aircraft.id} style={styles.valueCell}>{aircraft.firstFlight || 'Unknown'}</Text>
          ))}
        </View>

        <View style={styles.tableRow}>
          <Text style={styles.propertyCell}>Type</Text>
          {selectedAircraft.map(aircraft => (
            <Text key={aircraft.id} style={styles.valueCell}>{aircraft.type}</Text>
          ))}
        </View>
      </Animated.View>
    );
  };

  const getWinner = (property: keyof Aircraft) => {
    if (selectedAircraft.length < 2) return null;
    
    let winner = selectedAircraft[0];
    let bestValue = selectedAircraft[0][property];
    
    for (let i = 1; i < selectedAircraft.length; i++) {
      const currentValue = selectedAircraft[i][property];
      if (property === 'maxSpeed' && typeof currentValue === 'number' && typeof bestValue === 'number') {
        if (currentValue > bestValue) {
          bestValue = currentValue;
          winner = selectedAircraft[i];
        }
      }
    }
    
    return winner;
  };

  const renderWinnerCard = () => {
    const speedWinner = getWinner('maxSpeed');
    if (!speedWinner) return null;

    return (
      <Animated.View
        style={[
          styles.winnerCard,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <Text style={styles.winnerTitle}>🏆 Speed Champion</Text>
        <Text style={styles.winnerName}>{speedWinner.name}</Text>
        <Text style={styles.winnerSpeed}>{speedWinner.maxSpeed.toLocaleString()} km/h</Text>
        <Text style={styles.winnerManufacturer}>{speedWinner.manufacturer}</Text>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundContainer}>
        <Image 
          source={require('../assets/img/b2c1e1e22ee146d97e9cfca236a375211af0ccbf.png')} 
          style={styles.backgroundImage}
          resizeMode="cover"
        />
        <View style={styles.overlay} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Animated.View
          style={[
            styles.header,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>‹ Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Aircraft Comparison</Text>
          <TouchableOpacity style={styles.clearButton} onPress={clearSelection}>
            <Text style={styles.clearButtonText}>Clear All</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          style={[
            styles.instructions,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.instructionsText}>
            Select up to 3 aircraft to compare their specifications
          </Text>
          <Text style={styles.selectedCount}>
            Selected: {selectedAircraft.length}/3
          </Text>
        </Animated.View>

        <View style={styles.aircraftGrid}>
          {aircraft.map(renderAircraftSelector)}
        </View>

        {renderWinnerCard()}
        {renderComparisonTable()}

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
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 60,
  },
  backButton: {
    backgroundColor: '#FF0000',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  clearButton: {
    backgroundColor: '#333333',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  clearButtonText: {
    color: '#ffffff',
    fontSize: 14,
  },
  instructions: {
    padding: 20,
    alignItems: 'center',
  },
  instructionsText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  selectedCount: {
    color: '#FF0000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  aircraftGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 15,
    justifyContent: 'space-between',
  },
  aircraftSelector: {
    width: '48%',
    backgroundColor: '#1a1a1a',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#333333',
    alignItems: 'center',
  },
  aircraftSelectorSelected: {
    borderColor: '#FF0000',
    backgroundColor: '#2a1a1a',
  },
  selectorImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#ff6b35',
    opacity: 0.7,
    marginBottom: 10,
  },
  selectorName: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  selectorNameSelected: {
    color: '#FF0000',
  },
  selectorType: {
    color: '#cccccc',
    fontSize: 12,
    textAlign: 'center',
  },
  selectorTypeSelected: {
    color: '#ff6b35',
    fontWeight: 'bold',
  },
  winnerCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 15,
    padding: 20,
    margin: 15,
    borderWidth: 2,
    borderColor: '#FF0000',
    alignItems: 'center',
  },
  winnerTitle: {
    color: '#ffd700',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  winnerName: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  winnerSpeed: {
    color: '#FF0000',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  winnerManufacturer: {
    color: '#cccccc',
    fontSize: 14,
  },
  comparisonTable: {
    backgroundColor: '#1a1a1a',
    borderRadius: 15,
    margin: 15,
    borderWidth: 2,
    borderColor: '#FF0000',
    overflow: 'hidden',
  },
  comparisonTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 15,
    backgroundColor: '#FF0000',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#333333',
    borderBottomWidth: 1,
    borderBottomColor: '#666666',
  },
  headerCell: {
    flex: 1,
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    padding: 12,
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: '#666666',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  propertyCell: {
    flex: 1,
    color: '#FF0000',
    fontSize: 14,
    fontWeight: 'bold',
    padding: 12,
    borderRightWidth: 1,
    borderRightColor: '#333333',
  },
  valueCell: {
    flex: 1,
    color: '#ffffff',
    fontSize: 14,
    padding: 12,
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: '#333333',
  },
});

export default AircraftComparisonScreen;
