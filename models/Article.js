// Creating the basis for the database architecture

// Require mongoose module
var mongoose = require("mongoose");

// Setting a variable reference to a mongoose schema
var Schema = mongoose.Schema;

// Creating the schema for articles displayed on the page
var ArticleSchema = new Schema ({
    title: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
    },
    link: {
        type: String,
        require: true,
        unique: true
    },
    saved: {
      type: Boolean,
      default: false
  }
});

// Naming our schema "Article" and passing in the name of our schema
var Article = mongoose.model("Article", ArticleSchema);

// Exporting so that other files can use this model
module.exports = Article;