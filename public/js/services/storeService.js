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


const getGrandTotal = () =>{
  return $http({
    method: "GET",
    url: "/portal/grandtotal"
  });
};

  return {
    getStoreItems, 
    addToCart,
    getGrandTotal
  };
}


angular
  .module("App")
  .factory("StoreService", StoreService);