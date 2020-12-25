const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const app = express();

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
app.use(express.static(path.join(__dirname, "public")));

// Configure routes
app.use('/user' , require('./routes/user.route'));

module.exports = app;
