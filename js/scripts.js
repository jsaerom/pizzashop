// Backend Logic
function Pizza(size){
  this.size = size;
  this.standard = [];
  this.premium = [];
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
  return (total + (this.standard.length * 0.5) + (this.premium.length)).toFixed(2);
}

// function totalPrice

// Frontend Logic
function appendOrder(size, standard, premium, total){
  $("ul").append("<li>Pizza Size: " + size + "; " + "Standard Toppings: " + standard.toString() + "; Premium Toppings: " + premium.toString() + "Pizza Total: $" + total + "</li>");
}


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
  appendOrder(pizzaOrder.size, pizzaOrder.standard, pizzaOrder.premium, pizzaOrder.pizzaPrice());
  // $(".total").text(totalPrice());


});
