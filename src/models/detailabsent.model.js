const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
  {
    guid: { required: true, type: String },
    absen: { required: true, type: String },
    user: { required: true, type: String },
    instansi: { required: true, type: String },
    tanggal: { required: true, type: String },
    jam: { required: true, type: String },
    nama: { required: true, type: String },
    jenis: { required: true, type: String },
    unit: { required: true, type: String },
    deskripsi: { required: true, type: String },
    alamat: { required: true, type: String },
    gambar: { required: true, type: String },
    latitude: { required: true, type: Number },
    longitude: { required: true, type: Number },
    create_at: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("details_absent", dataSchema);
