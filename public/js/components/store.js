"use strict";
console.log("whyyyyyy");


const myStore = {
  template: `
    <h1>WORK DAMN IT</h1>
  `,

  controller: function(){
    console.log("store function doing a thing");
  
  }
};


angular
  .module("App")
  .component("myStore", myStore);