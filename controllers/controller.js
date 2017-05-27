// Requiring the models
var Article = require("../models/Article.js");

// Dependencies
var express = require("express");
var request = require("request");
var cheerio = require("cheerio");
var router = express.Router();

router.get("/", function(req, res) {
    res.render('index');
});

// A GET request to scrape the echojs website
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
      // Using our Article model, create a new entry
      // This effectively passes the result object to the entry (and the title and link)
      var entry = new Article(result);
      // Now, save that entry to the db
      entry.save(function(err, doc) {
        // Log any errors
        if (err) {
          console.log(err);
        }
        // Or log the doc
        else {
          console.log(doc);
        }
      });
    });
  });
  // Tell the browser that we finished scraping the text
  res.redirect("/");
});


router.get('/results', function(req, res){
    // Find all results from the Articles collection in the db
  Article.find({saved: false},function(error, found) {
    // Throw any errors to the console
    if (error) {
      return res.render('error');
    }
    // If there are no errors, send the data to the browser as a json
    else {
      var hbsObject={
        articles: found
        }
      res.render("results", hbsObject);
    }
  });

});

module.exports = router;