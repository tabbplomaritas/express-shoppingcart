"use strict";

function StoreService($http){

let firstLoad = true;
let store;


const isFirstLoad = () => {
  return firstLoad;
}

const cartNowCleared = () => {
  firstLoad = false;
}

const getStoreItems = () => {
  return $http({
    method: "GET",
    url: "/portal/store"
  }).then((response) => {
    store = response.data;
    console.log(store);
    return store;
  }).catch((error) => {
    console.log(error);
  })
};

// const getStoreItems = () => {
//   return store;
// }



const addToCart = (item) => {
  console.log(item.id);
  for(let el of store) {
    if(el.id = item.id){
      el.added = true;
    }
  }

  console.log(store);

  return $http({
    method: "POST",
    url: "/portal/store",
    data: item
  })
}


const getGrandTotal = () =>{
  return $http({
    method: "GET",
    url: "/portal/grandtotal"
  });
};

const clearCart = () => {
  console.log("clear cart in Service working");

  return $http({
    method: "DELETE",
    url: "/portal/cart-items/"
  });
}

  return {

    getStoreItems,
    addToCart,
    getGrandTotal,
    clearCart,
    isFirstLoad,
    cartNowCleared
  };
}


angular
  .module("App")
  .factory("StoreService", StoreService);