import { initializeApp, type FirebaseApp } from 'firebase/app'
import { getFirestore, type Firestore } from 'firebase/firestore'

const cfg = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

/**
 * האפליקציה עובדת גם ללא Firebase — במצב כזה הנתונים נשמרים מקומית בדפדפן.
 * ברגע שמשתני הסביבה קיימים, המערכת עוברת אוטומטית לעבודה מול Firestore.
 */
export const isFirebaseConfigured = Boolean(cfg.apiKey && cfg.projectId && cfg.appId)

let app: FirebaseApp | null = null
let firestore: Firestore | null = null

if (isFirebaseConfigured) {
  app = initializeApp(cfg)
  firestore = getFirestore(app)
}

export const db = firestore
