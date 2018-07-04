"use strict";

// const pg = require("pg");


// const pool = new pg.Pool({
//   user: "postgres", 
//   password: "plomaritasgc", 
//   host: "localhost",
//   port: 5432, 
//   database: "ExpressShopDB",
//   ssl: false
// });


// module.exports = pool;

const pg = require("pg");
const url = require("url");
try {
require("dotenv").config();
}

const params = url.parse(process.env.DATABASE_URL);
const auth = params.auth.split(":");
const config = {
user: auth[0],
password: auth[1],
host: params.hostname,
port: params.port,
database: params.pathname.split("/")[1],
ssl: params.hostname !== "localhost"
};
module.exports = new pg.Pool(config);