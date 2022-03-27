import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import { RootTabParamList, RootTabScreenProps } from '../types';

import { FontAwesome } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import PublicScreen from '../screens/PublicScreen';
/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function SignedOutNavigation({navigation}) {
    const colorScheme = useColorScheme();

    return (
        <PublicScreen navigation={navigation} />
    );
}

  /**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
  }) {
    return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
  }

export default SignedOutNavigation
