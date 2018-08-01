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

const setStoreItems = () => {
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


const getStoreItems = () => {
  return store;
}



const addToCart = (item) => {
  for(let product of store) {
    if(product.id === item.id){
      product.added = true;
    }
  }

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
    setStoreItems,
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