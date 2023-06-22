const express = require('express');
const router  = express.Router();
const { getAll, updateAll, createOne } = require('../controllers/LogsSaveController');


router.get("/getall", getAll);

router.post("/create",createOne);

module.exports = router;