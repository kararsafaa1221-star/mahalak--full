import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, initializeFirestore } from 'firebase/firestore';
import firebaseConfigData from '../../firebase-applet-config.json';

// Configuration from applet config or environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || firebaseConfigData.apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || firebaseConfigData.authDomain,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || firebaseConfigData.projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || firebaseConfigData.storageBucket,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || firebaseConfigData.messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || firebaseConfigData.appId,
};

// Use the database ID from config or env
// In AI Studio preview, '(default)' is usually the most reliable unless a custom DB was explicitly provisioned and ready.
const databaseId = '(default)';

console.log("Configuring Firestore for project:", firebaseConfig.projectId, "using database:", databaseId);

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Use initializeFirestore with settings optimized for proxy environments
let firestoreDb;
try {
  firestoreDb = initializeFirestore(app, {
    experimentalForceLongPolling: true
  }, databaseId);
} catch (e) {
  firestoreDb = getFirestore(app, databaseId);
}
export const db = firestoreDb;

export const auth = getAuth(app);
