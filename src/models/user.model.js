const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  guid: {
    required: true,
    type: String,
  },
  name: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    unique: true,
    lowercase: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  telp: {
    required: true,
    type: Number,
  },
  address: {
    default: "",
    type: String,
  },
  role: {
    required: true,
    type: String,
    default: "1",
  },
  unit: [
    {
      guid: { required: true, type: String },
      name: { required: true, type: String },
      create_at: { type: Date, default: Date.now },
    },
  ],
  aplication: [
    {
      guid: { required: true, type: String },
      device_id: { required: true, type: String },
      type: { required: true, type: String },
      create_at: { type: Date, default: Date.now },
    },
  ],
  otp: {
    default:0,
    type: Number,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  create_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("user", dataSchema);