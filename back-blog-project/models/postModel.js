const { Schema, model } = require("mongoose");

const PostSchema = new Schema({
  login: { type: String, required: true },
  post: { type: String, required: true },
});

module.exports = model("blog", PostSchema);