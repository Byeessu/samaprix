
// Charger les produits depuis produits.json
fetch('produits.json')
  .then(response => response.json())
  .then(data => {
    const productList = document.getElementById("products");
    const searchInput = document.getElementById("search");

    function displayProducts(products) {
      productList.innerHTML = "";
      products.forEach(product => {
        const li = document.createElement("li");

        li.innerHTML = `
          <img src="\${product.image}" alt="\${product.nom}" style="max-width: 100%; border-radius: 8px;">
          <h3>\${product.nom}</h3>
          <p><strong>\${product.prix.toLocaleString()} FCFA</strong></p>
          <a href="\${product.lien}" class="buy-button" target="_blank">Acheter</a>
        `;

        productList.appendChild(li);
      });
    }

    // Afficher tous les produits au chargement
    displayProducts(data);

    // Filtrer en fonction de la recherche
    searchInput.addEventListener("input", function () {
      const filter = this.value.toLowerCase();
      const filtered = data.filter(p =>
        p.nom.toLowerCase().includes(filter) ||
        p.categorie.toLowerCase().includes(filter)
      );
      displayProducts(filtered);
    });
  })
  .catch(error => {
    console.error("Erreur de chargement des produits :", error);
  });
