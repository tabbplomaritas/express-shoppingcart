"use strict";

function StoreService($http){

const getStoreItems = () => {
  return $http({
    method: "GET",
    url: "/portal/store"
  });
};

const addToCart = (item) => {
  console.log(item);
  
  return $http({
    method: "POST",
    url: "/portal/store", 
    data: item
  })
}

  return {
    getStoreItems, 
    addToCart
  };
}


angular
  .module("App")
  .factory("StoreService", StoreService);