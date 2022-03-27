import rootReducer from '../reducer';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'; 
import { createFirestoreInstance, reduxFirestore, getFirestore } from 'redux-firestore';
import { createStore, applyMiddleware, compose } from 'redux';
import { getFirebase } from "react-redux-firebase";
import thunk from "redux-thunk";

const fbConfig = {
    apiKey: "AIzaSyBerC-eXHL5s-_3QuU0tSfFSq26u15ut4I",
    authDomain: "dude-garden-care.firebaseapp.com",
    databaseURL: "https://dude-garden-care.firebaseio.com",
    projectId: "dude-garden-care",
    storageBucket: "dude-garden-care.appspot.com",
    messagingSenderId: "130253913731",
    appId: "1:130253913731:web:e78354bc83d0ef08"
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

try {
  if ( !firebase.apps.length ){
    firebase.initializeApp(fbConfig);
  }
	firebase.firestore();
	console.log("Firebase Initialized");
} catch (err) {
	console.log("Error Initializing Firebase: ", err);
}

// Create store with reducers and initial state
const initialState = {}
const middlewares = [thunk.withExtraArgument({ getFirebase, getFirestore })]; 
const store = createStore(
    rootReducer, 
    initialState,
    compose(applyMiddleware(...middlewares), reduxFirestore(fbConfig, rrfConfig))
    )

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance 
}

export default { store, rrfProps } ;
