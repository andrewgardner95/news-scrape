// MONGODB_URI: mongodb://heroku_4r1tbs52:7j182r1d4iffcelkl9cbdm60cs@ds021731.mlab.com:21731/heroku_4r1tbs52

// Dependencies
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var logger = require("morgan");
var mongoose = require("mongoose");
var request = require("request");
var cheerio = require("cheerio");
var methodOverride = require('method-override');
// Mongoose mpromise deprecated - use bluebird promises
var Promise = require("bluebird");
mongoose.Promise = Promise;

var PORT = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(methodOverride("_method"));

// Make public a static dir
app.use(express.static("public"));

// Handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Establishing a connection to mongoDB
mongoose.connect("mongodb://heroku_4r1tbs52:7j182r1d4iffcelkl9cbdm60cs@ds021731.mlab.com:21731/heroku_4r1tbs52");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// Routes
var routes = require("./controllers/controller.js");
app.use("/", routes);

// Listen on port 3000
app.listen(PORT, function() {
  console.log("App running on port " + PORT);
});
