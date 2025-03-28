
// Script d'import JSON vers Firestore (à exécuter dans une page HTML ou en Node via CLI Firebase)

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// Config Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCyhljAG5cWNAkVlm6TAwKMj-5h0MZ1GU8",
  authDomain: "amnafi.firebaseapp.com",
  projectId: "amnafi",
  storageBucket: "amnafi.firebasestorage.app",
  messagingSenderId: "584032001295",
  appId: "1:584032001295:web:15813ab0e04d0efd86327a",
  measurementId: "G-5878NTTZTZ"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Importer depuis un fichier JSON local ou array statique (remplace ici)
const produits = await fetch('produits_affilies.json').then(res => res.json());

for (const produit of produits) {
  try {
    await addDoc(collection(db, "produits"), produit);
    console.log("✅ Produit ajouté :", produit.nom);
  } catch (e) {
    console.error("❌ Erreur ajout produit :", produit.nom, e);
  }
}
