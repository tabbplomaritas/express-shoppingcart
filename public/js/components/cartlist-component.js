"use strict";
const cartList = {

  templateUrl: '../../js/templates/cartList-temp.html',

  controller: ["StoreService", function(StoreService) {
    const vm = this;
    vm.grandTotal = StoreService.getGrandTotal();



  vm.getGrandTotal = () => {
      vm.grandTotal = StoreService.getGrandTotal().then((response) =>{
      vm.grandTotal=response.data;
    });
  };

    StoreService.getAllItems().then((response) =>{
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
      }
    };

    vm.deleteItem = (id) => {
      StoreService.deleteItem(id).then((response) =>{
        vm.cartItems = response.data;
        vm.getGrandTotal();
      });
      
    };

    vm.updateItem = (item) => {
      StoreService.updateItem(item).then((response) =>{
        vm.cartItems = response.data;
        vm.getGrandTotal();
      });
    };
  }]
};

angular
  .module("App")
  .component("cartList", cartList);



