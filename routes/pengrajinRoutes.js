const express = require("express");
const router = express.Router();

const {
  createPengrajin,
  getAllPengrajin
} = require("../controllers/pengrajinControlles");

router.post("/", createPengrajin);
router.get("/", getAllPengrajin);

module.exports = router;