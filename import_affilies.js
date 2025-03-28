
import { db } from './firebase.js';
import { collection, addDoc } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js';

const importBtn = document.getElementById("import-btn");
const status = document.getElementById("status");

importBtn.addEventListener("click", async () => {
  status.innerHTML = "⏳ Importation en cours...";

  try {
    const response = await fetch('produits_affilies.json');
    const data = await response.json();

    for (let produit of data) {
      await addDoc(collection(db, "produits"), produit);
    }

    status.innerHTML = "✅ Importation réussie 🎉";
  } catch (error) {
    console.error("Erreur import :", error);
    status.innerHTML = "❌ Erreur durant l'import.";
  }
});
