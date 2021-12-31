// Declaration de l'url de mon api
const urlApi = "http://localhost:3000/api/products";

loadApi();

function loadApi() {
  fetch(urlApi)
    .then(res => { if (res.ok) return res.json(); })
    .then(products => { displayProducts(products); })
    .catch(erreur => { console.log(erreur); alert("Une erreur est survenue!! Veuillez contacter l'administrateur du site!"); });
}

function displayProducts(listProducts) {

  let html = "";
  console.log(listProducts);
  listProducts.forEach(element => {

    html = html + ` <a href="./product.html?id=${element._id}">
        <article>
          <img src="${element.imageUrl}" alt="${element.altTxtProduct}">
          <h3 class="productName">${element.name}</h3>
          <p class="productDescription">${element.description}</p>
        </article>
      </a>`;
  });

  document.getElementById("items").innerHTML = html;

}