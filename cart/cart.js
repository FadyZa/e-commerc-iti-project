let cartCount = document.getElementById("shoppingCartCount");
let totalPrice = document.getElementById("total");
let cartsContainer = document.querySelector(".carts");


window.onload = function () {
    if (localStorage.getItem("cart") && sessionStorage.getItem("user-info")) {
        let data = JSON.parse(localStorage.getItem("cart"));
        let user = JSON.parse(sessionStorage.getItem("user-info")) ;
        let currUserCart = data[user.id];
        let currUserProducts = currUserCart.products;
        let placeAllBtn =  document.getElementById("placeAll");
        let total = 0;
        cartCount.innerHTML = `(${currUserProducts.length})`;


        console.log(`User ID: ${user.id}, User Name: ${currUserCart.userName}`);
        document.getElementById("welcome").innerText = `Welcome, ${currUserCart.userName}`
        currUserProducts.forEach(product => {
            cartsContainer.innerHTML += `<div class="cart-container" id="cart-container-${product.id}">
            <div class="cart">
                <div class="image">
                    <img src="${product.image}">
                </div>
                <div class="cart-info">
                    <h2>${product.title}</h2>
                    <div class="price">
                        <span class="prodPrice">${product.price} L.E</span>
                    </div>
                    <p class="shipping"><i></i> free shipping</p>
                </div>
            </div>
            <div class="btns">

            ${product.status === 'waiting' ? 
            `<button data-prodid="${product.id}" class="place"><i class="fa-solid fa-cart-plus"></i>Place Order</button>  
            <button id="${product.id}" class="delete-btn"><i class="fa-solid fa-delete-left"></i>delete</button>
            ` : ''}
            <hr>
            <p class="status">Status: ${product.status}</p>
            </div>
        </div>`;
        // calc the total price of all products in cart
        total += parseInt(product.price);

        
    });
    totalPrice.innerText = `${total}$`;

        
        // //////////////////////////////////
        // Place All orders
        document.getElementById("placeAll").addEventListener("click",(e)=>{
            cartStatus = document.querySelectorAll(".status");
            currUserProducts.forEach((product,i)=>{
                product.status = "pending";
                cartStatus[i].innerText = `Status: ${product.status}`;
            })
            CheckIsPlaced();
            localStorage.setItem("cart", JSON.stringify(data));
        });


        // check if all products are placed
        function CheckIsPlaced(){
            let isAllPlaced = currUserProducts.every((prod)=>prod.status !== "waiting");
            if(isAllPlaced){
                placeAllBtn.innerText = "All Products Placed";
                placeAllBtn.style.backgroundColor = "gray";
                placeAllBtn.style.cursor = "not-allowed";
                document.querySelectorAll(".place").forEach((placeBtn)=>{
                    placeBtn.remove();
                })
            }
        }

        CheckIsPlaced();



        // ////////////////////////
        cartsContainer.addEventListener("click", (e) => {
            // delete product
            if (e.target.classList.contains("delete-btn")) {
                let btn = e.target;
                // loop over indexes in products array
                for (let prodIndx in currUserProducts ) {
                    if (currUserProducts[prodIndx].id === btn.id) {
                        currUserProducts.splice(prodIndx, 1)
                    }
                }
                // update the local storage
                localStorage.setItem("cart", JSON.stringify(data));

                // sub the price of delted product from total price checkout
                let productPrice = document.querySelector(`#cart-container-${btn.id} .prodPrice`).innerText;
                total -= parseInt(productPrice);
                totalPrice.innerHTML = `${total} USD`;

                // update the shopping cart count
                cartCount.innerHTML = currUserProducts.length;  

                // remove the deleted product from the dom
                document.getElementById(`cart-container-${btn.id}`).remove();
            }


            // place oredr
            if (e.target.classList.contains("place")) {
                let btn = e.target;
                for (let prod of currUserProducts ) {
                    if (prod.id === btn.dataset.prodid) {
                        prod.status = "pending";
                    }
                }
                btn.remove();
                document.getElementById(`cart-container-${btn.dataset.prodid}`).querySelector(".status").innerHTML = "status: pending";
                CheckIsPlaced();
                localStorage.setItem("cart", JSON.stringify(data));
            }


        })

    } else {
        cartCount.innerHTML = `<p style="text-align:center;margin-top: 100px;background-color: #8080FF;color: #fff;padding: 20px;">No Product Here</p>`;
    }

}

