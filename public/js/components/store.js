"use strict";
const myStore = {
  template: `
  <div class="sectionHeader">
    <a href="#!/cartlist"><i class="fas fa-shopping-cart"> View Cart</i> </a>
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
    <p ng-click="$ctrl.addToCart(item); $ctrl.changeColor($event);">
      <i class="fas fa-plus"></i>
    </p>
  
  </div>

</section>
    
  `,

  controller: ["StoreService", function(StoreService){
    const vm = this;

    StoreService.getStoreItems().then((response)=>{
      vm.store = response.data;
      console.log(vm.store);
      
      vm.addToCart = (item) => {
        console.log("addtocartworking");
      
        StoreService.addToCart(item).then((response) => {
          console.log(response);
          });
      };
    });
  }]
};


angular
  .module("App")
  .component("myStore", myStore);