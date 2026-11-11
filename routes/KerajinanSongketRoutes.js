const express = require('express');
const router = express.Router();
const Songket = require('../controllers/KerajinanSongketControllers');
const cekApiKey = require('../middlewares/cekApiKey');

router.get('/', Songket.getAllSongket);
router.get('/:id', Songket.getSongketById);
router.post('/', cekApiKey, Songket.createSongket);
router.put('/:id', cekApiKey, Songket.updateSongket);
router.delete('/:id', cekApiKey, Songket.removeSongket);

module.exports = router;