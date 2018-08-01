"use strict";
const cartList = {

  templateUrl: '../../js/templates/cartList-temp.html',

  controller: ["CartService", function(CartService) {
    const vm = this;
    vm.grandTotal=0;



  vm.getGrandTotal = () => {
      vm.grandTotal = CartService.getGrandTotal().then((response) =>{
      vm.grandTotal=response.data;
      console.log(vm.grandTotal);
    });
  };

    CartService.getAllItems().then((response) =>{
      console.log(response.data);
      vm.num = response.data[0];
      vm.cartItems = response.data;
      vm.getGrandTotal();
    });

    vm.quantityPlus = (item, $event) => {
      item.quantity++;
      vm.updateItem(item);
      // vm.getGrandTotal();
    };

    vm.quantityMinus = (item) => {
      if(item.quantity >0){
      item.quantity--;
      vm.updateItem(item);
      };
    };

    // TODO: I don't need this now that i'm not using a form i believe?
    // vm.addItem = (newItem) => {
    //   console.log("add button working");
    //   CartService.addItem(newItem).then((response) =>{
    //     vm.cartItems = response.data;
    //     console.log(vm.cartItems);
    //     vm.newItem = {};
    //   });
    //   vm.getGrandTotal();
    // };

    vm.deleteItem = (id) => {
      CartService.deleteItem(id).then((response) =>{
        vm.cartItems = response.data;
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



