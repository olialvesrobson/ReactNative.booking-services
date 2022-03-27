
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';
import fbConfig from './config/config';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { Provider } from 'react-redux';
import { Platform, StatusBar } from 'react-native';
import createReduxStore from './createReduxStore';
import { getFirebase, ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { Text, View } from './components/Themed';


if (!firebase.apps.length) {
  firebase.initializeApp(fbConfig.fbConfig);
} 


const store = createReduxStore();

const rrfProps = {
  firebase,
  config: fbConfig.rrfConfig,
  dispatch: store.dispatch,
  //createFirestoreInstance // <- needed if using firestore
}

export default function App() {

  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const auth = getFirebase();

  
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      
      <SafeAreaProvider>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <Provider store={store}>
            <ReactReduxFirebaseProvider {...rrfProps}>
              {/* <Navigation colorScheme={colorScheme} /> */}
              
            </ReactReduxFirebaseProvider>
          </Provider>
        
        <StatusBar />
      </SafeAreaProvider>
    );
  }
};
