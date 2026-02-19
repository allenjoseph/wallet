import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const app = initializeApp(
  JSON.parse(atob(import.meta.env.VITE_FIREBASE_CONFIG)),
);

export const db = getFirestore(app);
