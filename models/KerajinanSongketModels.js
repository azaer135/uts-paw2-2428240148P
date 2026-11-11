const mongoose = require('mongoose');

const ukuranSchema = new mongoose.Schema(
    {
        panjang: {
            type: String,
            required: [true, 'panjang ukuran wajib diisi'],
            trim: true
        },
        lebar: {
            type: String,
            required: [true, 'lebar ukuran wajib diisi'],
            trim: true
        }
    },
    { _id: false }
);

const songketSchema = new mongoose.Schema({
    kodeKain: {
        type: String,
        required: [true, 'kode kain wajib diisi'],
        unique: true,
        trim: true
    },
    motif: {
        type: String,
        required: [true, 'motif wajib diisi'],
        trim: true
    },
    harga: {
        type: Number,
        required: [true, 'harga wajib diisi'],
        min: [0, 'harga minimal 0']
    },
    benang: {
        type: String,
        required: [true, 'benang wajib diisi'],
        trim: true
    },
    ukuran: {
        type: ukuranSchema,
        required: [true, 'ukuran wajib diisi']
    },
    pengrajinId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pengrajin',
        required: [true, 'pengrajinId wajib diisi']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Songket', songketSchema);
