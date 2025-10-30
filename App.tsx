import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar, View, Text, Image } from 'react-native';

// Screens
import OnboardingScreen from './src/screens/OnboardingScreen';
import HomeScreen from './src/screens/HomeScreen';
import BookmarksScreen from './src/screens/BookmarksScreen';
import InfoScreen from './src/screens/InfoScreen';
import AircraftDetailScreen from './src/screens/AircraftDetailScreen';
import LegendScreen from './src/screens/LegendScreen';
import AircraftComparisonScreen from './src/screens/AircraftComparisonScreen';
import AircraftQuizScreen from './src/screens/AircraftQuizScreen';
import AircraftStatsScreen from './src/screens/AircraftStatsScreen';

// Types
import { Aircraft } from './src/types/volcano';
import { RootStackParamList, TabParamList } from './src/types/navigation';

// Context
import { BookmarksProvider } from './src/context/BookmarksContext';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: '#000',
          borderTopWidth: 0,
          borderTopColor: 'transparent',
          elevation: 8,
          shadowOpacity: 0.3,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: -4 },
          height: 80,
          paddingBottom: 20,
          paddingTop: 10,
          borderWidth: 2,
          borderColor: '#FF0000',
          borderRadius: 20,
          marginHorizontal: 20,
          marginBottom: 10,
        },
        tabBarActiveTintColor: '#ff6b35',
        tabBarInactiveTintColor: '#ffffff',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="home" color={color} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Bookmarks"
        component={BookmarksScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="bookmark" color={color} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Info"
        component={InfoScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="info" color={color} focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function TabIcon({ name, color, focused }: { name: string; color: string; focused: boolean }) {
  const iconSize = 24;
  
  // Using proper icons from BottomIco
  const getIcon = () => {
    switch (name) {
      case 'home':
        return require('./src/assets/img/BottomIco/filled.png');
      case 'bookmark':
        return require('./src/assets/img/BottomIco/Vector-1.png');
      case 'info':
        return require('./src/assets/img/BottomIco/Vector.png');
      default:
        return require('./src/assets/img/BottomIco/filled.png');
    }
  };

  return (
    <View style={{
      backgroundColor: focused ? 'rgba(255, 0, 0, 0.2)' : 'transparent',
      borderRadius: 20,
      padding: 8,
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: focused ? '#FF0000' : 'transparent',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: focused ? 0.3 : 0,
      shadowRadius: 8,
      elevation: focused ? 8 : 0,
    }}>
      <Image 
        source={getIcon()} 
        style={{ 
          width: iconSize, 
          height: iconSize,
          tintColor: focused ? '#FF0000' : color 
        }} 
      />
    </View>
  );
}

function App() {
  return (
    <BookmarksProvider>
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor="#000000" />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Onboarding">
            {(props) => <OnboardingScreen {...props} onComplete={() => {}} />}
          </Stack.Screen>
          <Stack.Screen name="MainTabs" component={TabNavigator} />
          <Stack.Screen name="AircraftDetail" component={AircraftDetailScreen} />
          <Stack.Screen name="Legend" component={LegendScreen} />
          <Stack.Screen name="AircraftComparison" component={AircraftComparisonScreen} />
          <Stack.Screen name="AircraftQuiz" component={AircraftQuizScreen} />
          <Stack.Screen name="AircraftStats" component={AircraftStatsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </BookmarksProvider>
  );
}

export default App;
