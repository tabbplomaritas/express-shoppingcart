"use strict";

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
//put requires below here
const cartItems = require("./routes/cart-list-routes");
const store = require("./routes/store-routes");

//put app.use below here
app.use(bodyParser.json());
//these will be the routes we need to use. portal is made up.
app.use(express.static(__dirname + "/public"));
app.use("/portal", cartItems);
app.use("/portal", store);


//set up port, 3000 or 8080, my choice!
const port = process.env.PORT || 5000;

app.listen(port, () => { 
  console.log(`Server listening on ${port}.`);
});