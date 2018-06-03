const web3 = require('./Web3');
const Escrow = require('./compiled/Escrows.json');

const instance = new web3.eth.Contract(
  JSON.parse(Escrow.interface),
  '0x27E36dBC4ef2ED8B02067F56CE8d611087Cf8Cd4'
);

module.exports = instance;