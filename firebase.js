
// Import des modules Firebase nécessaires
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCyhljAG5cWNAkVlm6TAwKMj-5h0MZ1GU8",
  authDomain: "amnafi.firebaseapp.com",
  projectId: "amnafi",
  storageBucket: "amnafi.firebasestorage.app",
  messagingSenderId: "584032001295",
  appId: "1:584032001295:web:15813ab0e04d0efd86327a",
  measurementId: "G-5878NTTZTZ"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);

// Exportation de Firestore
export const db = getFirestore(app);
