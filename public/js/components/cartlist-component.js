"use strict";
const cartList = {
  // TODO: Create a template to display all the students from this class
  template: `
  <section ng-repeat="item in $ctrl.cartItems">
  <label>Product: </label>
   <input ng-model="item.product">
  <label>: </label> 
   <input ng-model="item.price">
   <input ng-model="item.quantity">
   <button ng-click="$ctrl.deleteItem(item.id);">Delete Item</button>
  </section>

  <button ng-click="$ctrl.addItem($ctrl.newItem);">Add Item</button>
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

    vm.updateItem = (id) => {
      console.log("delete button working");
      CartService.deleteItem(id).then((response) =>{
        vm.cartItems = response.data;
        console.log(vm.cartItems);
      });
    };
  }]
};

angular
  .module("App")
  .component("cartList", cartList);