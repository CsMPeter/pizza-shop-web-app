window.Shop = {
    API_BASE_URL: "http://localhost:8085",
//response from API
    getPizzas: function () {
        $.ajax({
            url: Shop.API_BASE_URL + "/pizzas"
        }).done(function (response) {
            console.log(response);

            Shop.displayPizzas(response.content);
        });
    },

    addPizzaToCart : function (pizzaId){
      var request = {
          customerId: 22,
          pizzaId: pizzaId
      };

      $.ajax({
          url: Shop.API_BASE_URL + "/carts",
          method: "PUT",
          contentType: "application/json",
          data: JSON.stringify(request)
      }).done(function () {
          window.location.replace("cart.html");
      })
    },

    getPizzaHtml :function (pizza) {

        return `<div class="col-md-3 col-sm-6">
                    <div class="single-shop-product">
                        <div class="product-upper">
                            <img src="${pizza.imageUrl}" alt="">
                        </div>
                        <h2><a href="">${pizza.name}</a></h2>
                        <div class="product-carousel-price">
                            <ins>$${pizza.price}</ins> 
                        </div>  
                        
                        <div class="product-option-shop">
                            <a class="add_to_cart_button" data-quantity="1" data-product_sku="" data-product_id="${pizza.id}" rel="nofollow" href="/canvas/shop/?add-to-cart=70">Add to cart</a>
                        </div>                       
                    </div>
                </div>`
    },

    displayPizzas : function (pizzas) {
        var pizzasHtml = "";
        //for each pizza generate the html code
        pizzas.forEach(pizza => pizzasHtml += Shop.getPizzaHtml(pizza));

        $(".single-product-area .row:first-child") .html(pizzasHtml);
    },

    bindEvents: function () {

        $(".single-product-area").delegate(".add_to_cart_button","click",function (event) {
            event.preventDefault();

            let pizzaId = $(this).data("product_id");

            Shop.addPizzaToCart(pizzaId);
        });
    }
};

Shop.getPizzas();
Shop.bindEvents();