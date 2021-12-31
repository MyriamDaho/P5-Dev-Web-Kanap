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

//Calculer le prix total et la quantité totale
function calculTotal(produits){
  let totalPrix = 0;
  let totalQuantité=0;
for (let element of produits) {
  totalPrix += parseFloat(element.price)* parseInt(element.quantity);
  totalQuantité += parseInt(element.quantity);
}
document.getElementById('totalPrice').textContent=totalPrix;
document.getElementById('totalQuantity').textContent=totalQuantité;
}

function updateQuantityTable(tableau, id, color,quantity)
{ 

  for( let element of tableau ) {
   
  if(element.id == id && element.color==color){
    element.quantity=parseInt(quantity);
   
  }
  }
  setLocalStorage(tableau);
}

function deleteProductFromTable(tableauProducts, id, color){

  let position =-1;
  // chercher l'element dans le tableau
  tableauProducts.forEach(element => {
   
    if(element.id == id && element.color== color)
    {
      position= tableauProducts.indexOf(element);
      // supprimer l'element du tableau
      tableauProducts.splice(position , 1);
     
    }
});


setLocalStorage(tableauProducts);
}
    

// mettre à jour le localStorage
function setLocalStorage(stockedProducts){
  localStorage.setItem("Produits",JSON.stringify(stockedProducts));
}

//affichage panier a partir du tableau du localstorage
function displayProducts(stockedProducts){
for (let element of stockedProducts) {
    document.querySelector('#cart__items').innerHTML += `<article class="cart__item" data-id="${element.id}"  data-color="${element.color}">
<div class="cart__item__img">
<img src="${element.item_image}" alt="${element.altTxtProduct}">
</div>
<div class="cart__item__content">
  <div class="cart__item__content__titlePrice">
    <h2>${element.name}</h2>
    <p>${element.color}</p>
    <p>${element.price}</p>
  </div>
  <div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity">
      <p>Qté : </p>
      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${element.quantity}">
    </div>
    <div class="cart__item__content__settings__delete">
      <p class="deleteItem">Supprimer</p>
    </div>
  </div>
</div>
</article>`;
 }

// modification des quantités
document.querySelectorAll('.itemQuantity').forEach((element) => {
  element.addEventListener('change', function (event) {
    event.stopPropagation();
    event.preventDefault();

 
    // mettre à jour la quantité dans le tableau et dans le localstorage
    updateQuantityTable(stockedProducts, this.closest(".cart__item").dataset.id, this.closest(".cart__item").dataset.color, this.value);
    stockedProducts=getLocalStorage();
    calculTotal(stockedProducts); 
   
  })
})

// suppression des articles
document.querySelectorAll('.deleteItem').forEach((element) => {
  element.addEventListener('click', function (event) {
    event.stopPropagation();
    event.preventDefault();

 
    // supprimer l'article du tableau et mettre  à jour le localstorage
    deleteProductFromTable(stockedProducts, this.closest(".cart__item").dataset.id, this.closest(".cart__item").dataset.color);
    stockedProducts=getLocalStorage();
    calculTotal(stockedProducts);
    this.closest(".cart__item").remove();
    
   
  })
})

}

let tableauProduit = getLocalStorage();
displayProducts(tableauProduit);
calculTotal(tableauProduit);
  



// --- RegEX Formulaire 
let form = document.querySelector(".cart__order__form");
// Prénom
form.firstName.addEventListener("change", function () {
validFirstName(this);
});                
const validFirstName = function (inputFirstName) {
let nameRegExp = new RegExp("^[a-zA-Z-\s].{2,20}$");
let testFirstName = nameRegExp.test(inputFirstName.value);
if (testFirstName) {
  inputFirstName.nextElementSibling.innerHTML = "";
  return true;
} else {
  inputFirstName.nextElementSibling.innerHTML = "Votre prénom doit comporter les lettres de 'a' à 'z' minimum 2 caractères et un maximum de 20 caractères!!!";
  return false;
}
};
//Nom
form.lastName.addEventListener("change", function () {
validLastName(this);
});
const validLastName = function (inputLastName) {
let nameRegExp = new RegExp("^[a-zA-Z-\s].{2,20}$");
let testLastName = nameRegExp.test(inputLastName.value);
if (testLastName) {
  inputLastName.nextElementSibling.innerHTML = "";
  return true;
} else {
  inputLastName.nextElementSibling.innerHTML = "Votre nom doit comporter les lettres de 'a' à 'z' minimum 2 caractères et un maximum de 20 caractères";
  return false;
}
};
//Adresse
form.address.addEventListener("change", function () {
validAddress(this);
});
const validAddress = function (inputAdress) {
let addressRegExp = new RegExp("^[0-9]{1,4}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+$");
let testAdress = addressRegExp.test(inputAdress.value);
if (testAdress) {
  inputAdress.nextElementSibling.innerHTML = "";
  return true;
} else {
  inputAdress.nextElementSibling.innerHTML = "Veuillez saisir une adresse valide"
}
};
//Ville
form.city.addEventListener("change", function () {
validCity(this);
});
const validCity = function (inputCity) {
let cityRegExp = new RegExp("^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$");
let testCity = cityRegExp.test(inputCity.value);
if (testCity) {
  inputCity.nextElementSibling.innerHTML = "";
  return true;
} else {
  inputCity.nextElementSibling.innerHTML = "Veuillez saisir une ville"
}
};
//email
form.email.addEventListener("change", function () {
validEmail(this);
});
const validEmail = function (inputEmail) {
let emailRegExp = new RegExp(
  "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$");
let testEmail = emailRegExp.test(inputEmail.value);

if (testEmail) {
  inputEmail.nextElementSibling.innerHTML = "";
  return true;
} else {
  inputEmail.nextElementSibling.innerHTML =
    "Veuillez saisir une adresse mail valide xxxxxxxx@xxxxx.xx";
  return false;
}
};


//envoi données vers API et notification de la commande 
const postOrder = (Order) => {
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/JSON",
    },
    body: JSON.stringify(Order),   
  })
    .then((data) => data.json())
    .then((data) => {
      const orderId = data.orderId;


//envoi la commande vers la page "confirmation.html" et  localStorage effacé
    window.location.href = "confirmation.html" + "?" + "name" + "=" + orderId;
    localStorage.clear();
     });
 };

//  validation formulaire et commmande
    const notifyOrder = () => {
    document.querySelector("#order").addEventListener("click", (event) => {
      event.preventDefault();
      if (
        validFirstName(form.firstName) &&
        validLastName(form.lastName) &&
        validAddress(form.address) &&
        validCity(form.city) &&
        validEmail(form.email)
      ) {
        const contact = {
          lastName: form.lastName.value,
          firstName: form.firstName.value,
          address: form.address.value,
          city: form.city.value,
          email: form.email.value,
        };
  
        const storage = JSON.parse(localStorage.getItem("Produits"));
  
        const products = []
        for (i = 0; i < storage.length; i++) {
          const idOrder = storage[i].id;
          products.push(idOrder);
        }
//envoi de la commande vers la page "confirmation"
        const sendOrder = {contact,products};
  
        localStorage.setItem("sendOrder", JSON.stringify(sendOrder));
  
        postOrder(sendOrder);
     
      }
    });
  };
  notifyOrder();
