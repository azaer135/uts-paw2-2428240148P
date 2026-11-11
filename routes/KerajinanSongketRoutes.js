const express = require('express');
const router = express.Router();
const Songket = require('../controllers/KerajinanSongketControllers');
const cekApiKey = require('../middlewares/cekApiKey');

router.get('/', Songket.getAllTiket);
router.get('/:id', Songket.getTiketById);
router.post('/', cekApiKey, Songket.createTiket);
router.put('/:id', cekApiKey, Songket.updateTiket);
router.delete('/:id', cekApiKey, Songket.removeTiket);
module.exports = router;