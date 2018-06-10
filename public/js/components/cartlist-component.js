"use strict";
const cartList = {
  // TODO: Create a template to display all the students from this class
  template: `
 <my-store></my-store>
  <section class="shoppingCart">
  <h2 class="sectionHeader">My cart</h2>
  <p class="grandTotal">Grand Total: {{$ctrl.grandTotal |currency}}</p>
    <section class="shoppingCart__item"ng-repeat="item in $ctrl.cartItems">
    <div class="shoppingCart_product">
      <img class="shoppingCart_img" src="{{item.img_url}}">
      <div class="shoppingCart__item__line">
        <p>{{item.product}}</p>    
        <p>{{item.price | currency}} each</p>
        
      </div>

      <i ng-click="$ctrl.deleteItem(item.id);" class="fas fa-times-circle deleteButton"></i>

    </div>
    <p class="itemTotal">{{item.price*item.quantity | currency}} total</p>
    <div class="shoppingCart_quantity">
        <p ng-click="$ctrl.quantityMinus(item)"><i class="fas fa-minus"></i></p>
        <p>{{ item.quantity}}</p>
        <p ng-click="$ctrl.quantityPlus(item); $ctrl.changeColor($event);"><i class="fas fa-plus"></i></p>
    </div>


    </section>
  </section>

  <form class="addItemForm dark-primary-color" ng-submit="$ctrl.addItem($ctrl.newItem);">
    <h2 class="sectionHeader">Add Item</h2>
    <section class="shoppingCart__item">

    <div class="addItem__line">
      <label>Product: </label>
      <input ng-model="$ctrl.newItem.product">
     </div>   

    <div class="addItem__line">
      <label>Price: </label> 
      <input ng-model="$ctrl.newItem.price">
    </div> 

    <div class="addItem__line">
      <label>Quantity: </label> 
      <input ng-model="$ctrl.newItem.quantity">
    </div>
      <button><i class="fas fa-shopping-cart addButton"></i></button>
    </section>
  </form>
 
  `,
  controller: ["CartService", function(CartService) {
    const vm = this;
    vm.grandTotal=0;

    vm.getGrandTotal = () => {
      vm.grandTotal=0;
      for (let item of vm.cartItems){
        vm.grandTotal += (item.price * item.quantity);
      };
      console.log(vm.grandTotal);
      
    };
    
    CartService.getAllItems().then((response) =>{
      console.log(response.data);
      vm.cartItems = response.data;
      vm.getGrandTotal();
    });

    vm.quantityPlus = (item, $event) => {
      item.quantity++;
      vm.updateItem(item);
      
    };

    vm.quantityMinus = (item) => {
      console.log("quantity- working in controller");
      if(item.quantity >0){
      item.quantity--;
      vm.updateItem(item);
      };
    };

    vm.addItem = (newItem) => {
      console.log("add button working");
      CartService.addItem(newItem).then((response) =>{
        vm.cartItems = response.data;
        console.log(vm.cartItems);
        vm.newItem = {};
      });
      vm.getGrandTotal();
    };

    vm.deleteItem = (id) => {    
      CartService.deleteItem(id).then((response) =>{
        vm.cartItems = response.data;
        console.log(vm.cartItems);
      });
      vm.getGrandTotal();
    };

    vm.updateItem = (item) => {
      CartService.updateItem(item).then((response) =>{
        vm.cartItems = response.data;
        vm.getGrandTotal();
      });
    };
  }]
};

angular
  .module("App")
  .component("cartList", cartList);



    