import Web3 from './web3';

let instance = null;

export default class Web3Service {
  static sharedInstance() {
    return new Web3Service();
  }

  static deleteSharedInstance() {
    instance = null;
  }

  constructor(provider = '') {
    if (!instance) {
      instance = new Web3(provider);
    }
    return instance;
  }
}