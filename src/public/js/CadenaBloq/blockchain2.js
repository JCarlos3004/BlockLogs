const Block = require('./block');

class BlockChain {
    constructor(){
        this.dificultad = 1
        this.chain = [this.crearBloqueGenesis()];
    }

    crearBloqueGenesis(){
        return new Block('01/01/2018', 'Bloque Genesis', '0');
    }

    getUltimoBloque(){
        return this.chain[this.chain.length - 1];
    }

    agregarBloque(nuevoBloque){
        nuevoBloque.hashPrevio = this.getUltimoBloque().hash;
        nuevoBloque.minarBloque(this.dificultad)
        this.chain.push(nuevoBloque);
    }

    validarChain(){
        for (let i=1; i<this.chain.length; i++){
            const bloqueActual   = this.chain[i];
            const bloqueAnterior = this.chain[i-1];
            
            if(bloqueActual.hash != bloqueActual.calcularHash()){
                return false
            }
            if (bloqueActual.hashPrevio != bloqueAnterior.hash){
                return false
            }
        }
        return true
    }


}

module.exports = BlockChain;