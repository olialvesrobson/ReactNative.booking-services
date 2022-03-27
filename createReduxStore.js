import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore } from 'redux-firestore';

import { getFirebase } from 'react-redux-firebase';
// eslint-disable-next-line import/no-extraneous-dependencies

import { compose } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducer';
import fbConfig from './config/config';

// ======================================================
// Middleware Configuration
// ======================================================
const middleware = [
  thunk.withExtraArgument({ getFirebase }),
  // This is where you add other middleware like redux-observable
];


const store = () => createStore(
  rootReducer,
  compose(
    applyMiddleware(...middleware),
    reduxFirestore(fbConfig),
  ),
);

export default () => store;