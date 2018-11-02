//learning blockchain through making blockchain
//make sure you npm install -- save crypto.js
//that's the library to allow you to make hashes

//shft alt f to tidy code.

const SHA256 = require('crypto-js/sha256');
//gab! sha256 or sha256.js?

//the basic block:
class Block {
    //what's in it:
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        //the nonce is a random extra integer 
        //that has nothing to do with the block, but
        //can be used to increment
        //see the mineBlock method, e.g.
        this.nonce = 0;
    }

    //how it gets its own hash:
    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp
            + JSON.stringify(this.data) + this.nonce).toString();
    }

    //proof-of-work method, so blocks can't be created too quickly
    //all together our code requires that each created hash have
    //[difficulty] number of 0s at the beginning
    //the more zeros, the longer the calculations take
    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty+1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("Block mined: " + this.hash);
    }
}



class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        //if you didn't create the first block manually
        //this could be empty
        //instead, you initialize this array with the first block in it.
        this.difficulty = 4;
        //we set difficulty as a variable that will tell
        //mineBlock how hard to make the puzzle
    }

    //first block is called Genesis Block
    //it must be created manually
    //here's a method to do that:
    createGenesisBlock(){
        return new Block(0, "01/01/2018", "Genesis Block data here.", "0");
        //see how this is creating one instance of your class Block?
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
        //ie, array index of the last block
    }

    //this method instructs the program what to do to add a new block
    //IRL it would be more complicated, with checks, etc
    //but this is fine for your first one.
    addBlock(newBlock){
        //set the previosHash, which is the current hash of the last block"
        newBlock.previousHash = this.getLatestBlock().hash;
        //calc the hash for the new block:
        //newBlock.hash = newBlock.calculateHash();
        newBlock.mineBlock(this.difficulty);
        //add the new block to the chain:
        this.chain.push(newBlock);
    }

    //confirm that hashes match the way they should
    //this is a validating step to confirm chain's integrity
    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            //test is current hash is still valid:
            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            //test if current block's previousHash
            //equals the previous' block's hash:
            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }

        //if those two tests are not false, return true
        return true;
    }
}

//let's test by creating an instance:

let gabGeeCoin = new Blockchain();
console.log("Mining block 1...");
gabGeeCoin.addBlock(new Block(1, "10/25/2018", {amount: 5}));
console.log("Mining block 2...");
gabGeeCoin.addBlock(new Block(2, "10/28/2018", {amount: 8}));

//second test of code: run the validity method
//console.log('Is blockchain valid? ' + gabGeeCoin.isChainValid());  //true

//let's tamper with block 2 and see what happens.
//just manually change the data part
//gabGeeCoin.chain[1].data = {amount: 100};

//console.log('Is blockchain valid? ' + gabGeeCoin.isChainValid());  //false

//what if you also try to change a hash during the tamper?
//gabGeeCoin.chain[1].data = {amount: 50};
//gabGeeCoin.chain[1].hash = gabGeeCoin.chain[1].calculateHash();

//console.log('Is blockchain valid? ' + gabGeeCoin.isChainValid());  //false
//still false because the "new" hash doesn't match the subsequent block's previous hash.

//first test of code: see if the chain creates properly:
//console.log(JSON.stringify(gabGeeCoin, null, 4));

