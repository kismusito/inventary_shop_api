const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const app = express();
require('./config/config')

// Set more security to request
app.use(helmet())

// Allow cors
app.use(cors())

// Set module for helped request information
app.use(morgan("combined"))

// Allow json request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define static files access
app.use(express.static(path.join(__dirname, "/../public")));

// Configure routes
app.use('/user' , require('./routes/user.route'));
app.use('/rol' , require('./routes/rol.route'));
app.use('/product' , require('./routes/product.route'));

module.exports = app;
