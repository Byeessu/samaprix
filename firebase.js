
// Importation Firebase en module ES6 pour compatibilité avec Firebase 9+
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Configuration Firebase pour Amnafi
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
const db = getFirestore(app);

// Exportation de la base de données pour usage dans d'autres fichiers
export { db };
