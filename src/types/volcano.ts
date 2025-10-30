export interface Aircraft {
  id: string;
  name: string;
  manufacturer: string;
  country: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  maxSpeed: number;
  description: string;
  history: string;
  image: any;
  isBookmarked: boolean;
  facts: string[];
  firstFlight?: string;
  type: 'fighter' | 'passenger' | 'cargo' | 'military';
}

// Keep Volcano interface for backward compatibility
export interface Volcano {
  id: string;
  name: string;
  country: string;
  location: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  height: number;
  description: string;
  legend: string;
  image: string;
  isBookmarked: boolean;
  facts: string[];
  lastEruption?: string;
  type: 'active' | 'dormant' | 'extinct';
}

export interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  buttonText: string;
  image?: any;
  character?: {
    name: string;
    image: string;
    message: string;
  };
}
