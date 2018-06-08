"use strict";

//step one: require pg.
const pg = require("pg");

//step two: create pool
const pool = new pg.Pool({
  user: "postgres", 
  password: "plomaritasgc", 
  host: "localhost",
  port: 5432, 
  database: "ExpressShopDB",
  ssl: false
});


module.exports = pool;