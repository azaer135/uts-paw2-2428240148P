
require('dotenv').config({ quiet: true });
const mongoose = require('mongoose');
const Parawisata = require('./models/parawisataModel');

const JENIS_SONGKET = [
    
];

async function main() {
    try {
        await mongoose.connect(process.env.DB_URI);

        // Menghapus data pariwisata lama
        await Parawisata.deleteMany({});

        // Memasukkan data pariwisata baru
        const pariwisata = await Parawisata.insertMany(DATA_SONGKET);

        console.log(
            `Seed selesai: ${pariwisata.length} data pariwisata berhasil ditambahkan`
        );
    } catch (err) {
        console.error('Gagal menjalankan seed:', err.message);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
}

main();
