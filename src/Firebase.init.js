// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRFwqlkpDh2rKHe5fj6rhwAwEAGOPy5TQ",
  authDomain: "email-password-auth-d388c.firebaseapp.com",
  projectId: "email-password-auth-d388c",
  storageBucket: "email-password-auth-d388c.firebasestorage.app",
  messagingSenderId: "526940240409",
  appId: "1:526940240409:web:98fc434d352be07a170888",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
export default auth;
