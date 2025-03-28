// script.js

import { db } from './firebase.js';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// Fonction pour formater le prix en FCFA
function formatPrix(valeur) {
  return valeur.toLocaleString() + " FCFA";
}

// Fonction pour générer une carte produit
function createProductCard(produit) {
  const div = document.createElement("div");
  div.className = "product-card";

  let badge = produit.populaire ? '<span class="badge-populaire">🔥 Populaire</span>' : "";
  let whatsappLink = produit.whatsapp && produit.nom ? `
    <a class="whatsapp-link" href="https://wa.me/?text=Bonjour%2C%20je%20suis%20int%C3%A9ress%C3%A9%20par%20${encodeURIComponent(produit.nom)}" target="_blank">📱 Discuter sur WhatsApp</a>
  ` : "";

  div.innerHTML = `
    ${badge}
    <img src="${produit.image}" alt="${produit.nom}" />
    <h3>${produit.nom}</h3>
    <p><strong>${formatPrix(produit.prix)}</strong></p>
    <p>${produit.categorie}</p>
    <a href="${produit.lien}" target="_blank" class="buy-button">Voir l'offre</a>
    ${whatsappLink}
  `;

  return div;
}

// Fonction principale de chargement des produits
async function chargerProduits() {
  const conteneur = document.getElementById("products");
  conteneur.innerHTML = "Chargement...";

  try {
    const querySnapshot = await getDocs(collection(db, "produits"));
    const produits = querySnapshot.docs.map(doc => doc.data());

    conteneur.innerHTML = "";
    produits.forEach(produit => {
      const carte = createProductCard(produit);
      conteneur.appendChild(carte);
    });
  } catch (err) {
    conteneur.innerHTML = "Erreur de chargement.";
    console.error("❌ Firebase load error:", err);
  }
}

chargerProduits();
