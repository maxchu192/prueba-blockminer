const SHA256 = require('crypto-js/sha256');

const DIFFICULTY = 3;
const MINE_RATE = 3000;

class Block {
    constructor(hash, data, nonce, difficulty, time, previousHash) {
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty;
        this.time = time;
        this.previousHash = previousHash;
    }

    static get genesis() {
        const time = Date.now();
        return new this(
            'Genesis Hash',
            'Genesis Block',
            0,
            DIFFICULTY,
            time,
            undefined
        )
    }

    static mine (previousBlock, data) {
        const {hash:previousHash} = previousBlock;
        let {difficulty} = previousBlock;
        let hash;
        let time;
        let nonce = 0;

        do {
            time = Date.now();
            nonce += 1;
            difficulty = previousBlock.time + MINE_RATE > time ? difficulty + 1 : difficulty - 1;
            hash = SHA256(previousHash + time + data + nonce + difficulty).toString();
        } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));

        return new this(hash, data, nonce, difficulty, time, previousHash)
    }

    toStrings () {
        const {hash, data, nonce, difficulty, time, previousHash} = this
        return `Block - 
        hash: ${hash}
        data: ${data}
        nonce: ${nonce}
        difficulty: ${difficulty}
        time: ${time}
        previousHash: ${previousHash}`
    }
}

module.exports = Block
