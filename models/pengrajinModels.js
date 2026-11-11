const mongoose = require("mongoose");

const pengrajinSchema = new mongoose.Schema(
  {
    kode: {
      type: String,
      required: [true, "Kode pengrajin wajib diisi"],
      unique: true,
      trim: true,
      uppercase: true
    },
    nama: {
      type: String,
      required: [true, "Nama pengrajin wajib diisi"],
      trim: true
    }
  },
  {
    versionKey: false
  }
);

const Pengrajin = mongoose.model("Pengrajin", pengrajinSchema);

module.exports = Pengrajin;