import { auth, signOut  } from "./firebaseConfig.js";


window.onload = function () {
    let productsContainer = JSON.parse(localStorage.getItem('productsList'))
    if(productsContainer){
        var viewproduct = ``
        for (var i = 0; i < productsContainer.length; i++) {
        console.log(productsContainer[i].id)
      viewproduct += `
            <div class="col-4 box-container" id="${productsContainer[i].id}">
           <img src="${productsContainer[i].image}" alt="${productsContainer[i].desc}">
           <h5 class="product_name">${productsContainer[i].code}</h5>
           <h6>${productsContainer[i].category}</h6>
           <p>${productsContainer[i].desc}</p>
           <div class="rating">
               <i class="fa fa-star"></i>
               <i class="fa fa-star"></i>
               <i class="fa fa-star"></i>
               <i class="fa fa-star"></i>
               <i class="fa fa-star-o"></i>
           </div>
           <p class="price_name"> ${productsContainer[i].price}</p>
           <div>
            <button type="button" class="btn cart-btn">
              <i class="fa fa-shopping-cart"></i> Add To Cart
            </button>
          </div>
       </div>    
               `
            }
        document.getElementById('showData').innerHTML = viewproduct;
    }

    addProductToCart();
  }

// Add Product to Cart
function addProductToCart(){
document.querySelectorAll(".cart-btn").forEach((btn, i) => {
    let boxContainer = document.querySelectorAll(".box-container")[i];
    console.log(boxContainer.id)
    btn.addEventListener("click", () => {
        let boxContainer = document.querySelectorAll(".box-container")[i];
        // Check first if user logged In
        if (sessionStorage.getItem("user-info")) {
            let user = JSON.parse(sessionStorage.getItem("user-info"));
            let userId = user.id;
            let userName = user.userName;
            let cart = JSON.parse(localStorage.getItem('cart')) || {};
            
            if (!cart[userId]) {
                cart[userId] = {
                    userName: userName,
                    products: []
                };
            }

            // make assoicted Array with logged in user Id

            let productsList = JSON.parse(localStorage.getItem("productsList"))

            for(let prod of productsList){
               if(prod.id === boxContainer.id){
                cart[userId].products.push({
                    id: boxContainer.id,
                    image: prod.image,
                    title: prod.code,
                    price: prod.price,
                    status:"waiting"
                });
                alert(`${prod.code} Added to Cart`)
               }
            }
            
       
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    });

});
}



// check if user Logged in or not
if(sessionStorage.getItem("user-info")){
    document.getElementById("loginBtn").style.display = "none";
    document.getElementById("logOutBtn").style.display = "block";
}else{
    document.getElementById("cart").style.display = "none";
    document.getElementById("logOutBtn").style.display = "none";
}


// Logging Out function
document.getElementById("logOutBtn").addEventListener("click",()=>{
    console.log("click")
    signOut(auth).then(() => {
        alert("logging out")
        sessionStorage.removeItem("user-info");
        window.location.reload()
      }).catch((error) => {
        console.log(error);
      });
});


