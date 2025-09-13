import admin from "firebase-admin";
import { serviceAccount } from "../../../next.config";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const adminDb = admin.firestore();
