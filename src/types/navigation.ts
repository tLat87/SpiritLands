import { NavigatorScreenParams } from '@react-navigation/native';
import { Volcano } from './volcano';

export type RootStackParamList = {
  Onboarding: undefined;
  MainTabs: NavigatorScreenParams<TabParamList>;
  VolcanoDetail: { volcano: Volcano };
  Legend: { volcano: Volcano };
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
