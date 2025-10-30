import { NavigatorScreenParams } from '@react-navigation/native';
import { Volcano, Aircraft } from './volcano';

export type RootStackParamList = {
  Onboarding: undefined;
  MainTabs: NavigatorScreenParams<TabParamList>;
  AircraftDetail: { aircraft: Aircraft };
  Legend: { aircraft: Aircraft };
  AircraftComparison: undefined;
  AircraftQuiz: undefined;
  AircraftStats: undefined;
  // Keep old routes for backward compatibility
  VolcanoDetail: { volcano: Volcano };
};

export type TabParamList = {
  Home: undefined;
  Bookmarks: undefined;
  Info: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
