import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDT4U67GncaaTumUNz9HINapds4YCE7N4E',
  authDomain: 'tcc-guilherme-eiti.firebaseapp.com',
  databaseURL: 'https://tcc-guilherme-eiti-default-rtdb.firebaseio.com',
  projectId: 'tcc-guilherme-eiti',
  storageBucket: 'tcc-guilherme-eiti.appspot.com',
  messagingSenderId: '999642805913',
  appId: '1:999642805913:web:13137b27ba2bcfe24e6a08',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

const firebaseDB = firebase.firestore();

export { firebaseDB };
