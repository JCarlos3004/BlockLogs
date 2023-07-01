const LogModel = require('../database/mongodb/models/logModel');
const connect  = require('../database/database');


const getAll = async (req, res) => {
    try {
        const db         = await connect();
        const collection = db.collection('logsproc');
        const data       = await collection.find().toArray();
        res.send(JSON.stringify(data));
    }
    catch (e) {
        console.log(e)
    }
};


const updateAll = async (req, res) => {
    try {
        const db   = await connect();
        const collection = db.collection('logsproc');
        const { data, numberOfBlocks } = req.body
        const updateLogs = data.map((item) => ({...item,bloque:numberOfBlocks}))
        for (const updatedItem of updateLogs) {
            await collection.updateMany(
                { 'id' : { $eq: updatedItem.id }}, // Filtro para encontrar el documento específico
                { $set : { 'bloque': (updatedItem.bloque - 1).toString(), 'estado': "Asignado" }}, // Valores a actualizar
                { new:  true }
            );
        }
    res.send("PUT succesfully")
    }
    catch (e) {
        console.log(e);
        res.send("PUT Fail")
    }
}
module.exports = { getAll, updateAll }