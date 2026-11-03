
const mongoose = require('mongoose');

const fasilitasSchema = new mongoose.Schema({
    Parkir: { type: Boolean, default: false },
    Musholla: { type: Boolean, default: false },
    Toilet: { type: Boolean, default: false },
    Kuliner: { type: Boolean, default: false },
    ramahDisabilitas: { type: Boolean, default: false }
}, { _id: false });

const SONGKET = new mongoose.Schema({
    kodeKain: {
        type: String,
        required: [true, 'kode kain wajib diisi'],
        trim: true
    },
    motif: {
        type: String,
        required: [true, 'motif wajib diisi'],
        trim: true
    },
    harga: {
        type: Number,
        required: [true, 'wajib minimal 0']
    },
    benang: {
        type: String,
        required: [true, ''],
        trim: true
    },
});

module.exports = mongoose.model('KerajinanSongket', parawisataSchema);
