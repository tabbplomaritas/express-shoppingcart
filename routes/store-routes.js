"use strict";

const express = require("express");
const pool = require("../pg-connection-pool");
const pg = require("pg");
const storeRouter = express.Router();


storeRouter.get("/store", (req, res) => {
  pool.query("SELECT * FROM store ORDER BY id").then((response)=>{
    console.log(response.rows);
    res.send(response.rows);
  });
});

storeRouter.post("/store", (req, res) => {
  pool.query("INSERT INTO shopping_cart (product, price, quantity, url, category, vendor) VALUES ($1::text, $2::money, $3::int, $4::text, $5::text, $6::text)", [req.body.product, req.body.price, 1, req.body.url, req.body.category, req.body.vendor]).then(() => {
    pool.query("UPDATE shopping_cart SET item_total = quantity*price;").then(()=>{
      pool.query("SELECT * FROM store ORDER BY id").then((result) => {
      console.log(result.rows);
      res.send(result.rows);
    });
  })
  })
});

storeRouter.get("/grandtotal", (req, res) => {
    pool.query("SELECT SUM(price * quantity) FROM shopping_cart;").then((result)=> {
      console.log(result.rows[0].sum);
      res.send(result.rows[0].sum);
  });
  console.log("get grand total at store");
});


storeRouter.delete("/cart-items/", (req, res) => {
  console.log("clear cart on routes");  
  pool.query("DELETE FROM shopping_cart")
  .then(() => {
    pool.query("SELECT * FROM shopping_cart ORDER BY id").then((result) => {
      res.send(result.rows);
    });
  });
});


module.exports = storeRouter;