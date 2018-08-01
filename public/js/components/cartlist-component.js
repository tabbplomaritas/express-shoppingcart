"use strict";
const cartList = {

  templateUrl: '../../js/templates/cartList-temp.html',

  controller: ["CartService", function(CartService) {
    const vm = this;
    vm.grandTotal=0;



  vm.getGrandTotal = () => {
      vm.grandTotal = CartService.getGrandTotal().then((response) =>{
      vm.grandTotal=response.data;
    });
  };

    CartService.getAllItems().then((response) =>{
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



