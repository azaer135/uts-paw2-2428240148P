const Pengrajin = require("../models/pengrajinModels");

const createPengrajin = async (req, res, next) => {
  try {
    const { kode, nama } = req.body;

    const pengrajin = await Pengrajin.create({ kode, nama });

    return res.status(201).json({
      message: "Data pengrajin berhasil ditambahkan",
      data: pengrajin
    });
  } catch (error) {
    return next(error);
  }
};

const getAllPengrajin = async (req, res, next) => {
  try {
    const pengrajin = await Pengrajin.find().sort({ kode: 1 });

    return res.status(200).json({
      message: "Berhasil mengambil data pengrajin",
      data: pengrajin
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createPengrajin,
  getAllPengrajin
};
