const fs = require('fs-extra');
const path = require('path');
const solc = require('solc');


const build = path.resolve(__dirname, 'compiled');

fs.removeSync(build);

const escrows = path.resolve(__dirname, 'contract', 'Escrows.sol');
const source = fs.readFileSync(escrows, 'utf8');
const output = solc.compile(source, 1).contracts;

fs.ensureDirSync(build);

for(let contract in output) {
  fs.outputJsonSync(
    path.resolve(build, contract.replace(':', '') + '.json'),
    output[contract]
  );
}