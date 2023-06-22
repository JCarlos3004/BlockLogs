const LogsSave = require('../database/mongodb/models/LogsSaveModel');
const connect  = require('../database/database');

const getAll = async (req, res) => {
    //
};

const updateAll = async (req, res) => {
    //
}

const createOne = async (req, res) => {
    try {
        const db     = await connect();
        const newDev = req.body;
        const result = await db.collection('LogsSave').insertOne(newDev);
        console.log(result);
    }
    catch (e) {
        console.log(e); 
    }
}

module.exports = { getAll, updateAll, createOne}