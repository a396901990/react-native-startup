const escrow = require('./escrow');

const test = async () => {
  const test = await escrow.methods;
  console.log('res: ', test);
}

test()