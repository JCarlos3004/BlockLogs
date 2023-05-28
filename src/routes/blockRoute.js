const express = require('express');
const router  = express.Router();
const { createOne, deleteOne, getAll, updateOne } = require('../controllers/BlockController')

router.get("/getall", getAll);

router.post("/create", createOne);

router.delete("/delete", deleteOne);

router.put("/update", updateOne); 

module.exports = router;