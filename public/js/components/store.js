"use strict";
const myStore = {
  template: `
  <div class="sectionHeader" id="storeHeader">
    <a href="#!/cartlist"><i class="fas fa-shopping-cart"> View Cart</i> </a>
    <p class="total" >Grand Total:</p>
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
        <div class="store__product_add">
          <i class="fas fa-shopping-bag"></i>
          <p ng-click="$ctrl.addToCart(item, $event);">Add to Cart</p>
        
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
      console.log($event.path[1]);      
      
      StoreService.addToCart(item).then((response) => {
        console.log(response);
        });
    };
  }]
};


angular
  .module("App")
  .component("myStore", myStore);