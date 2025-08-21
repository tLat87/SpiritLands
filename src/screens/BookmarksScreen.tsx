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
import { volcanoes } from '../data/volcanoes';
import { Volcano } from '../types/volcano';
import { useBookmarks } from '../context/BookmarksContext';

type BookmarksScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'VolcanoDetail' | 'MainTabs'>;

const BookmarksScreen: React.FC = () => {
  const navigation = useNavigation<BookmarksScreenNavigationProp>();
  const { bookmarkedVolcanoes, removeBookmark } = useBookmarks();
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

  const handleVolcanoPress = (volcano: Volcano) => {
    navigation.navigate('VolcanoDetail', { volcano });
  };

  const handleRemoveBookmark = (volcanoId: string) => {
    removeBookmark(volcanoId);
  };

  const renderBookmarkedVolcano = (volcano: Volcano) => (
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
      <TouchableOpacity
        style={styles.volcanoContent}
        onPress={() => handleVolcanoPress(volcano)}
      >
        <View style={styles.volcanoImageContainer}>
          <Image source={volcano.image} style={styles.volcanoImage} />
        </View>
        <View style={styles.volcanoInfo}>
          <Text style={styles.volcanoTitle}>{volcano.name}</Text>
          <Text style={styles.volcanoLocation}>{volcano.country}</Text>
          <Text style={styles.volcanoDescription} numberOfLines={2}>
            {volcano.description}
          </Text>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => handleRemoveBookmark(volcano.id)}
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
        Start exploring volcanoes and save your favorites to see them here!
      </Text>
      <TouchableOpacity
        style={styles.exploreButton}
        onPress={() => (navigation as any).navigate('MainTabs')}
      >
        <Text style={styles.exploreButtonText}>Explore Volcanoes</Text>
      </TouchableOpacity>
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
        <Text style={styles.headerSubtitle}>Your favorite volcanoes</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {bookmarkedVolcanoes.length > 0 ? (
          bookmarkedVolcanoes.map(renderBookmarkedVolcano)
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
  volcanoCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#FF0000',
    marginBottom: 20,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  volcanoContent: {
    flex: 1,
    flexDirection: 'row',
  },
  volcanoImageContainer: {
    width: 120,
    height: 120,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  volcanoImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ff6b35',
    opacity: 0.7,
  },
  volcanoInfo: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
  },
  volcanoTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  volcanoLocation: {
    color: '#FF0000',
    fontSize: 14,
    marginBottom: 8,
  },
  volcanoDescription: {
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
