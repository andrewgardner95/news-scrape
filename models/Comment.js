// Require mongoose
var mongoose = require("mongoose");

// Create a Schema class with mongoose
var Schema = mongoose.Schema;

// Create a UserSchema with the Schema class
var CommentSchema = new Schema({
  text: {
    type: String,
    unique: true
  }
});

// Create the User model with the UserSchema
var Comment = mongoose.model("Comment", CommentSchema);
// Export the Author model
module.exports = Comment;