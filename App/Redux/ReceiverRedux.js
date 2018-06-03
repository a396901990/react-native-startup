export const ReceiverTypes = {
  RECEIVER_ACCEPT: 'RECEIVER_ACCEPT',
  RECEIVER_CANCEL: 'RECEIVER_CANCEL',
  RECEIVER_CALL_ARBITRATOR: 'RECEIVER_CALL_ARBITRATOR' 
};

export const PayerCreators = {
  payerAccept: () => {
    return {
      type: ReceiverTypes.RECEIVER_ACCEPT,

    }
  },
  payerCancel: () => {
    return {
      type: ReceiverTypes.RECEIVER_CANCEL,
    }
  },

};

const INITIAL_STATE = { 

};

export function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case ReceiverTypes.RECEIVER_ACCEPT:
      return {
        ...state,
        
      };
    default:
      return state;
  }
}
