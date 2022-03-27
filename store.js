import { createStore, compose } from 'redux';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore'; // make sure you add this for firestore
import { reactReduxFirestore,  } from 'react-redux-firebase';
import { firebase as fbConfig, rrfConfig } from './config/config';
import rootReducer from './reducer';

export default function configureStore(initialState, history) {
    
    // Initialize Firebase instance
    firebase.initializeApp(fbConfig);

    const createStoreWithMiddleware = compose(
        reactReduxFirestore(firebase, {
        ...rrfConfig // Store in Firestore instead of Real Time DB
        })
    )(createStore);

    const store = createStoreWithMiddleware(rootReducer);

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('./reducer', () => {
        const nextRootReducer = require('./reducer')
        store.replaceReducer(nextRootReducer)
        })
    };

    return store;
}
