//this file creates the keys so people can't make and use each other's money

//use the library that creates keys
//needed npm install elliptic in console
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

//create the two keys:
const key = ec.genKeyPair();
const publicKey = key.getPublic('hex');
const privateKey = key.getPrivate('hex');

console.log();
console.log('Private key: ', privateKey);
console.log();
console.log('Public key: ', publicKey);

//atm, your console can't find elliptic. try restarting VSCode.