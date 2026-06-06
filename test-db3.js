import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import firebaseConfigData from "./firebase-applet-config.json" with { type: "json" };

const app = initializeApp(firebaseConfigData);

async function checkData(dbId) {
    try {
        const db = dbId ? getFirestore(app, dbId) : getFirestore(app);
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
    await checkData("ai-studio-dbc0c011-0d75-42ae-80eb-d970ba22cf44");
    await checkData();
    process.exit(0);
}

run();
