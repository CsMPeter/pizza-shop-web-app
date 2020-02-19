window.Product = {
    API_BASE_URL: "http://localhost:8085",
//response from API

    getPizza: function (pizzaId) {
        $.ajax({
            url: Product.API_BASE_URL + "/pizzas"
        }).done(function (response) {
            Product.displayPizza(response.content, pizzaId);
        })
    },

    getPizzaHtml :function (pizza) {

        return `<div class="col-md-8">
                    <div class="product-content-right">
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="product-images">
                                    <div class="product-main-img">
                                        <img src="${pizza.imageUrl}" alt="">
                                    </div>
                                </div>
                            </div>
                            
                            <div class="col-sm-6">
                                <div class="product-inner">
                                    <h2 class="product-name">${pizza.name}</h2>
                                    <div class="product-inner-price">
                                        <ins>$${pizza.price}</ins>
                                    </div>    
                                    
                                    <form action="" class="cart">
                                        <button class="add_to_cart_button" data-product_id="${pizza.id}" type="submit">Add to cart</button>
                                    </form>   

                                    <div class="product-inner-category">
                                        Ingredients: <p> ${pizza.ingredients}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>                    
                </div>`
    },
    getCartTotal: function (cart) {
        return ` <a href="cart.html">Cart - <span class="cart-amunt">$${cart.totalPrice}</span> <i class="fa fa-shopping-cart"></i> <span class="product-count">${cart.totalQuantity}</span></a> `
    },
    displayPizza : function (pizzas, id) {
        var pizzasHtml = "";
        var totalPrice = 0;
        var totalQuantity = 0;
        var cartHtml = "";
        var pizza = pizzas.filter( p => p.id == id);
        console.log("Pizza", pizza);

        pizzasHtml += Product.getPizzaHtml(pizza[0]);
        //pizzas.forEach(pizza => { totalPrice += pizza.price * pizza.quantity; totalQuantity += pizza.quantity});

        cartHtml += Product.getCartTotal({totalPrice: totalPrice  , totalQuantity: totalQuantity});

        //$(".site-branding-area .shopping-item") .html(cartHtml);
        $(".single-product-area .row:first-child") .html(pizzasHtml);
    },

    bindEvents: function () {

        $(".single-product-area").delegate(".add_to_cart_button","click",function (event) {
            event.preventDefault();

            let pizzaId = $(this).data("product_id");
            window.Shop.addPizzaToCart(pizzaId);
        });

        $(".single-product-area").delegate(".seePizza","click",function (event) {
            event.preventDefault();

            let pizzaId = $(this).data("product_id");
            //Product.getPizza(pizzaId);
        });
    },
};

Product.bindEvents();