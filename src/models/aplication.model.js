const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  guid: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  package_name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  type: {
    required: true,
    type: String,
  },
  client_id: {
    required: true,
    type: String,
  },
  client_secret: {
    required: true,
    type: String,
  },
  acces_token: {
    required: true,
    type: String,
  },
  create_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("application", dataSchema);
