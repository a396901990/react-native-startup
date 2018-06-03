import { combineReducers } from 'redux';
export const reducers = combineReducers({
  App: require('./AppRedux').reducer,
  Web3: require('./Web3Redux').reducer,
  Payer: require('./PayerRedux').reducer,
  Receiver: require('./ReceiverRedux').reducer,
});
