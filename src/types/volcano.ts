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
  character?: {
    name: string;
    image: string;
    message: string;
  };
}
