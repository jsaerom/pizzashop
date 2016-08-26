// Backend Logic
function Pizza(size){
  this.size = size;
  this.standard = [];
  this.premium = [];
}

// Pizza.prototype.finalPrice = function(){
//   return this.size + (this.standard.length * 0.5) + (this.premium.length);
// }

// Frontend Logic
$("button#addOrder").click(function(){
  var pizzaSize = $("#size").val();
  var standardToppings = [];
  var premiumToppings = [];
    $("input:checkbox[name=standard]:checked").each(function(){
      standardToppings.push($(this).val());
    });
    $("input:checkbox[name=premium]:checked").each(function(){
      premiumToppings.push($(this).val());
    });
  var pizzaOrder = new Pizza(pizzaSize);
  for (var i = 0; i < standardToppings.length; i++){
    pizzaOrder.standard.push(standardToppings[i]);
  }
  console.log(pizzaOrder.standard);
  for (var i = 0; i < premiumToppings.length; i++){
    pizzaOrder.premium.push(premiumToppings[i]);
  }
  console.log(pizzaOrder.premium);


});
