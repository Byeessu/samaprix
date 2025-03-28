
// Section "Nos meilleures offres Jumia"
function renderJumiaOffers(data) {
  const jumiaSection = document.getElementById("jumia-products");
  const affiliés = data.filter(p => p.lien && p.lien.includes("aff_id"));

  jumiaSection.innerHTML = "";

  affiliés.forEach(product => {
    const div = document.createElement("div");
    div.className = "jumia-card";
    div.innerHTML = \`
      <img src="\${product.image}" alt="\${product.nom}" />
      <h4>\${product.nom}</h4>
      <p><strong>\${product.prix.toLocaleString()} FCFA</strong></p>
      <a href="\${product.lien}" target="_blank" class="buy-button">Acheter</a>
    \`;
    jumiaSection.appendChild(div);
  });
}
