"use strict";
const cartList = {
  // TODO: Create a template to display all the students from this class
  template: `
  <h1>Express Shopping Cart</h1>

  <section class="shoppingCart"></section>
    <div ng-repeat="item in $ctrl.cartItems">
      <label>Product: </label>
      <input ng-blur="$ctrl.updateItem(item);" ng-model="item.product">
      
      <label>Price: </label> 
      <input ng-blur="$ctrl.updateItem(item);" ng-model="item.price">
      
      <label>Quantity: </label> 
      <input ng-blur="$ctrl.updateItem(item);" ng-model="item.quantity">
      <button ng-click="$ctrl.deleteItem(item.id);">Delete Item</button>
    </div>
  </section>

  <form>

    <button ng-click="$ctrl.addItem($ctrl.newItem);">Add Item</button>
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