import { Volcano } from '../types/volcano';

export const volcanoes: Volcano[] = [
  {
    id: '1',
    name: 'Vesuvius',
    country: 'Italy',
    location: 'Near Naples',
    coordinates: {
      latitude: 40.822,
      longitude: 14.428,
    },
    height: 1281,
    description: 'Vesuvius is one of the most famous volcanoes in the world, located near Naples. Its height reaches about 1281 m. It is the only active volcano on the European continent that has erupted in modern times. The most infamous eruption occurred in 79 AD, when Pompeii and Herculaneum were destroyed. Vesuvius is still closely monitored by scientists.',
    legend: 'In ancient Roman legends, Vesuvius personified the wrath of the god Vulcan, who punished people for their sins by covering cities with ash.',
    image: require('../assets/img/SpiriLands/Vesuvius.png'),
    isBookmarked: false,
    facts: [
      'Vesuvius has erupted more than 50 times since 79 AD',
      'The 79 AD eruption buried Pompeii under 4-6 meters of ash',
      'It is considered one of the most dangerous volcanoes in the world',
      'The volcano is monitored 24/7 by the Vesuvius Observatory'
    ],
    lastEruption: '1944',
    type: 'active'
  },
  {
    id: '2',
    name: 'Etna',
    country: 'Italy',
    location: 'Sicily',
    coordinates: {
      latitude: 37.751,
      longitude: 14.993,
    },
    height: 3300,
    description: 'Etna is the highest active volcano in Europe (over 3300 m). Its slopes are covered with lava flows and fertile soils, which makes the area ideal for vineyards. Eruptions here occur regularly, but usually without catastrophic consequences. It is a symbol of Sicily and the power of nature.',
    legend: 'According to mythology, the giant Typhon was imprisoned under Etna, and the fire and smoke are his anger erupting from the depths.',
    image: require('../assets/img/SpiriLands/Etna.png'),
    isBookmarked: false,
    facts: [
      'Etna has been erupting for over 500,000 years',
      'It is the highest active volcano in Europe',
      'The volcano has over 200 craters',
      'Etna is a UNESCO World Heritage Site'
    ],
    lastEruption: '2023',
    type: 'active'
  },
  {
    id: '3',
    name: 'Krakatau',
    country: 'Indonesia',
    location: 'Sunda Strait',
    coordinates: {
      latitude: -6.102,
      longitude: 105.423,
    },
    height: 813,
    description: 'The Krakatau volcano is known for its largest eruption in 1883, which claimed tens of thousands of lives and changed the planet\'s climate. The power of the explosion was so enormous that it was heard thousands of kilometers away. Today, a new volcano has formed in its place - Anak Krakatau ("Child of Krakatau").',
    legend: 'In local legends, the eruption is interpreted as a struggle between the spirits of the sky and the sea, who in anger destroyed the island.',
    image: require('../assets/img/SpiriLands/Krakatau.png'),
    isBookmarked: false,
    facts: [
      'The 1883 eruption was heard 3,000 miles away',
      'It caused global temperatures to drop by 1.2°C',
      'The explosion created a tsunami that killed 36,000 people',
      'A new island, Anak Krakatau, emerged from the sea in 1927'
    ],
    lastEruption: '2022',
    type: 'active'
  },
  {
    id: '4',
    name: 'Fujiyama',
    country: 'Japan',
    location: 'Honshu Island',
    coordinates: {
      latitude: 35.360,
      longitude: 138.727,
    },
    height: 3776,
    description: 'Fujiyama is a sacred mountain of Japan, 3776 m high. It is a symbol of the country, depicted in art, literature and culture. Fuji last erupted in 1707, but its beauty is visited by millions of tourists every year. It is included in the UNESCO World Heritage List.',
    legend: 'According to myths, the volcano was created by the god of fire Kagutsutsuki, and the mountain itself is considered the home of spirits and immortal beings.',
    image: require('../assets/img/SpiriLands/Fujiyama.png'),
    isBookmarked: false,
    facts: [
      'Mount Fuji is Japan\'s highest peak',
      'It last erupted in 1707',
      'The mountain is a UNESCO World Heritage Site',
      'Over 300,000 people climb it each year'
    ],
    type: 'dormant'
  },
  {
    id: '5',
    name: 'Cotopaxi',
    country: 'Ecuador',
    location: 'Andes Mountains',
    coordinates: {
      latitude: -0.677,
      longitude: -78.436,
    },
    height: 5897,
    description: 'Cotopaxi is one of the highest active volcanoes in the world (5897 m). It is a true symbol of the Andes and a natural decoration of Ecuador. The volcano is covered with a glacier, and its eruptions have shaped the surrounding landscape for centuries.',
    legend: 'The indigenous Quechua tribes considered Cotopaxi a deity who gave crops and water, but could punish with thunder and fire.',
    image: require('../assets/img/SpiriLands/Cotopaxi.png'),
    isBookmarked: false,
    facts: [
      'Cotopaxi is one of the highest active volcanoes in the world',
      'It is covered with a glacier',
      'The volcano has shaped the surrounding landscape for centuries',
      'It is a symbol of the Andes mountains'
    ],
    lastEruption: '2015',
    type: 'active'
  },
  {
    id: '6',
    name: 'Kilauea',
    country: 'USA',
    location: 'Hawaii',
    coordinates: {
      latitude: 19.421,
      longitude: -155.287,
    },
    height: 1247,
    description: 'Kilauea is one of the most active volcanoes on the planet. Its lava flows have repeatedly destroyed settlements, but at the same time created new lands. It is part of the Hawaii Volcanoes National Park.',
    legend: 'Locals believe Kilauea is the home of the fire goddess Pele, who can both give and take life.',
    image: require('../assets/img/SpiriLands/Kilauea.png'),
    isBookmarked: false,
    facts: [
      'Kilauea is one of the most active volcanoes on Earth',
      'It has been erupting continuously since 1983',
      'The volcano creates new land through lava flows',
      'It is part of Hawaii Volcanoes National Park'
    ],
    lastEruption: '2023',
    type: 'active'
  },
  {
    id: '7',
    name: 'Mauna Loa',
    country: 'USA',
    location: 'Hawaii',
    coordinates: {
      latitude: 19.475,
      longitude: -155.608,
    },
    height: 4169,
    description: 'Mauna Loa is the largest volcano on Earth, occupying more than half of the island of Hawaii. Its height is 4,169 m, but if you count from the ocean floor, it is more than 9 km! Eruptions of Mauna Loa occur quite often, but they are less explosive than those of stratovolcanoes.',
    legend: 'Hawaiians believed that Mauna Loa was the birthplace of ancestral spirits and divine powers.',
    image: require('../assets/img/SpiriLands/MaunaLoa.png'),
    isBookmarked: false,
    facts: [
      'Mauna Loa is the largest active volcano on Earth',
      'It covers half of the island of Hawaii',
      'The volcano has been erupting for 700,000 years',
      'Its name means "Long Mountain" in Hawaiian'
    ],
    lastEruption: '2022',
    type: 'active'
  },
  {
    id: '8',
    name: 'Eyjafjallajökull',
    country: 'Iceland',
    location: 'Southern Iceland',
    coordinates: {
      latitude: 63.633,
      longitude: -19.633,
    },
    height: 1651,
    description: 'The volcano gained world fame after its 2010 eruption, which paralyzed European air traffic due to a giant ash cloud. Its height is 1651 m, the summit is covered with a glacier.',
    legend: 'According to legend, giants sleep under the ice of the volcano, who wake up from time to time and cause disasters.',
    image: require('../assets/img/SpiriLands/Eyjafjallajokull.png'),
    isBookmarked: false,
    facts: [
      'The 2010 eruption paralyzed European air traffic',
      'Its summit is covered with a glacier',
      'The volcano caused global travel disruption',
      'It is one of Iceland\'s most famous volcanoes'
    ],
    lastEruption: '2010',
    type: 'active'
  },
  {
    id: '9',
    name: 'Popocatepetl',
    country: 'Mexico',
    location: 'Central Mexico',
    coordinates: {
      latitude: 19.023,
      longitude: -98.622,
    },
    height: 5426,
    description: 'One of the most famous volcanoes in Mexico, with a height of 5426 m. It is active and often emits ash and gases. It is a sacred mountain for the Aztecs and modern Mexicans.',
    legend: 'There is a legend about the eternal love of the warrior Popo and the princess Itza, who turned into the volcanoes Popocatepetl and Ixtaccihuatl.',
    image: require('../assets/img/SpiriLands/Popocatepetl.png'),
    isBookmarked: false,
    facts: [
      'Popocatepetl is one of Mexico\'s most famous volcanoes',
      'It is a sacred mountain for the Aztecs',
      'The volcano is often active with ash emissions',
      'It has a height of 5426 meters'
    ],
    lastEruption: '2023',
    type: 'active'
  },
  
];

export const dailyFacts = [
  'On Io, a satellite of Jupiter, volcanism is stronger than on Earth.',
  'The largest volcano in the solar system is Olympus Mons on Mars.',
  'Volcanic ash can travel thousands of kilometers from the eruption site.',
  'Some volcanoes can erupt for years or even decades continuously.',
  'The word "volcano" comes from Vulcan, the Roman god of fire.',
  'Volcanic eruptions can create new islands in the ocean.',
  'The temperature of lava can reach up to 1,200°C (2,200°F).',
  'Volcanic soil is among the most fertile in the world.',
  'Some volcanoes have lakes of molten sulfur instead of water.',
  'The sound of a volcanic eruption can be heard hundreds of kilometers away.'
];
