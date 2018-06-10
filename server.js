"use strict";

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
//put requires below here
const cartItems = require("./routes/cart-list-routes");

//put app.use below here
app.use(bodyParser.json());
//these will be the routes we need to use. portal is made up.
app.use(express.static(__dirname + "/public"));
app.use("/portal", cartItems);


//set up port, 3000 or 8080, my choice!
let port = 3000;

app.listen(port, () => { 
  console.log(`Server listening on ${port}.`);
});