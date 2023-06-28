const express = require('express');
const router  = express.Router();
const { getAll, createOne } = require('../controllers/ListaReglasController');

router.get("/getall", getAll);
router.post("/createone", createOne);

module.exports = router;