const Web3 = require('./web3.min.js');

// const web3 = new Web3Service.sharedInstance();
const web3 = new Web3();
const provider = new web3.providers.HttpProvider("http://13.230.241.186:8545");

web3.setProvider(provider);

module.exports = web3;