import { delay } from 'redux-saga';
import { take, takeLatest, apply, put, call, fork, cancel, cancelled } from 'redux-saga/effects';
import { Web3Creators, Web3Types } from '../Redux/Web3Redux';
import Escrow from '../../ethereum/compiled/Escrows.json';

import Web3 from '../Services/Web3';

import { ec as EC } from "elliptic";
import BN from "bn.js";
const ec = new EC('secp256k1');
let accounts;
const G = ec.g; // Generator point

export function* web3SetProvider({provider}) {
  const web3 = Web3.sharedInstance();
  yield apply(web3, 'setProvider', [provider]);
  const { eth } = web3;
  console.tron.display({
    name: 'web3',
    value: web3
  })
  accounts = yield apply(eth, 'getAccounts', []);

  
  console.tron.display({
    name: 'accounts',
    value: accounts
  })
  const blockNumber = yield apply(eth, 'getBlockNumber', []);

  console.tron.display({
    name: 'blockNumber',
    value: blockNumber
  })
  const instance = new eth.Contract(JSON.parse(Escrow.interface), '0x13916ae8EE2F0cf49Afb70c1Ad20cC5a3d28ac94')
  try {
    yield put(Web3Creators.setWeb3Info({accounts, web3Provided: web3}));
    yield put(Web3Creators.setEscrowInstance({instance}))

  } catch (e) {
    yield put(Web3Creators.setWeb3IsConnected({isConnected: false, error: e}));
  }
}

function makeid() {
  var text = "";
  var possible = "abcdef0123456789";

  for (var i = 0; i < 64; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

export function* publickeyGenerator({provider}) {

  const web3 = Web3.sharedInstance();
  
  const { eth } = web3;
  // console.tron.display({
  //   name: 'web3',
  //   value: web3
  // })

  const accounts = yield apply(eth, 'getAccounts', []);
  const randomtext = makeid();
  // console.tron.display({
  //   name: 'randomtext',
  //   value: randomtext
  // }) 
  try {
    const newAccount = eth.accounts.privateKeyToAccount('0x'+randomtext);
    console.tron.display({
      name: 'newAccount',
      value: newAccount
    })

    console.tron.display({
      name: 'new account address',
      value: newAccount.address
    })

   
    const getBalance2 = yield apply(eth, 'getBalance', [accounts[8]]); 
    console.tron.display({
      name: 'accounts 8',
      value: getBalance2
    });  

    const sendEth = yield apply(eth, 'sendTransaction', [{
      from: accounts[8],
      to: newAccount.address,
      value: 5000000000000000000,
    }]
    );
    
    console.tron.display({
      name: 'sendeth',
      value: sendEth
    });

    const getBalance = yield apply(eth, 'getBalance', [newAccount.address]);
    console.tron.display({
      name: 'new account balance',
      value: getBalance
    }); 

    yield put(Web3Creators.createPublicKeySuccess(newAccount.address))
  } catch(e) {
    console.tron.log(e)
  }
}

export function* Web3Watcher() {
  while (true) {
    const { provider } = yield take(Web3Types.SET_WEB3_PROVIDER);
    yield fork(web3SetProvider,  {provider});
  }
}

export function* publicKeyWatcher() {
  while (true) {
    const { provider } = yield take(Web3Types.CREATE_PUBLIC_KEY);
    
    yield fork(publickeyGenerator,  {provider});
  }
}


