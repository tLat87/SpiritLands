import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { volcanoes } from '../data/volcanoes';
import { Volcano } from '../types/volcano';
import VolcanoMap from '../components/VolcanoMap';
import { useBookmarks } from '../context/BookmarksContext';

type HomeScreenNavigationProp = {
  navigate: (screen: keyof RootStackParamList) => void;
};

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

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

  const handleReadMore = (volcano: Volcano) => {
    (navigation as any).navigate('VolcanoDetail', { volcano });
  };

  const handleLegend = (volcano: Volcano) => {
    (navigation as any).navigate('Legend', { volcano });
  };

  const renderVolcanoCard = (volcano: Volcano, index: number) => (
    <Animated.View
      key={volcano.id}
      style={[
        styles.volcanoCard,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <View style={styles.volcanoHeader}>
        <Text style={styles.volcanoName}>{volcano.name}</Text>
        <Text style={styles.volcanoCountry}>{volcano.country}</Text>
      </View>

      <Image source={volcano.image} style={styles.volcanoImage} />
      
      {/* <View style={styles.volcanoInfo}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Height:</Text>
          <Text style={styles.infoValue}>{volcano.height}m</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Type:</Text>
          <Text style={styles.infoValue}>{volcano.type}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Last Eruption:</Text>
          <Text style={styles.infoValue}>{volcano.lastEruption}</Text>
        </View>
      </View> */}
      
      <Text style={styles.volcanoDescription} numberOfLines={3}>
        {volcano.description}
      </Text>
      
      <View style={styles.cardActions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.legendButton]}
          onPress={() => handleLegend(volcano)}
        >
          <Text style={styles.buttonText}>Legend</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.actionButton, styles.readMoreButton]}
          onPress={() => handleReadMore(volcano)}
        >
          <Text style={styles.buttonText}>Read More</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.actionButton, styles.bookmarkButton]}
          onPress={() => toggleBookmark(volcano)}
        >
          <Image 
            source={require('../assets/img/Icons/Vector-2.png')} 
            style={[styles.bookmarkIcon, { tintColor: isBookmarked(volcano.id) ? '#FF0000' : '#ffffff' }]} 
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
            <Text style={styles.title}>SpiritLands</Text>
            <Text style={styles.subtitle}>Volcano Travel Guide</Text>
          </Animated.View>

          {/* Interactive Volcano Map */}
          <Animated.View
            style={[
              styles.mapCard,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <VolcanoMap onVolcanoPress={(volcano: Volcano) => handleReadMore(volcano)} />
          </Animated.View>

          {/* Volcano List Header */}
          <Animated.View
            style={[
              styles.listHeader,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Text style={styles.listTitle}>All Volcanoes</Text>
            <Text style={styles.listSubtitle}>{volcanoes.length} locations around the world</Text>
          </Animated.View>

          {/* Volcano Cards List */}
          {volcanoes.map((volcano, index) => renderVolcanoCard(volcano, index))}
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
  },
  mapCard: {
    marginBottom: 25,
  },
  listHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  volcanoImage: {
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
  volcanoCard: {
    backgroundColor: 'rgba(0, 0, 0)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 0, 0, 0.3)',
  },
  volcanoHeader: {
    marginBottom: 15,
  },
  volcanoName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  volcanoCountry: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.8,
  },
  volcanoInfo: {
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
  volcanoDescription: {
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
