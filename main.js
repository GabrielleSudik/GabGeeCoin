//learning blockchain through making blockchain
//make sure you npm install -- save crypto.js
//that's the library to allow you to make hashes

//shft alt f to tidy code.

//used to have methods here... moved to blockchain.js
//instead you now have:

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
gabGeeCoin.createTransaction(new Transaction('AddressNo1', 'AddressNo2', 100));
gabGeeCoin.createTransaction(new Transaction('AddressNo2', 'AddressNo1', 50));

console.log('\nStarting the miner...');
gabGeeCoin.minePendingTransactions('Gaby-address');
console.log('\nBalance of Gaby is: ', gabGeeCoin.getBalanceOfAddress('Gaby-address'));

console.log('\nStarting the miner again...');
gabGeeCoin.minePendingTransactions('Gaby-address');
console.log('\nBalance of Gaby is: ', gabGeeCoin.getBalanceOfAddress('Gaby-address'));

console.log('\nStarting the miner again...');
gabGeeCoin.minePendingTransactions('Gaby-address');
console.log('\nBalance of Gaby is: ', gabGeeCoin.getBalanceOfAddress('Gaby-address'));

//why am i only getting 0 as balance? :(

//run in console: "node main.js"