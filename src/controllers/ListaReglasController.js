const ReglaModel = require('../database/mongodb/models/reglasModel');
const connect  = require('../database/database');


const getAll = async (req, res) => {
    try {
        const db         = await connect();
        const collection = db.collection('Reglas');
        const data       = await collection.find().toArray();
        res.send(JSON.stringify(data));
    }
    catch(e){
        console.log(e)
    }
};
const createOne = async (req, res) => {
    try {
        const db     = await connect();
        const newDev = req.body;
        const result = await db.collection('Reglas').insertOne(newDev);
        return result;
    }
    catch (e) {
        console.log(e); 
    }
};


module.exports = { getAll, createOne }