// Models
var Article = require("../models/Article.js");
var Comment = require("../models/Comment.js");

// Dependencies
var express = require("express");
var request = require("request");
var cheerio = require("cheerio");
var router = express.Router();

router.get("/", function(req, res) {
  res.redirect("/scrape");
});

// Scrape top articles on reddit world news and store in mongoDB
router.get("/scrape", function(req, res) {
  // First, we grab the body of the html with request
  request("http://www.reddit.com/r/worldnews/", function(error, response, html) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(html);
    // Now, we grab every h2 within an article tag, and do the following:
    $("p.title").each(function(i, element) {
      // Save an empty result object
      var result = {};
      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this).children("a").text();
      result.link = $(this).children("a").attr("href");
      // Save the data in the scrapedData db
      var newArticle = new Article(result);
      newArticle.save(function (error, doc) {
        // If there's an error during this query
        if (error) {
          console.log(error);
        }
        // Or log the doc
        else {
        }
      });
    });
  });
  // Tell the browser that we finished scraping the text
  res.redirect("/home");
});

router.get("/home", function (req, res) {
  Article.find().populate("comments").exec(function (error, found) {
      res.render("index", { articles: found })
    })
});


module.exports = router;