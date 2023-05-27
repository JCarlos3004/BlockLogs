const express    = require('express');
const router     = express.Router();
const { getAll, updateAll } = require('../controllers/LogsController');



router.get("/getall", getAll);

router.put("/update", updateAll); 

/* router.route("/getall").get( async (req, res) => {
    const data = await getAll();
    res.send(JSON.stringify(data));
});
 */


module.exports = router;