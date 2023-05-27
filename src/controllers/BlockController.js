const blockModel  = require("../database/mongodb/models/blockModel");
const connect     = require("../database/database");
const Block       = require("../public/js/CadenaBloq/Block");
const Blockchain  = require("../public/js/CadenaBloq/Blockchain");
const Fecha       = require("../public/js/CadenaBloq/Config");

///
let Array = [];
let blockchain   = new Blockchain()
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
            if (numberOfBlocks === 1){
                let block      = blockchain.MakeBlockGenesis(1,Array)
                let datajson   =  { 
                                    index       :  block.index ,
                                    timestamp   :  block.timestamp,
                                    data        :  block.data,
                                    previousHash:  block.previousHash,
                                    hash        :  block.hash
                                    }
                await db.collection('Node1').insertOne(datajson)
                res.send(datajson);
            }else{
                blockchain.AddBlock(new Block(numberOfBlocks,Array))
                let block_1     = blockchain.getEndBlock()
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