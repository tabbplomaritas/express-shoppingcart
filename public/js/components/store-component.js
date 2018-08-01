"use strict";
const myStore = {
  template: `
  <div class="sectionHeader" id="storeHeader">
    <a href="#!/cartlist"><i class="fas fa-shopping-cart"> View Cart</i> </a>
    <p class="total" >Grand Total: {{ $ctrl.total }}</p>
  </div>

  <section class="store">


    <div class="item" ng-repeat="item in $ctrl.store">
      <div class="store__product">
        <div class="item__line">
            <h4>{{item.product}}</h4>
            <p>{{item.price}}</p>
        </div>
        <img class="img_med" src={{item.url}}>
      </div>
        <div ng-class="{ 'added': item.added == true }" ng-click="$ctrl.addToCart(item, $event);" class="store__product_add">
          <i class="fas fa-shopping-bag"></i>
          <p >Add to Cart</p>
        </div>
    </div>
  </section>

  `,

  controller: ["StoreService", "$timeout", function(StoreService, $timeout){
    const vm = this;
    vm.firstLoad = StoreService.isFirstLoad();
    vm.store;


    //do these things only once upon the page first loading, but not as view changes
    if(vm.firstLoad){
      console.log("cart cleared");
      //clear the cart out - this is because as of now the cart saves to the database, I need to change this perhaps so it only saves if a user submits an order. But for now...
      StoreService.clearCart();
      //change the first load variable in service
      StoreService.cartNowCleared();
      //load the initial store items, this makes the call to do the database
      StoreService.setStoreItems().then((response)=>{
        vm.store = response;
      });
      console.log("store loaded");
    }

    //retrieve the 'local' store without making request to database
    vm.store = StoreService.getStoreItems();
    console.log(vm.store);
    //retrieve the up to date grand total
    StoreService.getGrandTotal().then((response) => {
      vm.total =  response.data;
    });

    vm.addToCart = (item, $event) => {
      let added = $event.currentTarget;
      if(item.added == true){
        //update the quantity in the cart
        //update grand total
        //end function
      }
      //else if not added, add to cart.

      // angular.element(added).html('<i class="fas fa-check-circle"></i> Added!');
      // angular.element(added).addClass("added");
      // angular.element(added).addClass("animated zoomIn");
      // angular.element(added).css("background-color", "#009688");

      StoreService.addToCart(item).then((response) => {
        console.log(response);
        });

        $timeout(function () {
          StoreService.getGrandTotal().then((response) => {
            vm.total =  response.data;
          });
      }, 500);
    };

    StoreService.getGrandTotal().then((response) => {
      vm.total =  response.data;
    });
  }]
};


angular
  .module("App")
  .component("myStore", myStore);