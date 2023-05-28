const blockModel  = require("../database/mongodb/models/blockModel");
const connect     = require("../database/database")



const getAll   = async (req, res) => {
        try {
            const db   = await connect();
            const collection = db.collection('Node1');
            const data_0 = await collection.find().toArray();
            const data = data_0.map(e => ({
                    x : formatDate(e.timestamp),
                    y : e.index
                }));
            res.send(data);
        }
        catch(e){
            console.log(e);
        }
    };

function formatDate(fechaHora) {
        const [fecha, hora] = fechaHora.split(' ');
        const [dia, mes, anio] = fecha.split('/');
        return anio + "-" + mes + "-" + dia + "T" + "00:00:00"; 
}
module.exports = { getAll }