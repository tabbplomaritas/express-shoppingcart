"use strict";
function CartService($http) {
  // Declare the functions to make GET, POST, PUT, and DELETE requests from this service.
  
  const getAllItems = () =>{
    return $http({
      method: "GET",
      url: "/portal/cart-items"
    });
  };

  const addItem = (newItem) =>{
    console.log("addItem in Service working");
    
    return $http({
      method: "POST",
      url: "/portal/cart-items",
      data: newItem
    });
  };

  const deleteItem = (id) =>{
    console.log("deleteItem in Service working");
    
    return $http({
      method: "DELETE",
      url: "/portal/cart-items/" + id
    });
  };

  const updateItem = (item) =>{
    console.log("updateItem in Service working");
    
    return $http({
      method: "PUT",
      url: "/portal/cart-items/" + item.id, 
      data: item
    });
  };

  return {
    getAllItems,
    addItem,
    deleteItem, 
    updateItem
  };
};
  


angular
  .module("App")
  .factory("CartService", CartService);