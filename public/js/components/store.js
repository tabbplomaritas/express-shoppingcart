"use strict";
const myStore = {
  template: `
<section class="store">
  <div ng-repeat="item in $ctrl.store">
    <img src={{item.url}}>
    <h4>{{item.product}}</h4>
    <p>{{item.price}}</p>
    <p>+</p>
  
  </div>

</section>
    
  `,

  controller: ["StoreService", function(StoreService){
    const vm = this;

    StoreService.getStoreItems().then((response)=>{
      vm.store = response.data;
      console.log(vm.store);
      
    })
  }]
};


angular
  .module("App")
  .component("myStore", myStore);