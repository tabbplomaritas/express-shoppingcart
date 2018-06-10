"use strict";

angular
  .module("App")
  .config(($routeProvider) => {
    $routeProvider
      .when("/cartlist", {
        template: `<cart-list></cart-list>`
      })
      .when("/store", {
        template: `<my-store></my-store>`
      })
  });