const { Timestamp } = require('mongodb');
const Block = require('./Block');

class Blockchain {
    difficulty = 2; 
    constructor(){
        this.chain = []//[this.MakeBlockGenesis(index, data, timestamp)];
    }

    MakeBlockGenesis(index, data, timestamp){
        //return new Block(index, data, timestamp, '0' );
        return this.chain.push(new Block(index, data, timestamp, '0' ))
    }

    getEndBlock(){
        return this.chain[this.chain.length -1];
    }

    AddBlock(newBlock){
        newBlock.previousHash = this.getEndBlock().hash;
        newBlock.MineBlock(this.difficulty);
        this.chain.push(newBlock);
        console.log(this.chain)
    }

    ValidateChain(){
        for(let i=1; i<this.chain.length; i++){
            const currentBlock = this.chain[i];
            const beforeBlock  = this.chain[i-1];
            if (currentBlock.hash != currentBlock.calculateHash()){
                return False
            }
            if (currentBlock.previousHash != beforeBlock.hash){
                return false
            }
        }
        return true
    }
}

module.exports = Blockchain;