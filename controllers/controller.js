// Models
var Article = require("../models/Article.js");
var Comment = require("../models/Comment.js");

// Dependencies
var express = require("express");
var request = require("request");
var cheerio = require("cheerio");
var router = express.Router();

// home route
router.get("/", function(req, res) {
  res.render("index");
});

// Scrape articles from reddit and store in mongoDB
router.get("/scrape", function(req, res) {
  request("http://www.reddit.com/r/upliftingnews/", function(error, response, html) {
    var $ = cheerio.load(html);
    $("p.title").each(function(i, element) {
      var result = {};
      result.title = $(this).children("a").text();
      result.link = $(this).children("a").attr("href");
      var newArticle = new Article(result);
      newArticle.save(function (error, doc) {
        if (error) {
          console.log(error);
        }
        else {
        }
      });
    });
  });
  res.redirect("/articles");
});

// Getting articles from db and displaying them on the results page
router.get("/articles", function (req, res) {
  Article.find()
    .exec(function(err, found){
      if(err) {
        res.send("error has occured");
      } else {
        res.render("results", { articles: found });
      }
    });
});

// Marking articles as saved in the db when the user clicks the favorite button
router.put('/id/:id', function(req, res) {
  var ID = req.params.id;
  Article.update({_id: ID},{ $set: {saved: true} }, function(error, updated) {
    if (error) {
      res.render('error');
    }
  })
});

// Unmarking articles as saved in the db when the user clicks the remove button
router.put('/remove/:id', function(req, res) {
  var ID = req.params.id;
  Article.update({_id: ID},{ $set: {saved: false} }, function(error, updated) {
    if (error) {
      res.render('error');
    } else {
      res.redirect("/favorites");
    }
  })
});

// Getting saved articles and rendering them on the favorites page
router.get("/favorites", function(req, res) {
  Article.find({saved: true}, function(error, found) {
    if (error) {
      res.render('error');
    } else {
        res.render("favorites", { articles: found });
    }
  })
});

// Export for server.js
module.exports = router;