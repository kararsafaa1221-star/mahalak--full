import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import admin from "firebase-admin";

// Use application default credentials since we have google context.
const app = initializeApp({
  projectId: "mahalak-0"
});

async function run() {
    try {
        const listUsersResult = await getAuth(app).listUsers(1000);
        console.log(`Auth users count: ${listUsersResult.users.length}`);
        listUsersResult.users.forEach(u => console.log(u.email));
    } catch(e) {
        console.log("Error listing users", e);
    }
}
run();
