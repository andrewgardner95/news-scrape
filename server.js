// MONGODB_URI: mongodb://heroku_40skqh1s:vp9mcp56ouc1cu2c68vt0olgju@ds153501.mlab.com:53501/heroku_40skqh1s

// Dependencies
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var logger = require("morgan");
var mongoose = require("mongoose");
var request = require("request");
var cheerio = require("cheerio");
// Mongoose mpromise deprecated - use bluebird promises
var Promise = require("bluebird");
mongoose.Promise = Promise;

var PORT = process.env.PORT || 3000;

// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

// Make public a static dir
app.use(express.static("public"));

// Handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Establishing a connection to mongoDB
mongoose.connect("mongodb://localhost/news-scrape");
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
