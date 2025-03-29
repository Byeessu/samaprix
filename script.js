import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

async function loadProducts() {
  try {
    const querySnapshot = await getDocs(collection(db, "produits"));
    const products = querySnapshot.docs.map(doc => doc.data());

    console.log("🔥 Produits chargés :", products);

    const productList = document.getElementById("products");
    productList.innerHTML = "";

    products.forEach(product => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${product.nom}</strong><br>
        ${product.prix.toLocaleString()} FCFA<br>
        <small>${product.categorie}</small><br>
        <a href="${product.lien}" target="_blank">Voir l'offre</a>
      `;
      productList.appendChild(li);
    });
  } catch (e) {
    console.error("❌ Erreur Firestore :", e);
  }
}

loadProducts();