// Models
var Article = require("../models/Article.js");
var Comment = require("../models/Comment.js");

// Dependencies
var express = require("express");
var request = require("request");
var cheerio = require("cheerio");
var router = express.Router();

router.get("/", function (req, res) {
  Article.find().populate("comments").exec(function (error, found) {
      res.render("index", { articles: found })
    })
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
      var title = $(this).children("a").text();
      var link = $(this).children("a").attr("href");
      if (title && link) {
        // Save the data in the scrapedData db
        var newArticle = new Article({ title: title, link: link });
        newArticle.save(function (error, saved) {
          // If there's an error during this query
          if (error) {
            // Log the error
          }
        });
        }
      });
    });
    res.redirect("/");
  });


module.exports = router;