const Block = require('./Block');
const BlockChain = require('./Blockchain');

let cutreCoin = new BlockChain()
console.log('Minando bloque 1....')
cutreCoin.AddBlock(new Block('16/10/2018',{ cantidad: 10 }))
console.log('Minando bloque 2....')
cutreCoin.AddBlock(new Block('18/10/2018',{ cantidad: 40 }))
console.log('Minando bloque 3....')
cutreCoin.AddBlock(new Block('29/10/2018',{ cantidad: 1  }))



//console.log(cutreCoin.validarChain());

//cutreCoin.chain[1].data = { cantidad: 200}
//cutreCoin.chain[1].hash = cutreCoin.chain[1].calcularHash[]

//console.log(cutreCoin.validarChain());

console.log(JSON.stringify(cutreCoin, null, 4))