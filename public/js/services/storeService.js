"use strict";

function StoreService($http){

let firstLoad = true;

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
  });
};

const addToCart = (item) => {
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