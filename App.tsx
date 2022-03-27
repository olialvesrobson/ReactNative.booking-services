import React from 'react'
import { Provider, useSelector } from 'react-redux'
import { ReactReduxFirebaseProvider, useFirebase } from 'react-redux-firebase';
import Navigation from './navigation'
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import PublicScreen from './screens/PublicScreen'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Platform, StatusBar, ActivityIndicator } from 'react-native';
import config from './config/config';
import { View } from './components/Themed';
import { AuthContext } from './components/context';

// Setup react-redux so that connect HOC can be used
export default function App() {

  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  
  return (

    <SafeAreaProvider>
      {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <Provider store={config.store}>
          
            <ReactReduxFirebaseProvider {...config.rrfProps}>
              <Navigation colorScheme={colorScheme}/>
              {/* <PublicScreen navigation={null}/> */}
            </ReactReduxFirebaseProvider>
          
        </Provider>
    </SafeAreaProvider>
  )
  
}

