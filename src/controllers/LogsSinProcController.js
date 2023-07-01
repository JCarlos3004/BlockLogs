
const connect  = require('../database/database');

const getAll = async (req, res) => {
    try {
        const db         = await connect();
        const collection = db.collection('logslive');
        const data       = await collection.find().toArray();
        res.send(JSON.stringify(data));
    }
    catch (e) {
        console.log(e)
    }
};

const updateAll = async (req, res) => {
    //
}

const createOne = async (req, res) => {
    try {
        const db     = await connect();
        const newDev = req.body;
        const result = await db.collection('logslive').insertOne(newDev);
        console.log(result);
    }
    catch (e) {
        console.log(e); 
    }
}

module.exports = { getAll, updateAll, createOne}