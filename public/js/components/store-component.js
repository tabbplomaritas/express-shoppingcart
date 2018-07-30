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
        <div ng-click="$ctrl.addToCart(item, $event);" class="store__product_add">
          <i class="fas fa-shopping-bag"></i>
          <p >Add to Cart</p>
        
        </div>
    </div>
  </section>
    
  `,

  controller: ["StoreService", "$timeout", function(StoreService, $timeout){
    const vm = this;
    vm.firstLoad = StoreService.isFirstLoad();

    if(vm.firstLoad){
      console.log("cart cleared");
    StoreService.clearCart();
    StoreService.cartNowCleared();
    }

    StoreService.getStoreItems().then((response)=>{
      vm.store = response.data;
      console.log(vm.store);
    });

    StoreService.getGrandTotal().then((response) => {
      console.log("get grand total in component running");
      vm.total =  response.data;
    });  




    vm.addToCart = (item, $event) => {  
      let added = $event.currentTarget;
      console.log(added);
      
      angular.element(added).html('<i class="fas fa-check-circle"></i> Added!');
      angular.element(added).addClass("added");
      angular.element(added).addClass("animated zoomIn");
      angular.element(added).css("background-color", "#009688");

      StoreService.addToCart(item).then((response) => {
        console.log(response);
        });

        $timeout(function () {
          StoreService.getGrandTotal().then((response) => {
            console.log("get grand total in component running");
            vm.total =  response.data;
          });  
      }, 500);

              

    };
    StoreService.getGrandTotal().then((response) => {
      console.log("get grand total in component running");
      vm.total =  response.data;
    });
  }]
};


angular
  .module("App")
  .component("myStore", myStore);