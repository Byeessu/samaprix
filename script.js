
import { db } from './firebase.js';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// Fonction d'affichage des produits principaux
function displayProducts(data) {
  const productList = document.getElementById("products");
  productList.innerHTML = "";

  data.forEach(product => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${product.nom}</strong><br>
      ${product.prix.toLocaleString()} FCFA<br>
      <small>${product.categorie}</small><br>
      <a href="${product.lien}" class="buy-button" target="_blank">Voir l'offre</a>
    `;
    productList.appendChild(li);
  });
}

// Fonction d'affichage section Jumia
function renderJumiaOffers(data) {
  const jumiaSection = document.getElementById("jumia-products");
  const affiliés = data.filter(p => p.lien && p.lien.includes("aff_id"));

  jumiaSection.innerHTML = "";

  affiliés.forEach(product => {
    const div = document.createElement("div");
    div.className = "jumia-card";
    div.innerHTML = `
      <img src="${product.image}" alt="${product.nom}" />
      <h4>${product.nom}</h4>
      <p><strong>${product.prix.toLocaleString()} FCFA</strong></p>
      <a href="${product.lien}" target="_blank" class="buy-button">Acheter</a>
    `;
    jumiaSection.appendChild(div);
  });
}

// Chargement des produits depuis Firebase
async function loadProducts() {
  try {
    const querySnapshot = await getDocs(collection(db, "produits"));
    const produitsData = querySnapshot.docs.map(doc => doc.data());

    console.log("✅ Produits récupérés depuis Firestore :", produitsData);

    displayProducts(produitsData);
    renderJumiaOffers(produitsData);
  } catch (error) {
    console.error("❌ Erreur de chargement Firebase :", error);
  }
}

loadProducts();
