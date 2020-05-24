import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config={
    apiKey: "AIzaSyB7N9UqUGtD7vG7t_w88zuXlwO7krtKJB8",
    authDomain: "my-ecom-app-db.firebaseapp.com",
    databaseURL: "https://my-ecom-app-db.firebaseio.com",
    projectId: "my-ecom-app-db",
    storageBucket: "my-ecom-app-db.appspot.com",
    messagingSenderId: "398929737502",
    appId: "1:398929737502:web:733e6152574f20f8a33b0f"
  };

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
  firebase.initializeApp(config);

  export const auth=firebase.auth();
  export const firestore=firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();

  provider.setCustomParameters({prompt : 'select_account'});

  export const signInWithGoogle = () => auth.signInWithPopup(provider);
  export default firebase;
