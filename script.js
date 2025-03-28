// script.js PRO MAX

import { db } from './firebase.js';
import { collection, getDocs, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

const productList = document.getElementById("products");
const popularList = document.getElementById("popular-products");
const jumiaSection = document.getElementById("jumia-products");
const popup = document.getElementById("popup");

function showPopup(message) {
  popup.innerText = message;
  popup.style.display = "block";
  setTimeout(() => (popup.style.display = "none"), 3000);
}

function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "product-card";

  card.innerHTML = `
    ${product.populaire ? '<div class="badge-populaire">🔥 Populaire</div>' : ""}
    <img src="${product.image}" alt="${product.nom}" />
    <h4>${product.nom}</h4>
    <p><strong>${product.prix.toLocaleString()} FCFA</strong></p>
    <p>${product.categorie}</p>
    <a href="${product.lien || '#'}" target="_blank" class="buy-button">Voir l'offre</a>
    ${product.whatsapp ? `<a href="https://wa.me/221771234567?text=Bonjour, je veux ce produit : ${product.nom}" target="_blank" class="whatsapp-button">WhatsApp</a>` : ""}
  `;

  return card;
}

function renderAllProducts(data) {
  productList.innerHTML = "";
  data.forEach((p) => productList.appendChild(createProductCard(p)));
}

function renderPopular(data) {
  popularList.innerHTML = "";
  data.filter(p => p.populaire).forEach((p) => popularList.appendChild(createProductCard(p)));
}

function renderJumia(data) {
  jumiaSection.innerHTML = "";
  data.filter(p => p.lien && p.lien.includes("jumia")).forEach((p) => jumiaSection.appendChild(createProductCard(p)));
}

function applyFilters(data) {
  const search = document.getElementById("search").value.toLowerCase();
  const cat = document.getElementById("categorie").value;
  const prix = document.getElementById("prix").value;

  return data.filter(p => {
    const matchSearch = p.nom.toLowerCase().includes(search);
    const matchCat = cat === "" || p.categorie === cat;
    const matchPrix = prix === "" || (prix === "<100000" && p.prix < 100000) || (prix === ">100000" && p.prix > 100000);
    return matchSearch && matchCat && matchPrix;
  });
}

function updateUI(data) {
  const filtered = applyFilters(data);
  renderAllProducts(filtered);
  renderPopular(data);
  renderJumia(data);
}

async function loadAndWatchProducts() {
  try {
    const ref = collection(db, "produits");
    onSnapshot(ref, (snapshot) => {
      const data = snapshot.docs.map(doc => doc.data());
      console.log("📦 Produits à jour :", data);
      updateUI(data);
    });
  } catch (err) {
    console.error("❌ Erreur chargement Firestore:", err);
    showPopup("Erreur chargement produits");
  }
}

// Événements sur les filtres
["search", "categorie", "prix"].forEach(id => {
  document.getElementById(id).addEventListener("input", () => loadAndWatchProducts());
});

loadAndWatchProducts();
