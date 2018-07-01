"use strict";
const cartList = {
  // TODO: Create a template to display all the students from this class
  template: `

  <section class="shoppingCart">
  <h2 class="sectionHeader">My cart</h2>
  <a class="grandTotal" href="#!/store">&#x219C Back to store</a>
  <p class="grandTotal" ng-model="$ctrl.grandTotal">Grand Total: {{$ctrl.grandTotal}}</p>
    <section class="item"ng-repeat="item in $ctrl.cartItems">
   
     <div class="item__product">
        <img class="img_small" src="{{item.url}}">
        <div class="item__line">
          <p>{{item.product}}</p>   
          <div>
            <p>{{item.price}} each</p>
            <p class="itemTotal">{{ item.item_total }} total</p>
          </div> 
        </div>

      <i ng-click="$ctrl.deleteItem(item.id);" class="fas fa-times-circle button_delete"></i>

    </div>

    <div class="shoppingCart_quantity">
        <p ng-click="$ctrl.quantityMinus(item)"><i class="fas fa-minus"></i></p>
        <p>{{ item.quantity}}</p>
        <p ng-click="$ctrl.quantityPlus(item); $ctrl.changeColor($event);"><i class="fas fa-plus"></i></p>
    </div>


    </section>
  </section>  
 
  `,
  controller: ["CartService", function(CartService) {
    const vm = this;
    // vm.grandTotal=0;

  vm.getGrandTotal =() => {
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
        console.log("delete item button");
        
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



    