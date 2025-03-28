
import { db } from './firebase.js';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// Sélection des éléments HTML
const productList = document.getElementById("products");
const searchInput = document.getElementById("search");
const categoryFilter = document.getElementById("filter-category");
const priceFilter = document.getElementById("filter-price");

const baseWhatsApp = "https://wa.me/221770000000?text=";

// Fonction d'affichage des produits
function displayProducts(products) {
  productList.innerHTML = "";
  if (products.length === 0) {
    productList.innerHTML = "<p>Aucun produit trouvé.</p>";
    return;
  }

  products.forEach(product => {
    const li = document.createElement("li");

    let badge = product.populaire ? `<span class="badge">🔥 Populaire</span>` : "";

    let link;
    if (product.whatsapp) {
      const message = encodeURIComponent(`Bonjour, je suis intéressé par le produit "${product.nom}" vu sur Amnafi.com.`);
      link = `<a href="\${baseWhatsApp + message}" class="buy-button" target="_blank">Commander via WhatsApp</a>`;
    } else if (product.lien) {
      link = `<a href="\${product.lien}" class="buy-button" target="_blank">Acheter</a>`;
    } else {
      link = `<span style="color: red;">Lien indisponible</span>`;
    }

    li.innerHTML = \`
      <img src="\${product.image}" alt="\${product.nom}" style="max-width: 100%; border-radius: 8px;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <h3>\${product.nom}</h3> \${badge}
      </div>
      <p><strong>\${product.prix.toLocaleString()} FCFA</strong></p>
      <p style="color: #555;">Catégorie : \${product.categorie}</p>
      \${link}
    \`;

    productList.appendChild(li);
  });
}

// Fonction de filtrage
function applyFilters(data) {
  const text = searchInput.value.toLowerCase();
  const cat = categoryFilter.value;
  const prix = priceFilter.value;

  let filtered = data.filter(p =>
    p.nom.toLowerCase().includes(text) ||
    p.categorie.toLowerCase().includes(text)
  );

  if (cat !== "tous") {
    filtered = filtered.filter(p => p.categorie.toLowerCase() === cat.toLowerCase());
  }

  if (prix !== "tous") {
    if (prix === "moins50000") {
      filtered = filtered.filter(p => p.prix < 50000);
    } else if (prix === "50000a150000") {
      filtered = filtered.filter(p => p.prix >= 50000 && p.prix <= 150000);
    } else if (prix === "plus150000") {
      filtered = filtered.filter(p => p.prix > 150000);
    }
  }

  displayProducts(filtered);
}

// Charger les produits depuis Firestore
async function loadProducts() {
  const produitsSnapshot = await getDocs(collection(db, "produits"));
  const produitsData = produitsSnapshot.docs.map(doc => doc.data());

  displayProducts(produitsData);

  // Ajouter les événements de filtre
  searchInput.addEventListener("input", () => applyFilters(produitsData));
  categoryFilter.addEventListener("change", () => applyFilters(produitsData));
  priceFilter.addEventListener("change", () => applyFilters(produitsData));
}

loadProducts();
