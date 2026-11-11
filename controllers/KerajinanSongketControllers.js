const mongoose = require("mongoose");
const Pengrajin  = require("../models/pengrajinModels");
const Songket = require("../models/KerajinanSongketModels");

const fieldProjection = "_id kodeTiket namaPembeli harga kelas";

// POST /tiket - membuat data tiket utama
const createTiket = async (req, res, next) => {
  try {
    const {
      kodeKain,
      motif,
      harga,
      benang,
      ukuran,
      kontak,
      pengrajinId,
      createdAt,
    } = req.body;

    // Memeriksa format ID pengrajin.
    if (pengrajinId && !mongoose.Types.ObjectId.isValid(pengrajinId)) {
      const error = new Error("ID pengrajin tidak valid");
      error.status = 400;
      return next(error);
    }

    // Memastikan pengrajin yang dipilih tersedia.
    if (pengrajinId) {
      const pengrajin = await Pengrajin.findById(pengrajinId);

      if (!pengrajin) {
        const error = new Error("Data pengrajin tidak ditemukan");
        error.status = 404;
        return next(error);
      }
    }

    // Hanya menerima field yang ditentukan pada topik.
    const tiket = await Tiket.create({
      kodeTiket,
      namaPembeli,
      harga,
      kelas,
      kontak,
      pengrajinId,
      benang
    });

    return res.status(201).json({
      message: "Data tiket berhasil ditambahkan",
      data: tiket
    });
  } catch (error) {
    return next(error);
  }
};

// GET /tiket dan GET /tiket?kelas=...
const getAllTiket = async (req, res, next) => {
  try {
    const filter = {};

    // Filter berdasarkan kelas tiket jika query tersedia.
    if (req.query.kelas !== undefined) {
      filter.kelas = req.query.kelas;
    }

    const tiket = await Tiket.find(filter)
      .select(fieldProjection)
      .sort({
        createdAt: -1
      });

    return res.status(200).json({
      message: "Berhasil mengambil data tiket",
      data: tiket
    });
  } catch (error) {
    return next(error);
  }
};

// GET /tiket/:id - mengambil detail tiket.
const getTiketById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Memeriksa apakah ID memiliki format ObjectId yang valid.
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error("ID tiket tidak valid");
      error.status = 400;
      return next(error);
    }

    // Mengambil tiket sekaligus data pengrajin yang direferensikan.
    const tiket = await Tiket.findById(id).populate(
      "pengrajinId",
      "kode nama"
    );

    if (!tiket) {
      const error = new Error("Data tiket tidak ditemukan");
      error.status = 404;
      return next(error);
    }

    return res.status(200).json({
      message: "Berhasil mengambil detail tiket",
      data: tiket
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createTiket,
  getAllTiket,
  getTiketById
};