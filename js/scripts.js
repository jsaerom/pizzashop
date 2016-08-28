// Backend Logic
function CustomPizza(name, size){
  this.name = name;
  this.size = size;
  this.standard = [];
  this.premium = [];
  this.price = 0;
}
function Order(){
  this.pizza = [];
  this.otherOrder = [];
  this.confirmation = 0;
}
// function OtherOrder(){
//   this.name = name;
//   this.price = 0;
// }
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


CustomPizza.prototype.pizzaPrice = function(){
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
  var totalCustomPizza = 0;
  var totalOtherItem = 0;
  for (var i = 0; i < this.pizza.length; i++){
    totalCustomPizza += parseFloat(this.pizza[i].price);
  }
  for (var j = 0; j < this.otherOrder.length; j++){
    totalOtherItem += parseFloat(this.otherOrder[j].price);
  }
  return totalCost + totalOtherItem;
}


Order.prototype.otherItemPrice = function(){
  var total = 0;
  var name
  for (var i = 0; i < this.otherOrder.length; i++){
    if (input:checkbox[name*='setPizza']){
      total = 10;
    } else if (input:checkbox[name*='setPasta']){
      total = 11;
    } else if (input:checkbox[name*='setDessert']){
      total = 4;
    }
  }
  return total;
}

// Frontend Logic
function appendOrder(name, size, standard, premium, total){
  if ((standard.length === 0) && (premium.length === 0)){
    $("ul").append("<li>" + name + "<br><strong>Pizza Size:</strong> " + size +
                  "<br>No Toppings" +
                  "<br><strong>Pizza Total:</strong> $" + total + "</li>");
  } else if ((standard.length === 0) && (premium.length > 0)){
    $("ul").append("<li>" + name + "<br><strong>Pizza Size:</strong> " + size +
                  "<br><strong>Premium Toppings:</strong> " + premium.join(" & ") +
                 "<br><strong>Pizza Total:</strong> $" + total + "</li>");
  } else if ((standard.length > 0) && (premium.length === 0)){
    $("ul").append("<li>" + name + "<br><strong>Pizza Size:</strong> " + size +
                  "<br><strong>Standard Toppings:</strong> " + standard.join(" & ") +
                 "<br><strong>Pizza Total:</strong> $" + total + "</li>");
  } else{
    $("ul").append("<li>" + name + "<br><strong>Pizza Size:</strong> " + size +
                   "<br><strong>Standard Toppings:</strong> " + standard.join(" & ") +
                   "<br><strong>Premium Toppings:</strong> " + premium.join(" & ") +
                  "<br><strong>Pizza Total:</strong> $" + total + "</li>");
  }
}

$("#customPizzaToggle").hide();
$("input#customizedPizza").click(function(){
  $("#customPizzaToggle").toggle();
});




var newOrder = new Order();
$("button#addOrder").click(function(){
  var pizzaSize = $("#size").val();

  var standardToppings = [];
  var premiumToppings = [];
  var pizzaOrder = new CustomPizza("Custom Pizza", pizzaSize);
  var otherItem = [];

  $("input:checkbox[name=standard]:checked").each(function(){
    standardToppings.push($(this).val());
  });
  $("input:checkbox[name=premium]:checked").each(function(){
    premiumToppings.push($(this).val());
  });
  $("input:checkbox[name=setPizza]:checked").each(function(){
    otherItem.push($(this).val());
  });
  $("input:checkbox[name=setPasta]:checked").each(function(){
    otherItem.push($(this).val());
  });
  $("input:checkbox[name=setDessert]:checked").each(function(){
    otherItem.push($(this).val());
  });
  for (var i = 0; i < standardToppings.length; i++){
    pizzaOrder.standard.push(standardToppings[i]);
  }
  for (var j = 0; j < premiumToppings.length; j++){
    pizzaOrder.premium.push(premiumToppings[j]);
  }
  for (var k = 0; k < otherItem.length; k++){
    newOrder.otherOrder.push(otherItem[k]);
  }
  console.log(newOrder.otherItemPrice());


  pizzaOrder.pizzaPrice();
  newOrder.pizza.push(pizzaOrder);
  console.log(newOrder);
  appendOrder("Custom Pizza", pizzaOrder.size, pizzaOrder.standard, pizzaOrder.premium, pizzaOrder.price);
  // $(".total").text("$" + newOrder.addOrderCost().toFixed(2));

  document.getElementById("pizzaOrderMenu").reset();
  document.getElementById("customPizzaCreator").reset();
  document.getElementById("pastaOrderMenu").reset();
  document.getElementById("dessertOrderMenu").reset();
  $("button#submitOrder").click(function(){
    $(".orderMenu").hide();
    $(".orderConfirmation").show();
    $(".total").text("$" + newOrder.addOrderCost().toFixed(2));
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
  newOrder.confirmation = Math.floor(Math.random()*1000000)
  $("#confirmationNumber").text(newOrder.confirmation);
  $(".orderConfirmation").hide();
  $(".confirmationPage").show();
});
