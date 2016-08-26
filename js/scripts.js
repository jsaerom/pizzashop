// Backend Logic
function Pizza(size){
  this.size = size;
  this.standard = [];
  this.premium = [];
  this.price = 0;
}

function Order(){
  this.pizza = [];
}

function Customer(name, street, city, state, phone){
  this.name = name;
  this.street = street;
  this.city = city;
  this.state = state;
  this.phone = phone;
}

Customer.prototype.fullAddress = function(){
  return this.street + ", " + this.city + ", " + this.state;
}

Pizza.prototype.pizzaPrice = function(){
  var total = 0;
  if (this.size === "Small"){
    total += 6;
  } else if (this.size === "Medium"){
    total += 7;
  } else {
    total += 8;
  }
  this.price = (total + (this.standard.length * 0.5) + (this.premium.length)).toFixed(2);
}

Order.prototype.addOrderCost = function(){
  var totalCost = 0;
  for (var i = 0; i < this.pizza.length; i++){
    totalCost += parseFloat(this.pizza[i].price);
    return totalCost;
  }
}


// Frontend Logic
function appendOrder(size, standard, premium, total){
  $("ul").append("<li><strong>Pizza Size:</strong> " + size + "; "
                + "<strong>Standard Toppings:</strong> " + standard.toString() +
                "; <strong>Premium Toppings:</strong> " + premium.toString() +
               "<strong> Pizza Total:</strong> $" + total + "</li>");
}
var newOrder = new Order();

$("button#addOrder").click(function(){
  var pizzaSize = $("#size").val();
  var standardToppings = [];
  var premiumToppings = [];
  var pizzaOrder = new Pizza(pizzaSize);

  $("input:checkbox[name=standard]:checked").each(function(){
    standardToppings.push($(this).val());
  });
  $("input:checkbox[name=premium]:checked").each(function(){
    premiumToppings.push($(this).val());
  });
  for (var i = 0; i < standardToppings.length; i++){
    pizzaOrder.standard.push(standardToppings[i]);
  }
  for (var j = 0; j < premiumToppings.length; j++){
    pizzaOrder.premium.push(premiumToppings[j]);
  }
  pizzaOrder.pizzaPrice();
  newOrder.pizza.push(pizzaOrder);
  appendOrder(pizzaOrder.size, pizzaOrder.standard, pizzaOrder.premium, pizzaOrder.price);

  $("button#submitOrder").click(function(){
    $(".orderMenu").hide();
    $(".orderConfirmation").show();
    $(".total").text("$" + newOrder.addOrderCost());
  });
});
$("button#orderComplete").click(function(){
  var customerName = $("input#customerName").val();
  var customerStreet = $("input#addressStreet").val();
  var customerCity = $("input#addressCity").val();
  var customerState = $("input#addressState").val();
  var customerPhone = $("input#customerPhone").val();
  var newCustomer = new Customer(customerName, customerStreet, customerCity, customerState, customerPhone);
  $(".address").text(newCustomer.fullAddress());
  $(".orderConfirmation").hide();
  $(".confirmationPage").show();
});
