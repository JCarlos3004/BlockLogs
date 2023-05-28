const express = require('express');
const router  = express.Router();
const { getAll } = require('../controllers/DashBoardController');


router.get("/getAll", getAll);

module.exports = router;

