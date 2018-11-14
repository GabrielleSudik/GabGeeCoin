//learning blockchain through making blockchain
//make sure you npm install -- save crypto.js
//that's the library to allow you to make hashes

//shft alt f to tidy code.

//used to have methods here... moved to blockchain.js
//instead you now have just the main and some tests

//also have the imported statements:
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

//and we want to use keys (created with "node keygenerator.js'")
const myKey = ec.keyFromPrivate('248150ac3cc4a110acdef1f856df0fb0ce264887fe0ca2e414b9f17fca3498e2');
const myWalletAddress = myKey.getPublic('hex');

//imports these two methods from blockchain.js:
const {Blockchain, Transaction} = require('./blockchain');
//tip: hover on the part in quotes, it will show you the full path

//let's test by creating an instance:

let gabGeeCoin = new Blockchain();
/*
console.log("Mining block 1...");
gabGeeCoin.addBlock(new Block(1, "10/25/2018", {amount: 5}));
console.log("Mining block 2...");
gabGeeCoin.addBlock(new Block(2, "10/28/2018", {amount: 8}));
*/

//create first transaction:
const tx1 = new Transaction(myWalletAddress, 'public key goes here', 100);
tx1.signTransaction(myKey);
gabGeeCoin.addTransaction(tx1);


//second transaction
const tx2 = new Transaction(myWalletAddress, 'public key goes here', 50);
tx2.signTransaction(myKey);
gabGeeCoin.addTransaction(tx2);


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

//testing transaction code:
//later commented out after you added the key stuff into the creation lines.
//gabGeeCoin.createTransaction(new Transaction('AddressNo1', 'AddressNo2', 100));
//gabGeeCoin.createTransaction(new Transaction('AddressNo2', 'AddressNo1', 50));

console.log('\nStarting the miner...');
gabGeeCoin.minePendingTransactions(myWalletAddress);
console.log('\nBalance of Gaby is: ', gabGeeCoin.getBalanceOfAddress(myWalletAddress));

console.log('\nStarting the miner again...');
gabGeeCoin.minePendingTransactions(myWalletAddress);
console.log('\nBalance of Gaby is: ', gabGeeCoin.getBalanceOfAddress(myWalletAddress));

console.log('\nStarting the miner again...');
gabGeeCoin.minePendingTransactions(myWalletAddress);
console.log('\nBalance of Gaby is: ', gabGeeCoin.getBalanceOfAddress(myWalletAddress));

//i should be getting a reward and transfering some

//run in console: "node main.js"

console.log('Is chain valid?', gabGeeCoin.isChainValid()); //true

//let's try to tamper with the second block, first transaction:
gabGeeCoin.chain[1].transactions[0].amount = 1;

console.log('Is chain valid?', gabGeeCoin.isChainValid()); //false
//false because signatures no longer match.

//I'm having trouble following the math. hmm. but it's working.