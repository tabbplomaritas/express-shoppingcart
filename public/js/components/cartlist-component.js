"use strict";
const cartList = {
  // TODO: Create a template to display all the students from this class
  template: `
  <section class="shoppingCart accent-color">
    <div class="shoppingCart__item"ng-repeat="item in $ctrl.cartItems">
      <label>Product: </label>
      <input ng-blur="$ctrl.updateItem(item);" ng-model="item.product">
      
      <label>Price: </label> 
      <input ng-blur="$ctrl.updateItem(item);" ng-model="item.price">
      
      <label>Quantity: </label> 
      <input ng-blur="$ctrl.updateItem(item);" ng-model="item.quantity">
      <i ng-click="$ctrl.deleteItem(item.id);" class="fas fa-times-circle"></i>
    </div>
  </section>

  <form ng-submit="$ctrl.addItem($ctrl.newItem);">
    <h2>Add Item</h2>
    <label>Product: </label>
      <input ng-model="$ctrl.newItem.product">
      
      <label>Price: </label> 
      <input ng-model="$ctrl.newItem.price">
      
      <label>Quantity: </label> 
      <input ng-model="$ctrl.newItem.quantity">

    <button>Add Item</button>
  </form>
  `,
  controller: ["CartService", function(CartService) {
    const vm = this;
    // TODO Call the StudentService to retrieve the list of the students
    CartService.getAllItems().then((response) =>{
      console.log(response);
      vm.cartItems = response.data;
    });
    vm.addItem = (newItem) => {
      console.log("add button working");
      CartService.addItem(newItem).then((response) =>{
        vm.cartItems = response.data;
        console.log(vm.cartItems);
      });
    };

    vm.deleteItem = (id) => {
      console.log("delete button working");
      console.log(id);
      
      CartService.deleteItem(id).then((response) =>{
        vm.cartItems = response.data;
        console.log(vm.cartItems);
      });
    };

    vm.updateItem = (item) => {
      console.log("delete button working");
      CartService.updateItem(item).then((response) =>{
        vm.cartItems = response.data;
        console.log(vm.cartItems);
      });
    };
  }]
};

angular
  .module("App")
  .component("cartList", cartList);