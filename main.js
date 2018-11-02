//learning blockchain through making blockchain
//make sure you npm install -- save crypto.js
//that's the library to allow you to make hashes

//shft alt f to tidy code.

const SHA256 = require('crypto.js/sha256');

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.has = '';
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp
            + JSON.stringify(this.data));
    }
}
