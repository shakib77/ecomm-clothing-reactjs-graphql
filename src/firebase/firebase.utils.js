import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyA4NYLfxzT5SfVFyhkY3QbFPCyh--gacNg",
  authDomain: "ecomm-clothing-reactjs-db.firebaseapp.com",
  databaseURL: "https://ecomm-clothing-reactjs-db.firebaseio.com",
  projectId: "ecomm-clothing-reactjs-db",
  storageBucket: "ecomm-clothing-reactjs-db.appspot.com",
  messagingSenderId: "676316834140",
  appId: "1:676316834140:web:0d536b5b604a29154bf999",
  measurementId: "G-R3N66SV00L"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
