const mongoose = require('mongoose');
const Pengrajin = require('../models/pengrajinModels');
const Songket = require('../models/KerajinanSongketModels');

const errorHttp = (status, message) => Object.assign(new Error(message), { status });

const getAllSongket = async (req, res, next) => {
    try {
        const filter = {};
        if (req.query.benang !== undefined) {
            filter.benang = req.query.benang;
        }

        const songket = await Songket.find(filter)
            .populate('pengrajinId', 'kode nama')
            .sort({ createdAt: -1 });

        return res.status(200).json({
            message: 'Berhasil mengambil data songket',
            data: songket
        });
    } catch (error) {
        return next(error);
    }
};

const getSongketById = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return next(errorHttp(400, 'ID songket tidak valid'));
        }

        const songket = await Songket.findById(req.params.id)
            .populate('pengrajinId', 'kode nama');
        if (!songket) {
            return next(errorHttp(404, 'Data songket tidak ditemukan'));
        }

        return res.status(200).json({
            message: 'Berhasil mengambil detail songket',
            data: songket
        });
    } catch (error) {
        return next(error);
    }
};

const createSongket = async (req, res, next) => {
    try {
        const { kodeKain, motif, harga, benang, ukuran, pengrajinId } = req.body;

        if (!mongoose.Types.ObjectId.isValid(pengrajinId)) {
            return next(errorHttp(400, 'ID pengrajin tidak valid'));
        }
        const pengrajin = await Pengrajin.findById(pengrajinId);
        if (!pengrajin) {
            return next(errorHttp(404, 'Data pengrajin tidak ditemukan'));
        }

        const songket = await Songket.create({
            kodeKain,
            motif,
            harga,
            benang,
            ukuran,
            pengrajinId
        });

        return res.status(201).json({
            message: 'Data songket berhasil ditambahkan',
            data: songket
        });
    } catch (error) {
        return next(error);
    }
};

const updateSongket = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return next(errorHttp(400, 'ID songket tidak valid'));
        }

        const allowedFields = ['kodeKain', 'motif', 'harga', 'benang', 'ukuran', 'pengrajinId'];
        const update = Object.fromEntries(
            allowedFields
                .filter((field) => Object.prototype.hasOwnProperty.call(req.body, field))
                .map((field) => [field, req.body[field]])
        );

        if (update.pengrajinId !== undefined) {
            if (!mongoose.Types.ObjectId.isValid(update.pengrajinId)) {
                return next(errorHttp(400, 'ID pengrajin tidak valid'));
            }
            const pengrajin = await Pengrajin.findById(update.pengrajinId);
            if (!pengrajin) {
                return next(errorHttp(404, 'Data pengrajin tidak ditemukan'));
            }
        }

        const songket = await Songket.findByIdAndUpdate(req.params.id, update, {
            new: true,
            runValidators: true
        }).populate('pengrajinId', 'kode nama');

        if (!songket) {
            return next(errorHttp(404, 'Data songket tidak ditemukan'));
        }

        return res.status(200).json({
            message: 'Data songket berhasil diperbarui',
            data: songket
        });
    } catch (error) {
        return next(error);
    }
};

const removeSongket = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return next(errorHttp(400, 'ID songket tidak valid'));
        }

        const songket = await Songket.findByIdAndDelete(req.params.id);
        if (!songket) {
            return next(errorHttp(404, 'Data songket tidak ditemukan'));
        }

        return res.status(200).json({
            message: 'Data songket berhasil dihapus',
            data: songket
        });
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    getAllSongket,
    getSongketById,
    createSongket,
    updateSongket,
    removeSongket
};
