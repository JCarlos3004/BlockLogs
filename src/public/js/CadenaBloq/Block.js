const SHA256   = require('crypto-js/sha256');
const Fecha = require('./Config');

class Block {
    constructor(index, data, previousHash=''){
        this.index        = index,
        this.timestamp    = Fecha,
        this.data         = data,
        this.previousHash = previousHash,
        this.nonce        = 0,
        this.hash         = this.calculateHash()
    }

    calculateHash(){
        return SHA256(this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash + this.nonce).toString()
    }

    MineBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty+1).join('0')){
            this.nonce++
            this.hash = this.calculateHash();
        }
        console.log('Minning Block: ' + this.hash)
    }
}
module.exports = Block;
