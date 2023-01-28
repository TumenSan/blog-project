const { Schema, model } = require("mongoose");

const TokenSchema = new Schema({
  Token: { type: String, required: true, unique: true },
});

module.exports = model("usersToken", TokenSchema);