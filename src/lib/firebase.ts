import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth, EmailAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const app = initializeApp({
  apiKey: 'AIzaSyDzYE47IiDBaaY4Q_Rt-jmhypIXF6xTWuQ',
  authDomain: 'werecycle-d5675.firebaseapp.com',
  projectId: 'werecycle-d5675',
  storageBucket: 'werecycle-d5675.appspot.com',
  messagingSenderId: '105484506785',
  appId: '1:105484506785:web:dc3e2db68697b86e6802e0'
});

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const database = getFirestore(app);

export { auth, database, googleProvider };