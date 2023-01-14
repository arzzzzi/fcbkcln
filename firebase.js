import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyAWl_-WxS8JswFHBizOK0rFbyuFcl4ALvM",
    authDomain: "facebook-e01c7.firebaseapp.com",
    projectId: "facebook-e01c7",
    storageBucket: "facebook-e01c7.appspot.com",
    messagingSenderId: "728633974256",
    appId: "1:728633974256:web:b9bcff7a2c651c03161135"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
export default app;
export { db };