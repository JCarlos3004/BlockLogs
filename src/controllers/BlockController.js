const blockModel  = require("../database/mongodb/models/blockModel");
const connect     = require("../database/database");
const Block       = require("../public/js/CadenaBloq/Block");
const Blockchain  = require("../public/js/CadenaBloq/Blockchain");
const { format, zonedTimeToUtc } = require('date-fns-tz');

///
let Array = [];
function getFecha(){
    const formatoPeru = "dd/MM/yyyy HH:mm:ss";
    const peruTimeZone = "America/Lima";
    const f = zonedTimeToUtc(new Date(), peruTimeZone);
    return format(f, formatoPeru, { timeZone: peruTimeZone });
}
///
const getAll   = async (req, res) => {
    try{
        const db   = await connect();
        const collection = db.collection('Node1');
        const data = await collection.find().toArray();
        res.send(data);
    }
    catch (e) {
        console.log(e);
    }
    };

const createOne = async (req, res) => {
        try {
            const {Array_logs, numberOfBlocks} = req.body;
            const db     = await connect();
            Array_logs.forEach((e) => {
                Array.push(e);
            })
            let blockchain   = new Blockchain()
            console.log("N~ blockchain", numberOfBlocks)
            if (numberOfBlocks === 1){
                blockchain.MakeBlockGenesis(1,Array,Fecha)
                const   block = blockchain.getEndBlock()
                let datajson   =  { 
                                    index       :  block.index ,
                                    timestamp   :  block.timestamp,
                                    data        :  block.data,
                                    previousHash:  block.previousHash,
                                    hash        :  block.hash
                                    }
                console.log(datajson)
                await db.collection('Node1').insertOne(datajson)
                res.send(datajson);
            }else{
                const db = await connect();
                const collection = db.collection('Node1');
                const allBlocks = await collection.find().toArray();
                console.log("Blockchain antes de agregar ultimo bloque", allBlocks)
                allBlocks.forEach((blockdata) => 
                {   if (blockdata.index === 1) {
                        blockchain.MakeBlockGenesis(blockdata.index, blockdata.data, blockdata.timestamp);
                    }else {
                        blockchain.AddBlock(new Block(blockdata.index, blockdata.data, blockdata.timestamp));
                    }
                });
                blockchain.AddBlock(new Block(numberOfBlocks,Array, getFecha() ))
                console.log(getFecha())
                let block_1     = blockchain.getEndBlock()
                console.log("Ultimo bloque para agregar", block_1)
                let datajson_1  =  {
                                    index       :  block_1.index ,
                                    timestamp   :  block_1.timestamp,
                                    data        :  block_1.data,
                                    previousHash:  block_1.previousHash,
                                    hash        :  block_1.hash
                                   }  
                await db.collection('Node1').insertOne(datajson_1)
                res.send(datajson_1);        
            }
        }
        catch (e){
            console.log(e)
        };
    }

const updateOne = async (req, res) => {
    res.send('Working');
    };
     
const deleteOne = async (req, res) => {
    res.send('Working');
    };

module.exports = { getAll, createOne, updateOne, deleteOne }