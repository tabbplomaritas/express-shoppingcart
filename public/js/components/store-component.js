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


    StoreService.getStoreItems().then((response)=>{
      vm.store = response.data;
      console.log(vm.store);
   
    });

    vm.addToCart = (item, $event) => { 
      console.log($event.currentTarget);  
      let added = $event.currentTarget;
      console.log(added);
      
      angular.element(added).html('<i class="fas fa-check-circle"></i> Added!');
      angular.element(added).addClass("added");
      angular.element(added).addClass("animated zoomIn");
      angular.element(added).css("background-color", "#009688");

      StoreService.addToCart(item).then((response) => {
        console.log(response);
        });
    };

    StoreService.getGrandTotal().then((response) => {
      vm.total =  response.data;
    });
    console.log(vm.total);
    
  }]
};


angular
  .module("App")
  .component("myStore", myStore);