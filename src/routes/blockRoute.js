const express = require('express');
const router  = express.Router();
const { createOne, deleteOne, getAll, updateOne } = require('../controllers/BlockController')

router.get("/getall", getAll);

router.post("/create", createOne);

router.delete("/delete", deleteOne);

router.put("/update", updateOne); 

/* router.route('/create').post( async (req, res) => {
    const data  = req.body;
    const data1 = await createOne(data);
    console.log(data)
}); */


/* router.route("/getall").get( async (req, res)=> {
    const data = await getAll();
    res.send(data);
}) */



module.exports = router;