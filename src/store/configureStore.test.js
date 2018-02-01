import {
  createStore,
  compose,
  applyMiddleware
} from 'redux'
import {
  reactReduxFirebase
} from 'react-redux-firebase'
import { createLogger } from 'redux-logger';
import { routerMiddleware }     from 'react-router-redux';
import { composeWithDevTools }  from 'redux-devtools-extension';
import createHistory            from 'history/createBrowserHistory';
import thunkMiddleware from "redux-thunk";
import { localStorageManager } from "../middleware/localStorage";
import firebase from 'firebase'
import reducer                  from '../reducers/root';

const loggerMiddleware = createLogger({
  level     : 'info',
  collapsed : true
});

export const history = createHistory();

const enhancer = composeWithDevTools(
  applyMiddleware(
    localStorageManager,
    thunkMiddleware,
    // promise(),
    routerMiddleware(history),
    loggerMiddleware
  )
);

const firebaseConfig = {
  apiKey: 'AAAAQ75F3FE:APA91bH9OYcDiylNq66mAdOX6R38c7wRIr6GZimlXiKZI73hZlMzTrugpCTta1Y9pxAKUrbfeZREcX97raqr2ljWTJcuAP4bs2fdtlpxzm8wCj4cxkS6jGgU8mJsXO13BVnN4n-YfmV3',
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

// initialize firebase instance
firebase.initializeApp(firebaseConfig) // <- new to v2.*.*

// initialize firestore
// firebase.firestore() // <- needed if using firestore

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  // reduxFirestore(firebase) // <- needed if using firestore
)(createStore)

export default function configureStore(initialState) {
  const store = createStoreWithFirebase(reducer, initialState, enhancer);
  return store;
}
