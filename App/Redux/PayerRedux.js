export const PayerTypes = {
  PAYER_ACCEPT: 'PAYER_ACCEPT', 
  PAYER_CANCEL: 'PAYER_CANCEL',
  PAYER_CALL_ARBITRATOR: 'PAYER_CALL_ARBITRATOR' 
};

export const PayerCreators = {
  payerAccept: () => {
    return {
      type: PayerTypes.PAYER_ACCEPT,

    }
  },
  payerCancel: () => {
    return {
      type: PayerTypes.PAYER_CANCEL,
    }
  },

};

const INITIAL_STATE = { 

};

export function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case PayerTypes.PAYER_ACCEPT:
      return {
        ...state,
        
      };
    default:
      return state;
  }
}
