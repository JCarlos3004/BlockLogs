const express = require('express');
const router  = express.Router();
const { getAll } = require('../controllers/DashBoardController');


router.get("/getAll", getAll);


/* router.route("/getAll").get(async (req, res) => {
    const info = await getAll();
    const data = info.map(e => ({
            period  : e.timestamp,
            critico : e.index
        }));
    res.send(data);
}) */

module.exports = router;

