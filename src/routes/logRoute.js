const express    = require('express');
const router     = express.Router();
const { getAll, updateAll } = require('../controllers/LogsController');



router.get("/getall", getAll);

router.put("/update", updateAll); 



module.exports = router;