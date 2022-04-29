import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

console.log(process.env)
const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGINGSENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
  measurementId: process.env.VUE_APP_MEASUREMENT_ID
}

export const firebaseApp = initializeApp(firebaseConfig)
export const firestore = getFirestore(firebaseApp)
