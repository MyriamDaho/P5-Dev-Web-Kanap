// récupération de id produit
const urlWindow=window.location.search;
const idProduct= new URLSearchParams(urlWindow).get("id");

// declarer l'url de l'api product 
const urlProduct='http://localhost:3000/api/products/'+idProduct;


loadApi();

function loadApi(){
fetch(urlProduct)
.then(res => { if(res.ok) return res.json();})
.then(product => { displayProduct(product);})
.catch(erreur => { console.log(erreur); alert("Une erreur est survenue!! Veuillez contacter l'administrateur du site!"); });
}

function displayProduct(produit){

console.log(produit);
document.querySelector(".item__img").innerHTML=` <img src="${produit.imageUrl}" alt=""${produit.altTxt}"> `;
document.getElementById('title').textContent=`${produit.name}`;       
document.getElementById('price').textContent=`${produit.price}`;
document.getElementById('description').textContent=`${produit.description}`;


document.getElementById('quantity').addEventListener('change', function (event) {
  event.stopPropagation();
  event.preventDefault();
  validQuantity(this.value);
    
});

let option=`<option value="">--SVP, choisissez une couleur --</option>`;
produit.colors.forEach(element => {
  option +=` <option value="${element}">${element}</option>`;
});
document.getElementById('colors').innerHTML= option;   
document.getElementById('colors').addEventListener('change', function (event) {
  event.stopPropagation();
  event.preventDefault();  
  validColor(this.value);
    
});
//sélectionner le bouton "Ajouter au panier"
document.getElementById('addToCart').addEventListener('click', function (event) {
  event.stopPropagation();
  event.preventDefault();  
 // valider la quantité et la couleur avant d'ajouter le produit au panier
  let isValidColor =validColor( document.getElementById('colors').value);
  let isValidQuantity = validQuantity(document.getElementById('quantity').value);
    if(isValidColor && isValidQuantity){ 

      AjouterAuPanier(produit);

    }
    
  });
}

function validQuantity(quantity){
  let isValid = true;
  if(quantity < 1 || quantity > 100)
  {
  isValid = false;
  alert("Veuillez saisir une quantité entre 1 et 100");
  }
  return isValid;
}

function validColor(color){
  isValid = true;
  if(color== ""){
    isValid= false;
    alert("Veuillez choisir une couleur!!");
  }
  return isValid;
}

//stocker les éléments du panier dans le localStorage
function AjouterAuPanier(produit){

   //  Preparer le produit à Ajouter
   let productDetails={
     id: produit._id,
    item_image:produit.imageUrl,
     name: produit.name,
     price:produit.price,
     color:colors.value,
     quantity:parseInt(quantity.value)
   }
  
   // recuperer le contenu du localStorage 
   let produits = getLocalStorage();
   let exist = false;
   // Parcourir le tableau pour verifer si l'element existe ou non 
produits.forEach(element => {
   if(element.id == produit._id && element.color == colors.value ){
    exist = true;
    // Ajouter la quantité
    element.quantity += parseInt(quantity.value)
   }
  
});
 // element n'existe pas ajouter l'element au tableau
 if(!exist)
 {
  produits =  addProductToTable(productDetails,produits);
 }

 // On a terminé avec le tableau on doit le sauvegarder 
 setLocalStorage(produits);
}
// recuperer localstorage
function getLocalStorage(){
  let stockedProducts=[];
  
  // Verifier si le localStorage est rempli ou non 
  if(localStorage.getItem("Produits"))
  {
    stockedProducts = JSON.parse(localStorage.getItem("Produits"));
  }
  return stockedProducts;
}

// Ajouter l'element au tableau ( tableau de persistance de données: phase intermediaire pour manipuler le localStorage)
function addProductToTable(product, stockedProducts){
  stockedProducts.push(product); 
 return stockedProducts ;
}

// mettre à jour le localStorage
function setLocalStorage(stockedProducts){
  localStorage.setItem("Produits",JSON.stringify(stockedProducts));
}








