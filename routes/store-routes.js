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

module.exports = storeRouter;