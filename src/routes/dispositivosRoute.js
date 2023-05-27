const express = require('express');
const router  = express.Router();
const { getAll, createOne } = require('../controllers/DeviceController')

router.route("/getall").get( async (req, res) => {
    const data = await getAll();
    res.send(data);
})

router.route("/create").post( async (req, res) => {
    const datadev = req.body;
    const result  = await createOne(datadev);
    res.send(result)
})

module.exports = router;