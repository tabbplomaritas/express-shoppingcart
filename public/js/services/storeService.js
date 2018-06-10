"use strict";

function StoreService($http){

const getStoreItems = () => {
  return $http({
    method: "GET",
    url: "/portal/store"
  });
};

  return {
    getStoreItems
  };
}


angular
  .module("App")
  .factory("StoreService", StoreService);