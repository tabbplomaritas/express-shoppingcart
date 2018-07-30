"use strict";

const express = require("express");
const cartRouter = express.Router();
const pg = require("pg");
const pool = require("../pg-connection-pool");

cartRouter.get("/cart-items", (req, res) =>{
 pool.query("SELECT * FROM shopping_cart ORDER BY id").then((result) =>{
   res.send(result.rows);
  });
});

cartRouter.get("/grandtotal", (req, res) => {
  pool.query("SELECT SUM(price * quantity) FROM shopping_cart;").then((result)=> {
    console.log(result.rows[0].sum);
    res.send(result.rows[0].sum);
});
});

// cartRouter.post("/cart-items", (req, res) =>{
//   pool.query("INSERT INTO shopping_cart(product, quantity, price) VALUES($1::text, $2::int, $3::int)", [req.body.product, req.body.price, req.body.quantity]).then(() => {
//     pool.query("SELECT * FROM shopping_cart ORDER BY id").then((result) => {
//       console.log(result.rows);
//       res.send(result.rows);
//     });
//   });
// });

cartRouter.delete("/cart-items/:id", (req, res) => {
  pool.query("DELETE FROM shopping_cart WHERE id=$1::int", [req.params.id])
  .then(() => {
    pool.query("SELECT * FROM shopping_cart ORDER BY id").then((result) => {
      res.send(result.rows);
    });
  });
});


cartRouter.put("/cart-items/:id", (req, res) =>{
  pool.query("UPDATE shopping_cart SET product=$1::text, price=$2::money, quantity=$3::int, WHERE id=$4::int",[req.body.product, req.body.price, req.body.quantity, req.params.id]).then(() => {
    pool.query("UPDATE shopping_cart SET item_total = quantity*price;").then(()=>{

      pool.query("SELECT * FROM shopping_cart ORDER BY id").then((result) => {
        console.log(result.rows);
        res.send(result.rows);
      })
    });
  });
});

module.exports = cartRouter;