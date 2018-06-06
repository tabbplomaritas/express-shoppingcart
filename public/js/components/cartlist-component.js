"use strict";
const cartList = {
  // TODO: Create a template to display all the students from this class
  template: `
  <section class="shoppingCart accent-color">
  <h2 class="sectionHeader">My cart</h2>
    <section class="shoppingCart__item"ng-repeat="item in $ctrl.cartItems">

      <div class="shoppingCart__item__line">
        <label>Product: </label>
        <input ng-blur="$ctrl.updateItem(item);" ng-model="item.product">
      </div>

      <div class="shoppingCart__item__line">
        <label>Price: </label> 
        <input ng-blur="$ctrl.updateItem(item);" ng-model="item.price">
      </div>
      <div class="shoppingCart__item__line">
        <label>Quantity: </label> 
        <input ng-blur="$ctrl.updateItem(item);" ng-model="item.quantity">
      </div> 
        <i ng-click="$ctrl.deleteItem(item.id);" class="fas fa-times-circle deleteButton"></i>
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



    