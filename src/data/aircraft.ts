import { Aircraft } from '../types/volcano';

export const aircraft: Aircraft[] = [
  {
    id: '1',
    name: 'F-22 Raptor',
    manufacturer: 'Lockheed Martin',
    country: 'USA',
    coordinates: {
      latitude: 40.7128,
      longitude: -74.0060,
    },
    maxSpeed: 2410,
    description: 'The F-22 Raptor is a fifth-generation stealth fighter aircraft developed for the United States Air Force. It is considered one of the most advanced fighter jets in the world, featuring stealth technology, supercruise capability, and advanced avionics.',
    history: 'The F-22 Raptor represents the pinnacle of American aviation engineering, combining stealth, speed, and agility in a single airframe. Its development began in the 1980s as part of the Advanced Tactical Fighter program.',
    image: require('../assets/img/SpiriLands/Vesuvius.png'), // Will be replaced with aircraft image
    isBookmarked: false,
    facts: [
      'First flight was in 1997',
      'Can supercruise at Mach 1.82 without afterburners',
      'Features advanced stealth technology',
      'Only 195 were ever built due to high costs'
    ],
    firstFlight: '1997',
    type: 'fighter'
  },
  {
    id: '2',
    name: 'Boeing 747',
    manufacturer: 'Boeing',
    country: 'USA',
    coordinates: {
      latitude: 47.6062,
      longitude: -122.3321,
    },
    maxSpeed: 988,
    description: 'The Boeing 747, also known as the "Queen of the Skies", is a wide-body commercial airliner and cargo transport aircraft. It was the first wide-body airplane produced and remains one of the most recognizable aircraft in the world.',
    history: 'The 747 revolutionized air travel when it entered service in 1970, making long-distance travel accessible to millions of people. Its distinctive hump design became an icon of aviation.',
    image: require('../assets/img/SpiriLands/Etna.png'), // Will be replaced with aircraft image
    isBookmarked: false,
    facts: [
      'First wide-body commercial airliner',
      'Can carry up to 660 passengers',
      'The hump houses the cockpit and first-class seating',
      'Over 1,500 have been built since 1969'
    ],
    firstFlight: '1969',
    type: 'passenger'
  },
  {
    id: '3',
    name: 'Concorde',
    manufacturer: 'Aérospatiale/BAC',
    country: 'France/UK',
    coordinates: {
      latitude: 48.8566,
      longitude: 2.3522,
    },
    maxSpeed: 2179,
    description: 'The Concorde was a supersonic passenger airliner that operated from 1976 to 2003. It was capable of flying at twice the speed of sound, making it possible to cross the Atlantic in under 3.5 hours.',
    history: 'The Concorde was a symbol of technological achievement and luxury travel. Despite its success, only 20 aircraft were ever built, and it was retired in 2003 due to economic factors and the 2000 crash.',
    image: require('../assets/img/SpiriLands/Krakatau.png'), // Will be replaced with aircraft image
    isBookmarked: false,
    facts: [
      'Only supersonic commercial airliner to operate regularly',
      'Crossed the Atlantic in 3.5 hours',
      'Flew at 60,000 feet altitude',
      'Retired in 2003 after 27 years of service'
    ],
    firstFlight: '1969',
    type: 'passenger'
  },
  {
    id: '4',
    name: 'SR-71 Blackbird',
    manufacturer: 'Lockheed',
    country: 'USA',
    coordinates: {
      latitude: 34.0522,
      longitude: -118.2437,
    },
    maxSpeed: 3540,
    description: 'The SR-71 Blackbird is a long-range, high-altitude, Mach 3+ strategic reconnaissance aircraft. It was developed by Lockheed\'s Skunk Works division and operated by the United States Air Force from 1964 to 1998.',
    history: 'The Blackbird was designed to fly at extreme altitudes and speeds to avoid detection. It holds the record for the fastest air-breathing manned aircraft and was never shot down despite numerous attempts.',
    image: require('../assets/img/SpiriLands/Fujiyama.png'), // Will be replaced with aircraft image
    isBookmarked: false,
    facts: [
      'Fastest air-breathing manned aircraft ever built',
      'Could fly at 85,000 feet altitude',
      'Never shot down despite 4,000+ missions',
      'Fuselage expanded 6 inches due to heat at speed'
    ],
    firstFlight: '1964',
    type: 'military'
  },
  {
    id: '5',
    name: 'Airbus A380',
    manufacturer: 'Airbus',
    country: 'France',
    coordinates: {
      latitude: 43.6047,
      longitude: 1.4442,
    },
    maxSpeed: 1020,
    description: 'The Airbus A380 is a double-deck, wide-body, four-engine jet airliner. It is the world\'s largest passenger airliner and can carry up to 853 passengers in a single-class configuration.',
    history: 'The A380 was designed to challenge Boeing\'s dominance in the large aircraft market. Despite its impressive size and capacity, production ended in 2021 due to changing market demands.',
    image: require('../assets/img/SpiriLands/Cotopaxi.png'), // Will be replaced with aircraft image
    isBookmarked: false,
    facts: [
      'World\'s largest passenger airliner',
      'Can carry up to 853 passengers',
      'Wingspan of 79.8 meters',
      'Production ended in 2021 after 251 aircraft'
    ],
    firstFlight: '2005',
    type: 'passenger'
  },
  {
    id: '6',
    name: 'C-5 Galaxy',
    manufacturer: 'Lockheed Martin',
    country: 'USA',
    coordinates: {
      latitude: 33.7490,
      longitude: -84.3880,
    },
    maxSpeed: 920,
    description: 'The C-5 Galaxy is a large military transport aircraft designed and built by Lockheed. It provides the United States Air Force with a heavy intercontinental-range strategic airlift capability.',
    history: 'The C-5 Galaxy has been the backbone of American military airlift capability since the 1970s. It can carry oversized cargo and has been used in numerous military operations worldwide.',
    image: require('../assets/img/SpiriLands/Kilauea.png'), // Will be replaced with aircraft image
    isBookmarked: false,
    facts: [
      'One of the largest military aircraft in the world',
      'Can carry up to 270,000 pounds of cargo',
      'Has a cargo compartment 121 feet long',
      'Can carry two M1 Abrams tanks'
    ],
    firstFlight: '1968',
    type: 'cargo'
  },
  {
    id: '7',
    name: 'MiG-29',
    manufacturer: 'Mikoyan',
    country: 'Russia',
    coordinates: {
      latitude: 55.7558,
      longitude: 37.6176,
    },
    maxSpeed: 2450,
    description: 'The MiG-29 is a twin-engine jet fighter aircraft designed in the Soviet Union. It is a highly maneuverable aircraft designed for air superiority and ground attack missions.',
    history: 'The MiG-29 was developed to counter American fourth-generation fighters. It features excellent maneuverability and has been exported to many countries around the world.',
    image: require('../assets/img/SpiriLands/MaunaLoa.png'), // Will be replaced with aircraft image
    isBookmarked: false,
    facts: [
      'Known for exceptional maneuverability',
      'Can perform the "Cobra" maneuver',
      'Exported to over 30 countries',
      'First flight was in 1977'
    ],
    firstFlight: '1977',
    type: 'fighter'
  },
  {
    id: '8',
    name: 'Antonov An-225 Mriya',
    manufacturer: 'Antonov',
    country: 'Ukraine',
    coordinates: {
      latitude: 50.4501,
      longitude: 30.5234,
    },
    maxSpeed: 850,
    description: 'The Antonov An-225 Mriya is a strategic airlift cargo aircraft. It was originally developed to transport the Buran spaceplane and is the heaviest aircraft ever built.',
    history: 'The An-225 was designed in the 1980s to carry the Soviet space shuttle. Only one was ever completed, and it holds numerous world records for payload capacity.',
    image: require('../assets/img/SpiriLands/Eyjafjallajokull.png'), // Will be replaced with aircraft image
    isBookmarked: false,
    facts: [
      'Heaviest aircraft ever built',
      'Can carry up to 640,000 pounds',
      'Wingspan of 88.4 meters',
      'Only one was ever completed'
    ],
    firstFlight: '1988',
    type: 'cargo'
  },
  {
    id: '9',
    name: 'F-35 Lightning II',
    manufacturer: 'Lockheed Martin',
    country: 'USA',
    coordinates: {
      latitude: 32.7767,
      longitude: -96.7970,
    },
    maxSpeed: 1930,
    description: 'The F-35 Lightning II is a family of single-seat, single-engine, all-weather stealth multirole combat aircraft. It is designed to perform ground attack and air defense missions.',
    history: 'The F-35 is the most expensive weapons program in history, designed to replace multiple aircraft types across different branches of the military. It features advanced stealth and sensor fusion capabilities.',
    image: require('../assets/img/SpiriLands/Popocatepetl.png'), // Will be replaced with aircraft image
    isBookmarked: false,
    facts: [
      'Most expensive weapons program in history',
      'Three variants for different military branches',
      'Advanced sensor fusion technology',
      'Can carry weapons internally for stealth'
    ],
    firstFlight: '2006',
    type: 'fighter'
  }
];

export const dailyFacts = [
  'The Wright Brothers\' first flight lasted only 12 seconds.',
  'The Boeing 747 can carry more than 660 passengers.',
  'The Concorde could cross the Atlantic in under 3.5 hours.',
  'The SR-71 Blackbird could fly at 85,000 feet altitude.',
  'The Antonov An-225 is the heaviest aircraft ever built.',
  'The F-22 Raptor can supercruise without afterburners.',
  'The C-5 Galaxy can carry two M1 Abrams tanks.',
  'The MiG-29 can perform the famous "Cobra" maneuver.',
  'The Airbus A380 has a wingspan of 79.8 meters.',
  'The F-35 has three variants for different military branches.'
];

