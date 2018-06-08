// Start your server out with a hard-coded array of cart items, each including id, product,
// price, and quantity

"use strict";

const express = require("express");
const cartRouter = express.Router();
const pg = require("pg");
const pool = require("../pg-connection-pool");

cartRouter.get("/cart-items", (req, res) =>{
 pool.query("SELECT * FROM shopping_cart ORDER BY id").then((result) =>{
   res.send(result.rows);
 })
});

cartRouter.post("/cart-items", (req, res) =>{
  pool.query("INSERT INTO shopping_cart(product, quantity, price) VALUES($1::text, $2::int, $3::int)", [req.body.product, req.body.price, req.body.quantity]).then(() => {
    pool.query("SELECT * FROM shopping_cart ORDER BY id").then((result) => {
      console.log(result.rows);
      res.send(result.rows);
    });
  });
});

cartRouter.delete("/cart-items/:id", (req, res) => {
  pool.query("DELETE FROM shopping_cart WHERE id=$1::int", [req.params.id])
  .then(() => {
    pool.query("SELECT * FROM shopping_cart ORDER BY id").then((result) => {
      res.send(result.rows);
    });
  });
});


cartRouter.put("/cart-items/:id", (req, res) =>{
  pool.query("UPDATE shopping_cart SET product=$1::text, price=$2::int, quantity=$3::int WHERE id=$4::int",[req.body.product, req.body.price, req.body.quantity, req.params.id]).then(() => {
    pool.query("SELECT * FROM shopping_cart ORDER BY id").then((result) => {
      console.log(result.rows);
      res.send(result.rows);
    });
  });
});



module.exports = cartRouter;

// Export the Router object