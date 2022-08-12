const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
  {
    guid: {
      type: String,
      required: true,
    },
    instansi: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    package_name: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "",
    },
    client_id: {
      type: String,
      default: "",
    },
    client_secret: {
      type: String,
      default: "",
    },
    acces_token: {
      type: String,
      default: "",
    },
    create_at: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("unit", dataSchema);
