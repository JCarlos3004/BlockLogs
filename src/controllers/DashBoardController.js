const blockModel  = require("../database/mongodb/models/blockModel");
const connect     = require("../database/database")



const getAll   = async (req, res) => {
        try {
            const db   = await connect();
            const collection = db.collection('Node1');
            const data_0 = await collection.find().toArray();
            const data = data_0.map(e => ({
                    period  : e.timestamp,
                    critico : e.index
                }));
            res.send(data);
        }
        catch(e){
            console.log(e);
        }
    };

module.exports = { getAll }