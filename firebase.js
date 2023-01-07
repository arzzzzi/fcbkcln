import firebase from 'firebase';
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAWl_-WxS8JswFHBizOK0rFbyuFcl4ALvM",
    authDomain: "facebook-e01c7.firebaseapp.com",
    projectId: "facebook-e01c7",
    storageBucket: "facebook-e01c7.appspot.com",
    messagingSenderId: "728633974256",
    appId: "1:728633974256:web:b9bcff7a2c651c03161135"
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

const db = app.firestore();
const storage = firebase.storage();

export { storage, db };