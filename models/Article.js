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
    link: {
        type: String,
        require: true,
        unique: true
    }
});

// Naming our schema "Article" and passing in the name of our schema
var Article = mongoose.model("Article", ArticleSchema);

// Exporting so that other files can use this model
module.exports = Article;