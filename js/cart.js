window.Cart = {
    API_BASE_URL: "http://localhost:8085",
//response from API
    getCart: function () {
        let customerId = 22;
        $.ajax({
            url: Cart.API_BASE_URL + "/carts/" + customerId
        }).done(function (response) {
            console.log(response);
            console.log(response.pizzas);
            Cart.displayPizzas(response.pizzas);
        });
    },

    addPizzaToCart : function (pizzaId){
        var request = {
            customerId: 22,
            pizzaId: pizzaId
        };

        $.ajax({
            url: Cart.API_BASE_URL + "/carts",
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify(request)
        }).done(function () {
            window.location.replace("cart.html");
        })
    },

    removePizzaFromCart: function (pizzaId){
        var request = {
            customerId: 22,
            pizzaId: pizzaId
        };

        $.ajax({
            url: Cart.API_BASE_URL + "/carts",
            method: "DELETE",
            contentType: "application/json",
            data: JSON.stringify(request)
        }).done(function () {
            window.location.replace("cart.html");
        })
    },

    getCartTotal: function (cart) {
        return `<a href="cart.html">Cart - <span class="cart-amount">$${cart.totalPrice}</span> <i class="fa fa-shopping-cart"></i> <span class="product-count">${cart.totalQuantity}</span></a>`
    },

    getCartSubtotal: function (cart){
        return `

                                <tr class="cart-subtotal">
                                    <th>Cart Subtotal</th>
                                     <td><span class="amount">$${cart.totalPrice}</span></td>
                                        </tr>

                                        <tr class="shipping">
                                            <th>Shipping and Handling</th>
                                            <td>Free Shipping</td>
                                        </tr>

                                        <tr class="order-total">
                                            <th>Order Total</th>
                                            <td><strong><span class="amount">$${cart.totalPrice}</span></strong> </td>
                                        </tr>`
    },

    getPizzaHtml :function (pizza) {

        return `<tr class="cart_item">
                                            <td class="product-remove">
                                                <a class="remove_pizza_from_cart" data-quantity="1" data-product_sku="" data-product_id="${pizza.id}" class="remove" href="#">×</a> 
                                            </td>

                                            <td class="product-thumbnail">
                                                <a href="single-product.html"><img width="145" height="145" class="shop_thumbnail" src="${pizza.imageUrl}"></a>
                                            </td>

                                            <td class="product-name">
                                                <a href="single-product.html">${pizza.name}</a> 
                                            </td>

                                            <td class="product-price">
                                                <span class="amount">£${pizza.price}</span> 
                                            </td>

                                            <td class="product-quantity">
                                                <div class="quantity buttons_added">
                                                    <input data-product_id="${pizza.id}" type="button" class="minus" value="-">
                                                    <span type="number" class="p-2 m-2" size="4">${pizza.quantity} </span>
                                                    <input data-product_id="${pizza.id}" type="button" class="plus" value="+">
                                                </div>
                                            </td>

                                            <td class="product-subtotal">
                                                <span class="amount">£${pizza.price * pizza.quantity}</span> 
                                            </td>
                                        </tr>`
    },

    displayPizzas : function (pizzas) {
        var pizzasHtml = "";
        var cartHtml = "";
        var subtotalHtml = "";
        var totalPrice =0;
        var totalQuantity =0;

        //for each pizza generate the html code
        console.log("Pizzass ", pizzas);
        pizzas.forEach(pizza => pizzasHtml += Cart.getPizzaHtml(pizza));
        pizzas.forEach(pizza => {totalPrice += pizza.price * pizza.quantity; totalQuantity += pizza.quantity});

        cartHtml += Cart.getCartTotal({totalPrice: totalPrice  , totalQuantity: totalQuantity});
        subtotalHtml += Cart.getCartSubtotal({totalPrice: totalPrice  , totalQuantity: totalQuantity});
        $(".cart_totals tbody").html(subtotalHtml);
        $(".site-branding-area .shopping-item:first-child").html(cartHtml);
        $(".shop_table.cart tbody") .html(pizzasHtml);
    },

    bindEvents: function () {

        $(".shop_table.cart tbody").delegate(".remove_pizza_from_cart", "click", function (event) {
            event.preventDefault();

            let pizzaId = $(this).data("product_id");
            console.log("Remove pizza!!");
            Cart.removePizzaFromCart(pizzaId);
        });

        $(".shop_table.cart tbody").delegate(".minus", "click", function (event) {
            event.preventDefault();

            let pizzaId = $(this).data("product_id");
            console.log("Minus pizza!!");
            Cart.removePizzaFromCart(pizzaId);
        });

        $(".shop_table.cart tbody").delegate(".plus", "click", function (event) {
            event.preventDefault();

            let pizzaId = $(this).data("product_id");
            console.log("Plus pizza!!");
            Cart.addPizzaToCart(pizzaId);
        });
    }
};

Cart.getCart();
Cart.bindEvents();