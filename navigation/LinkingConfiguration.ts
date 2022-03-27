/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          TabLogin: {
            screens: {
              TabLoginScreen: 'one',
            },
          },
          TabRegister: {
            screens: {
              TabRegisterScreen: 'two',
            },
          },
        },
      },
      Home: {
        screens: {
          TabFeed: {
            screens: {
              TabFeedScreen: 'feed',
            }
          },
          TabCalendar: {
            screens: {
              Calendar: 'calendar',
            }
          }
        }
      },
      NotFound: '*',
      Signin: 'signin',
      SignUp: 'signup',
    },
  },
};

export default linking;
