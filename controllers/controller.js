// Requiring the models
var Article = require("../models/Article.js");

// Dependencies
var express = require("express");
var request = require("request");
var cheerio = require("cheerio");
var router = express.Router();

router.get("/", function(req, res) {
  res.send("This is the index");
});