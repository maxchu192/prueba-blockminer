const Blockchain = require('./src/blockchain.js');

const blockchain = new Blockchain();

for (let i = 0; i < 10; i++) {
    const block = blockchain.addBlock(`Block #${i}`);
    console.log(block.toStrings());    
}