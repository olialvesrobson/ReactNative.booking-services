import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Pressable } from 'react-native';
import { RootTabParamList, RootTabScreenProps } from '../../types';

import { FontAwesome } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import CalendarScreen from '../calendar';
import TabFeedScreen from '../feed';
import { useFirebase } from 'react-redux-firebase';
import SignedOutNavigation from '../../navigation/signed-out';
import { AuthContext } from '../../components/context';
/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function HomeScreen({navigation}) {
    const colorScheme = useColorScheme();
    const { signOut } = React.useContext(AuthContext);
    const firebase = useFirebase();

    return (
        <BottomTab.Navigator
        initialRouteName="Feed"
        screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme].tint,
        }}>
        <BottomTab.Screen
            name="TabCalendar"
            component={CalendarScreen}
            options={({ navigation }: RootTabScreenProps<'TabCalendar'>) => ({
            title: 'Calendar',
            tabBarIcon: ({ color }) => <TabBarIcon name="calendar" color={color} />,
            headerRight: () => (
                <Pressable
                onPress={() => navigation.navigate('Calendar')}
                style={({ pressed }) => ({
                    opacity: pressed ? 0.5 : 1,
                })}>
                <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme].text}
                    style={{ marginRight: 15 }}
                />
                </Pressable>
            ),
            })}
        />
        <BottomTab.Screen
            name="TabFeed"
            component={TabFeedScreen}
            options={{
            title: 'Feed',
            tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
            headerRight: () => (
                <Pressable
                onPress={() => { signOut() }}
                style={({ pressed }) => ({
                    opacity: pressed ? 0.5 : 1,
                })}>
                <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme].text}
                    style={{ marginRight: 15 }}
                />
                </Pressable>
            ),
            }}
        />
        </BottomTab.Navigator>
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

export default HomeScreen;
