# Spirit of Volcano Lands 🌋

A React Native mobile application that serves as your personal guide to the world's most fascinating volcanoes. Explore volcanic wonders, learn fascinating facts, discover ancient legends, and save your favorite discoveries.

## Features

- **Onboarding Experience**: Beautiful animated introduction with Sandra, your volcano guide
- **Interactive World Map**: View volcano locations with interactive markers on a world map using react-native-maps
- **Complete Volcano List**: Browse all 15 famous volcanoes with detailed information
- **Volcano Collection**: Explore 15 famous volcanoes from around the world
- **Legends & Myths**: Discover ancient stories and folklore about volcanoes
- **Bookmarks**: Save your favorite volcanoes for easy access
- **Beautiful Animations**: Smooth transitions and engaging user experience
- **Dark Theme**: Eye-friendly dark interface with volcanic color scheme
- **Levitating Navigation**: Modern bottom navigation with shadow effects
- **Background Images**: PNG backgrounds on all screens for consistent volcanic theme

## Screenshots

The app includes:
- **Onboarding**: 4-step introduction with Sandra
- **Home**: Interactive world map and complete volcano list
- **Volcano Detail**: Expanded information with coordinates and actions
- **Legend**: Ancient stories and myths about each volcano
- **Bookmarks**: Saved favorite volcanoes
- **Info**: App information and features

## Tech Stack

- **React Native 0.80.0**
- **TypeScript**
- **React Navigation** for navigation
- **React Native Reanimated** for animations
- **AsyncStorage** for data persistence
- **Redux Toolkit** for state management (ready for future use)

## Getting Started

### Prerequisites

- Node.js (>=18)
- React Native CLI
- Android Studio / Xcode
- iOS Simulator or Android Emulator

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd SpiritLands
```

2. Install dependencies:
```bash
npm install
```

3. Install iOS dependencies (iOS only):
```bash
cd ios && pod install && cd ..
```

4. Start the Metro bundler:
```bash
npm start
```

5. Run the app:

**iOS:**
```bash
npm run ios
```

**Android:**
```bash
npm run android
```

## Project Structure

```
src/
├── screens/           # App screens
│   ├── OnboardingScreen.tsx
│   ├── HomeScreen.tsx
│   ├── VolcanoDetailScreen.tsx
│   ├── LegendScreen.tsx
│   ├── BookmarksScreen.tsx
│   └── InfoScreen.tsx
├── types/             # TypeScript type definitions
│   └── volcano.ts
├── data/              # Static data
│   └── volcanoes.ts
└── components/        # Reusable components (future)
```

## Volcano Data

The app includes information about 15 famous volcanoes:
- **Vesuvius** (Italy) - Famous for the 79 AD eruption
- **Etna** (Italy) - Europe's highest active volcano
- **Krakatau** (Indonesia) - 1883 catastrophic eruption
- **Fujiyama** (Japan) - Sacred Japanese mountain
- **Cotopaxi** (Ecuador) - One of the highest active volcanoes
- **Kilauea** (Hawaii, USA) - One of the most active volcanoes
- **Mauna Loa** (Hawaii, USA) - Largest active volcano on Earth
- **Eyjafjallajökull** (Iceland) - 2010 eruption that paralyzed air traffic
- **Popocatepetl** (Mexico) - Sacred Aztec mountain
- **Santorini** (Greece) - Created the legend of Atlantis
- **Villarrica** (Chile) - Popular tourist destination
- **Aconcagua** (Argentina) - Highest mountain in South America
- **Stromboli** (Italy) - "Lighthouse of the Mediterranean"
- **Tamboro** (Indonesia) - Most powerful eruption in human history
- **Nyiragongo** (DR Congo) - Largest lava lake in the world

## Animations

The app features smooth animations including:
- **Fade In**: Elements appear with opacity transitions
- **Slide Up**: Content slides up from below
- **Scale**: Buttons scale in with bounce effects
- **Staggered**: Multiple elements animate in sequence

## Color Scheme

- **Primary**: #ff6b35 (Volcanic Orange)
- **Accent**: #ffd700 (Golden Yellow)
- **Background**: #000000 (Deep Black)
- **Surface**: #1a1a1a (Dark Gray)
- **Text**: #ffffff (White)

## Map Features

The interactive world map includes:
- **Real-time volcano locations** with precise coordinates
- **Interactive markers** for all 15 volcanoes
- **Search functionality** to find specific volcanoes
- **Map type switching** (Hybrid, Satellite, Standard)
- **Auto-centering** on selected volcanoes
- **Callout information** showing volcano details
- **Global view** with all volcano positions

## Future Enhancements

- GPS location features
- Push notifications for volcanic activity
- Social sharing capabilities
- Offline mode
- Multiple languages
- AR volcano viewing

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Inspired by the beauty and power of Earth's volcanoes
- Created with ❤️ for volcano enthusiasts and nature lovers
- Special thanks to Sandra, the virtual volcano guide

---

**Explore the fiery mountains and discover the power of nature! 🌋✨**
