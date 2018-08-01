"use strict";
function CartService($http) {
  // Declare the functions to make GET, POST, PUT, and DELETE requests from this service.

  const getAllItems = () =>{
    return $http({
      method: "GET",
      url: "/portal/cart-items"
    });
  };

  const getGrandTotal = () =>{
    return $http({
      method: "GET",
      url: "/portal/grandtotal"
    });
  };

  const deleteItem = (id) =>{
    return $http({
      method: "DELETE",
      url: "/portal/cart-items/" + id
    });
  };

  const updateItem = (item) =>{
    return $http({
      method: "PUT",
      url: "/portal/cart-items/" + item.id,
      data: item
    });
  };



  return {
    getAllItems,
    deleteItem,
    updateItem,
    getGrandTotal
  };
};



angular
  .module("App")
  .factory("CartService", CartService);