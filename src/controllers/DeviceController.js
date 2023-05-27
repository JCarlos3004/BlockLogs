const Device  = require("../database/mongodb/models/DeviceModel");
const connect = require("../database/database");


const getAll = async () => {
    try {
        const db         = await connect();
        const collection = db.collection('Device');
        const data       = await collection.find().toArray();
        return data
    }
    catch(e){
        console.log(e)
    }
};

const createOne = async (data) => {
    try {
        const db     = await connect();
        const newDev = new Device(data);
        const result = await db.collection('Device').insertOne(newDev);
        return result;
    }
    catch (e) {
        console.log(e); 
    }
}

const updateOne = async (req, res) => {
    res.send('Working');
}

const deleteOne = async(req, res) => {
    res.send('Working');
}



module.exports = { getAll, createOne, updateOne, deleteOne };