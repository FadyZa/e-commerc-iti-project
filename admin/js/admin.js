var productIdInput = document.getElementById('productid')
var productNameInput = document.getElementById('productname');
var productPriceInput = document.getElementById('productprice');
var productCategoryInput = document.getElementById('productcategory');

var productDescInput = document.getElementById('productdesc');

var productImageInput = document.getElementById('productimg');
var searchInput = document.getElementById('searchInput')
var addBtn = document.getElementById('addBtn')
var updateBtn =document.getElementById('updateBtn')

var productsContainer;
if (localStorage.getItem('productsList') == null) {
  // zbon gdid
  productsContainer = [];
} else {
  productsContainer = JSON.parse(localStorage.getItem('productsList'))
  displayProducts()
}
function addProduct() {
  var product = {
    id: productIdInput.value,
    code: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    desc: productDescInput.value,
    image: `../images/${productImageInput.files[0]?.name}`
  }
  productsContainer.push(product);
  localStorage.setItem('productsList', JSON.stringify(productsContainer))

  clearForm();
  displayProducts();
  console.log(product);
}


function clearForm() {
  productIdInput.value = null;
  productNameInput.value = null;
  productPriceInput.value = null;
  productCategoryInput.value = null;
  productDescInput.value = null;
  productImageInput.value = null;
}





function displayProducts() {
  var cartoona = ``
  for (var i = 0; i < productsContainer.length; i++) {

    cartoona += `<div class="product col-md-2 col-sm-6">
    <div class="card  border-0">
             <img src="${productsContainer[i].image}"     class ="card-img-top"    alt="product">

        <div class="card-body">
            <h2 class="h4 mt-3"><span class="fw-bolder">Id:</span>${[i]}</h2>
            <h2 class="h5 mt-3">${productsContainer[i].code}</h2>
            <p class="text-secondary md-2">${productsContainer[i].desc}</p>
            <h2 class="h4 mt-3"><span class="fw-bolder">Price:</span>${productsContainer[i].price}</h2>
            <h2 class="h4 mt-3"><span class="fw-bolder">Category:</span>${productsContainer[i].category}</h2>
            <button onclick="deleteProducts(${i})" class="btn btn-outline-danger btn-sm my-2">Delete <i class="fas fa-trash"></i></button>
            <button onclick="setFormForUpdate(${i})"class="btn btn-outline-secondary btn-sm my-2">Update <i class="fas fa-pen"></i></button>
        </div>
    </div>
    </div>`;
}
document.getElementById('rowData').innerHTML = cartoona;

}

  



function searchProducts() {
  var term = searchInput.value.toLowerCase();
  var cartoona = ``;

  for (var i = 0; i < productsContainer.length; i++) {
    if (productsContainer[i].code.toLowerCase().includes(term)) {
      cartoona += `<div class="  product   col-md-2 col-sm-6">
          <div class="card  border-0">
                   <img src="${productsContainer[i].image}"     class ="card-img-top"    alt="product">

              <div class="card-body">
                        <h2 class="h4 mt-3"> <span class="fw-bolder">Id:</span>${[i]}</h2>

                  <h2 class="h5 mt-3">${productsContainer[i].code}</h2>
                  <p class="text-secondary md-2">${productsContainer[i].desc}</p>
                  <h2 class="h4 mt-3"><span class="fw-bolder">Price:</span>${productsContainer[i].price}</h2>
                  <h2 class="h4 mt-3"><span class="fw-bolder">Category:</span>${productsContainer[i].category}</h2>
                  <button onclick="deleteProducts(${i})" class="btn btn-outline-danger btn-sm my-2">Delete <i class="fas fa-trash"></i></button>
                  <button onclick="setFormForUpdate(${i})"      class="btn btn-outline-warning btn-sm my-2">Update <i class="fas fa-pen"></i></button>
              </div>
          </div>
          </div>`;
    }
  }
  document.getElementById('rowData').innerHTML = cartoona;
}






function deleteProducts(index) {
  productsContainer.splice(index, 1)
  displayProducts()
  localStorage.setItem('productsList', JSON.stringify(productsContainer))
}




var updatedIndex;

function setFormForUpdate(i) {
 updatedIndex=i;

  addBtn.classList.add('d-none');
  updateBtn.classList.remove('d-none');
  productIdInput.value=productsContainer[i].id;
  productNameInput.value=productsContainer[i].code;
  productPriceInput.value=productsContainer[i].price;
  productCategoryInput.value=productsContainer[i].category;
  productDescInput.value=productsContainer[i].desc;
  productImageInput.value=productsContainer[i].image;

}

function updateProduct() {  
  addBtn.classList.remove('d-none');
  updateBtn.classList.add('d-none');

  productsContainer[updatedIndex].id=productIdInput.value;
  productsContainer[updatedIndex].code=productNameInput.value;
  productsContainer[updatedIndex].price=productPriceInput.value;
  productsContainer[updatedIndex].category=productCategoryInput.value;
  productsContainer[updatedIndex].desc=productDescInput.value;
  productsContainer[updatedIndex].image=productImageInput.value;

  displayProducts();
  localStorage.setItem('productsList', JSON.stringify(productsContainer))
  clearForm();

}


function validateInput(element) {
  var regex = {
      // productid: /^[0-9]+$/,
      productname: /^[a-zA-Z][a-zA-Z\s-]{2,}$/,
      productprice: /^[0-9]{2,7}$/,
      productcategory: /^(mobile|tv|watches|tap|labtob|airpods|other)$/,
      productdesc: /^[a-zA-Z][a-zA-Z\s-]{2,}$$/
  };

  var alertElement = element.nextElementSibling;

  if (regex[element.id].test(element.value)) {
      element.classList.add('is-valid');
      element.classList.remove('is-invalid');
      alertElement.classList.remove('d-block');
      alertElement.classList.add('d-none');
      return true;
  } else {
      element.classList.add('is-invalid');
      element.classList.remove('is-valid');
      alertElement.classList.remove('d-none');
      alertElement.classList.add('d-block');
      return false;
  }
}


// //////////////////////////////////////////////////


// Get Orders Function
window.onload = function () {
  if(localStorage.getItem("cart")){
      const tableBody = document.getElementById("tableBody");
      console.log(tableBody)
      let cart = JSON.parse(localStorage.getItem("cart"));

      Object.keys(cart).forEach((userId)=>{
          for(let prod of cart[userId].products){
            // only show placed orders
            if(prod.status === "pending"){
              tableBody.innerHTML += `
                      <tr class="products" id="${userId}${prod.id}" >
                              <td>${userId}</td>
                              <td>${cart[userId].userName}</td>
                              <td>${prod.id}</td>
                              <td class="product"><img src="${prod.image}">${prod.title}</td>
                              <td>${prod.price}</td>
                              <td>
                                  <button class="accept btn btn-primary" data-userId=${userId} data-prodId="${prod.id}">Accept</button>
                                  <button class="reject btn btn-danger" data-userId=${userId} data-prodId="${prod.id}">Reject</button>
                              </td>
                      </tr>
              `
            }
          }
      })
  
    
          tableBody.addEventListener("click",(e)=>{
              let cart = JSON.parse(localStorage.getItem("cart"));

            // accept or reject orders and only change waititng products (do not affect on accepted or rejects ones)
              if(e.target.classList.contains("accept")){
                  let prodId = e.target.dataset.prodid
                  let userId = e.target.dataset.userid;
                  for(let prod of cart[userId].products){
                      if(prod.id === prodId){
                          console.log(prod);
                          prod.status = "Completed";
                          alert("Product Accepted Succussfully")
                      }
                  }
                  document.getElementById(`${userId}${prodId}`).remove();
              }

              if(e.target.classList.contains("reject")){
                let prodId = e.target.dataset.prodid
                let userId = e.target.dataset.userid;
                for(let prod of cart[userId].products){
                    if(prod.id === prodId){
                        console.log(prod);
                        prod.status = "reject"
                        alert("Product Rejected Succussfully")
                    }
                }
                document.getElementById(`${userId}${prodId}`).remove();
            }
             localStorage.setItem("cart",JSON.stringify(cart));
          })
  }
  }



























































