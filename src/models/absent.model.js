const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
  {
    guid: {
      required: true,
      type: String,
    },
    user: {
      required: true,
      type: String,
    },
    instansi: {
      required: true,
      type: String,
    },
    unit: {
      required: true,
      type: String,
    },
    nama: {
      required: true,
      type: String,
    },
    bulan: {
      required: true,
      type: String,
    },
    tahun: {
      required: true,
      type: String,
    },
    jumlah: {
      required: true,
      type: Number,
    },
    absen_pagi: {
      required: true,
      type: Number,
    },
    absen_siang: {
      required: true,
      type: Number,
    },
    absen_sore: {
      required: true,
      type: Number,
    },
    absen_lembur: {
      required: true,
      type: Number,
    },
    detail: [
      {
        guid: { required: true, type: String },
        user: { required: true, type: String },
        instansi: { required: true, type: String },
        unit: { required: true, type: String },
        nama: { required: true, type: String },
        deskripsi: { required: true, type: String },
        alamat: { required: true, type: String },
        gambar: { required: true, type: String },
        latitude: { required: true, type: Number },
        tanggal: { required: true, type: String },
        jam: { required: true, type: String },
        Longitude: { required: true, type: Number },
        create_at: { type: Date, default: Date.now },
      },
    ],
    create_at: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("absent", dataSchema);
