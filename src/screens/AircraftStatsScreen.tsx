import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { aircraft } from '../data/aircraft';

const { width } = Dimensions.get('window');

const AircraftStatsScreen: React.FC = () => {
  const navigation = useNavigation();
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

  const getStatsByType = () => {
    const stats: { [key: string]: number } = {};
    aircraft.forEach(aircraft => {
      stats[aircraft.type] = (stats[aircraft.type] || 0) + 1;
    });
    return stats;
  };

  const getStatsByCountry = () => {
    const stats: { [key: string]: number } = {};
    aircraft.forEach(aircraft => {
      stats[aircraft.country] = (stats[aircraft.country] || 0) + 1;
    });
    return stats;
  };

  const getTopSpeedAircraft = () => {
    return aircraft.sort((a, b) => b.maxSpeed - a.maxSpeed).slice(0, 3);
  };

  const getOldestAircraft = () => {
    return aircraft
      .filter(a => a.firstFlight)
      .sort((a, b) => parseInt(a.firstFlight || '0') - parseInt(b.firstFlight || '0'))
      .slice(0, 3);
  };

  const getNewestAircraft = () => {
    return aircraft
      .filter(a => a.firstFlight)
      .sort((a, b) => parseInt(b.firstFlight || '0') - parseInt(a.firstFlight || '0'))
      .slice(0, 3);
  };

  const getAverageSpeed = () => {
    const totalSpeed = aircraft.reduce((sum, a) => sum + a.maxSpeed, 0);
    return Math.round(totalSpeed / aircraft.length);
  };

  const renderStatCard = (title: string, value: string | number, icon: string, color: string = '#FF0000') => (
    <Animated.View
      key={title}
      style={[
        styles.statCard,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <Text style={styles.statIcon}>{icon}</Text>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
    </Animated.View>
  );

  const renderChartBar = (label: string, value: number, maxValue: number, color: string = '#FF0000') => (
    <View key={label} style={styles.chartItem}>
      <Text style={styles.chartLabel}>{label}</Text>
      <View style={styles.chartBarContainer}>
        <View
          style={[
            styles.chartBar,
            {
              width: `${(value / maxValue) * 100}%`,
              backgroundColor: color,
            },
          ]}
        />
        <Text style={styles.chartValue}>{value}</Text>
      </View>
    </View>
  );

  const renderTopList = (title: string, items: any[], getLabel: (item: any) => string, getValue: (item: any) => string, icon: string) => (
    <Animated.View
      style={[
        styles.topListContainer,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <Text style={styles.topListTitle}>{icon} {title}</Text>
      {items.map((item, index) => (
        <View key={index} style={styles.topListItem}>
          <Text style={styles.topListRank}>#{index + 1}</Text>
          <View style={styles.topListContent}>
            <Text style={styles.topListLabel}>{getLabel(item)}</Text>
            <Text style={styles.topListValue}>{getValue(item)}</Text>
          </View>
        </View>
      ))}
    </Animated.View>
  );

  const typeStats = getStatsByType();
  const countryStats = getStatsByCountry();
  const maxTypeCount = Math.max(...Object.values(typeStats));
  const maxCountryCount = Math.max(...Object.values(countryStats));

  return (
    <View style={styles.container}>
      <View style={styles.backgroundContainer}>
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
          <Text style={styles.headerTitle}>Aircraft Statistics</Text>
        </Animated.View>

        {/* Overview Stats */}
        <Animated.View
          style={[
            styles.statsGrid,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {renderStatCard('Total Aircraft', aircraft.length, '✈️')}
          {renderStatCard('Average Speed', `${getAverageSpeed().toLocaleString()} km/h`, '⚡')}
          {renderStatCard('Countries', Object.keys(countryStats).length, '🌍')}
          {renderStatCard('Types', Object.keys(typeStats).length, '🏷️')}
        </Animated.View>

        {/* Aircraft Types Chart */}
        <Animated.View
          style={[
            styles.chartContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.chartTitle}>📊 Aircraft Types</Text>
          {Object.entries(typeStats).map(([type, count]) => 
            renderChartBar(type.charAt(0).toUpperCase() + type.slice(1), count, maxTypeCount, '#FF0000')
          )}
        </Animated.View>

        {/* Countries Chart */}
        <Animated.View
          style={[
            styles.chartContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.chartTitle}>🌍 Countries</Text>
          {Object.entries(countryStats).map(([country, count]) => 
            renderChartBar(country, count, maxCountryCount, '#ff6b35')
          )}
        </Animated.View>

        {/* Top Speed Aircraft */}
        {renderTopList(
          'Fastest Aircraft',
          getTopSpeedAircraft(),
          (item) => item.name,
          (item) => `${item.maxSpeed.toLocaleString()} km/h`,
          '🚀'
        )}

        {/* Oldest Aircraft */}
        {renderTopList(
          'Oldest Aircraft',
          getOldestAircraft(),
          (item) => item.name,
          (item) => item.firstFlight || 'Unknown',
          '🏛️'
        )}

        {/* Newest Aircraft */}
        {renderTopList(
          'Newest Aircraft',
          getNewestAircraft(),
          (item) => item.name,
          (item) => item.firstFlight || 'Unknown',
          '🆕'
        )}

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
    marginRight: 80,
  },
  scrollView: {
    flex: 1,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 15,
    justifyContent: 'space-between',
  },
  statCard: {
    width: (width - 45) / 2,
    backgroundColor: '#1a1a1a',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#FF0000',
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 32,
    marginBottom: 10,
  },
  statValue: {
    color: '#FF0000',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  chartContainer: {
    backgroundColor: '#1a1a1a',
    borderRadius: 15,
    padding: 20,
    margin: 15,
    borderWidth: 2,
    borderColor: '#FF0000',
  },
  chartTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  chartItem: {
    marginBottom: 15,
  },
  chartLabel: {
    color: '#ffffff',
    fontSize: 14,
    marginBottom: 5,
  },
  chartBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chartBar: {
    height: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  chartValue: {
    color: '#FF0000',
    fontSize: 14,
    fontWeight: 'bold',
    minWidth: 30,
  },
  topListContainer: {
    backgroundColor: '#1a1a1a',
    borderRadius: 15,
    padding: 20,
    margin: 15,
    borderWidth: 2,
    borderColor: '#FF0000',
  },
  topListTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  topListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  topListRank: {
    color: '#FF0000',
    fontSize: 18,
    fontWeight: 'bold',
    width: 40,
    textAlign: 'center',
  },
  topListContent: {
    flex: 1,
    marginLeft: 15,
  },
  topListLabel: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  topListValue: {
    color: '#ff6b35',
    fontSize: 14,
  },
});

export default AircraftStatsScreen;
