
const mongoose = require('mongoose');

const KerajinanSongket = new mongoose.Schema({
    kodeKain: String,
    motif: String,
    harga: Number,
    benang: String,
    ukuran: embedding,
    pengrajinId: ObjectId,
    createdAt: Date
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
    ukuran: {
        type: String,
        
    }
});

module.exports = mongoose.model('KerajinanSongket', parawisataSchema);
