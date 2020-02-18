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
                                                    <input type="button" class="minus" value="-">
                                                    <input type="number" size="4" class="input-text qty text" title="Qty" value="1" min="0" step="1">
                                                    <input type="button" class="plus" value="+">
                                                </div>
                                            </td>

                                            <td class="product-subtotal">
                                                <span class="amount">£${pizza.price}</span> 
                                            </td>
                                        </tr>`
    },

    displayPizzas : function (pizzas) {
        var pizzasHtml = "";
        //for each pizza generate the html code
        console.log("Pizzass ", pizzas);
        pizzas.forEach(pizza => pizzasHtml += Cart.getPizzaHtml(pizza));

        $(".shop_table.cart tbody") .html(pizzasHtml);
    },

    bindEvents: function () {

        $(".shop_table.cart tbody").delegate(".remove_pizza_from_cart","click",function (event) {
            event.preventDefault();

            let pizzaId = $(this).data("product_id");
            console.log("Remove pizza!!");
            Cart.removePizzaFromCart(pizzaId);
        });
    }
};

Cart.getCart();
Cart.bindEvents();