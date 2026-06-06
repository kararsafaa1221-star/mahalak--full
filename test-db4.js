import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";
import { getDocs, collection } from "firebase/firestore";
import firebaseConfigData from "./firebase-applet-config.json" with { type: "json" };

const app = initializeApp(firebaseConfigData);

async function checkData(dbId) {
    try {
        const db = dbId 
            ? initializeFirestore(app, { experimentalAutoDetectLongPolling: true }, dbId) 
            : initializeFirestore(app, { experimentalAutoDetectLongPolling: true });
            
        const snapshot = await getDocs(collection(db, "users"));
        console.log(`Success: ${dbId || '(default)'} - Users count: ${snapshot.size}`);

        const custSnapshot = await getDocs(collection(db, "customers"));
        console.log(`Success: ${dbId || '(default)'} - Customers count: ${custSnapshot.size}`);
        
        const storeSnapshot = await getDocs(collection(db, "stores"));
        console.log(`Success: ${dbId || '(default)'} - Stores count: ${storeSnapshot.size}`);
    } catch (e) {
        console.error(`Failed: ${dbId || '(default)'} -> ${e.message}`);
    }
}

async function run() {
    // Only check default since initializeFirestore can't be called twice for the same app easily
    await checkData();
    process.exit(0);
}

run();
