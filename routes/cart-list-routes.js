// Start your server out with a hard-coded array of cart items, each including id, product,
// price, and quantity

"use strict";

const express = require("express");
const cartRouter = express.Router();

const cartItems = [
  {
    product: "Apple",
    price: 2,
    quantity: 2, 
    id: 0
  },
  {
    product: "Bread",
    price: 3,
    quantity: 1, 
    id: 1
  },
  {
    product: "Peanut Butter",
    price: 2,
    quantity: 1, 
    id:2
  }
];

let idCount = 3;

// TODO Create four separate routes, one for each method

//cart items below does not directly relate to cartitems array above
cartRouter.get("/cart-items", (req, res) =>{
  //cartitems below DOES relate the the name of the array
  res.send(cartItems);
});

cartRouter.post("/cart-items", (req, res) =>{
  cartItems.push({
    product: req.body.product, 
    price: req.body.price,
    quantity: req.body.quantity,
    id: idCount++
  });
  res.send(cartItems);
});

cartRouter.delete("/cart-items/:id", (req, res) =>{
  console.log(req.params.id);
  console.log(typeof req.params.id);
  
  for (let item of cartItems) {
    if (item.id == req.params.id){
      cartItems.splice(cartItems.indexOf(item), 1);
    }
  }
  res.send(cartItems);
});

cartRouter.put("/cart-items/:id", (req, res) =>{
  console.log(req.params.id);
  console.log(typeof req.params.id);
  
  for (let item of cartItems) {
    if (item.id == req.params.id){
      cartItems.splice(cartItems.indexOf(item), 1, {
        product: req.body.product,
        price: req.body.price,
        quantity: req.body.quantity,
        id: item.id
      });
    };
  };
  res.send(cartItems);
});



module.exports = cartRouter;

// Export the Router object