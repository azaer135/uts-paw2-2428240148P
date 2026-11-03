const mongoose = require('mongoose');

const fasilitasSchema = new mongoose.Schema({
    Panjang:{ type: String, default: true },
    lebar:{ type: String, default: true},
}, { _id: false });

module.exports = fasilitasSchema;