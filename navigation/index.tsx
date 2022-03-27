/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import * as SecureStore from 'expo-secure-store';
import { ActivityIndicator, ColorSchemeName, Pressable } from 'react-native';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import CalendarScreen from '../screens/calendar';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import SignInScreen from '../screens/signInScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import SignedOutNavigation from './signed-out';
import HomeScreen from '../screens/home';
import FeedScreen from '../screens/feed';
import { Text, View } from '../components/Themed';
import { useFirebase } from 'react-redux-firebase';
import { AuthContext } from '../components/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

async function getSignIn(key: string) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    return (true);
  } else {
    return (false);
  }
}

function RootNavigator() {
  

  const firebase = useFirebase();
  const uid = getSignIn('userID');

  const initialLoginState = {
    isLoading: false,
    uid: null,
    user: null,
    isSignedIn: false
  };

  const loginReducer = (prevState, action) => {
    switch ( action.type) {
      case 'RETRIVE_TOKEN':
        return {
          ...prevState,
          uid: action.uid,
          isSignedIn: true,
          isLoading: false
        }
      case 'SIGNIN':
        return {
          ...prevState,
          uid: action.uid,
          user: action.user,
          isSignedIn: true,
          isLoading: false
        }
      case 'SIGNOUT':
        return {
          ...prevState,
          uid: null,
          user: null,
          isSignedIn: false,
          isLoading: false
        }
      case 'REGISTER':
        return {
          ...prevState,
          uid: action.uid,
          user: action.user,
          isSignedIn: true,
          isLoading: false
        }
      default:
        break;
    }
  }

  const [ loginState, dispacth ] = React.useReducer(loginReducer, initialLoginState)

  const authContext = React.useMemo(() => ({
    signIn: (email, password) => {
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then(async(resp) => {
          
          try {
            await AsyncStorage.setItem('userLogged', resp.user?.uid);
          } catch (e) {
            console.log('Error Async Logging: ', e);
          }
          dispacth({ type: 'SIGNIN' , uid: resp.user?.uid, user: resp.user, isSignedIn: true});
      })
      .catch((error) => {
          console.log('Error while signing in: ', error);
      });
    },
    signOut: async() => {
      firebase.auth().signOut();
      try {
        await AsyncStorage.removeItem('userLogged');
      } catch (e) {
        console.log('Error Async Logging: ', e);
      }
      
      dispacth({ type: 'SIGNOUT' , uid: null, user: null, isSignedIn: false});
    },
    signUp: () => {
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then(async(resp) => {
          
          try {
            await AsyncStorage.setItem('userLogged', resp.user?.uid);
          } catch (e) {
            console.log('Error Async SignUp: ', e);
          }
          dispacth({ type: 'REGISTER' , uid: resp.user?.uid, user: resp.user, isSignedIn: true});
      })
      .catch((error) => {
          console.log('Error while signing up: ', error);
      });
      
    }
  }));


  React.useEffect(() => {
    setTimeout(async() => {
      let userID;
      userID = null;
      try {
        userID = await AsyncStorage.getItem('userLogged');
      } catch (e) {
        console.log('Error Async Logging: ', e);
      }

      dispacth({ type: 'REGISTER' , uid: userID, isSignedIn: true});
    }, 1500);
  }, [])
  
  
  if (loginState.isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#49e811" />
      </View>
      
    );
  } else {
    return (
      <AuthContext.Provider value={authContext}>
        <Stack.Navigator 
          initialRouteName={loginState.isSignedIn ? 'Feed' : 'Root'}
        >
          
          { loginState.isSignedIn ?
            <>
              <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />    
              <Stack.Screen name="Calendar" component={CalendarScreen} options={{ headerShown: true }} />
              <Stack.Screen name="Feed" component={FeedScreen} options={{ headerShown: true }} />
              
            </>
          :
            <>
              <Stack.Screen name="Root" component={SignedOutNavigation} options={{ headerShown: false }} />
              <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen name="Signin" 
                  component={SignInScreen}
                  options={{ 
                    headerShown: false,
                  }} />

                <Stack.Screen name="Signup" 
                  component={SignInScreen}
                  options={{ 
                    headerShown: false,
                  }} />

              
              </Stack.Group>
            </>
          }
          
          
          
          <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
          

          
          
        </Stack.Navigator>
      </AuthContext.Provider>
    );
  }
}





