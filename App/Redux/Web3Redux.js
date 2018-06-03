export const Web3Types = {
  CONNECT_TO_WEB3_PROVIDER: 'CONNECT_TO_WEB3_PROVIDER',
  SET_WEB3_PROVIDER: 'SET_WEB3_PROVIDER',
  SET_WEB3_IS_CONNECTED: 'SET_WEB3_IS_CONNECTED',
  SET_CONNECT_WEB3_ERROR: 'SET_CONNECT_WEB3_ERROR',
  SET_WEB3_INFO: 'SET_WEB3_INFO',
  SET_ESCROW_INSTANCE: 'SET_ESCROW_INSTANCE',
  CREATE_PUBLIC_KEY: 'CREATE_PUBLIC_KEY',
  CREATE_PUBLIC_KEY_SUCCESS: 'CREATE_PUBLIC_KEY_SUCCESS', 
};

export const Web3Creators = {
  connectToWeb3Provider: () => {
    return {
      type: Web3Types.CONNECT_TO_WEB3_PROVIDER,
    }
  },

  setWeb3Provider: ({provider}) => {
    return {
      type: Web3Types.SET_WEB3_PROVIDER,
      provider
    }
  },

  getInstanceOfContract: ({provider}) => {
    return {
      type: Web3Types.GET_INSTANCE_OF_CONTRACT,
      provider
    }
  },

  setWeb3IsConnected: ({ isConnected, error = '' }) => {
    return { 
      type: Web3Types.SET_WEB3_IS_CONNECTED, 
      isConnected, 
      error, 
      // isLoading: isConnected 
    };
  },

  setEscrowInstance: ({instance}) => {
    return {
      type: Web3Types.SET_ESCROW_INSTANCE,
      instance
    }
  },

  setWeb3Info: ({accounts = [], web3Provided = null}) => {
   return {
     type: Web3Types.SET_WEB3_INFO,
     accounts,
     web3Provided
   } 
  },
  createPublicKey: ({provider}) => {
    return {
      type: Web3Types.CREATE_PUBLIC_KEY,
      provider
    }
  },
  createPublicKeySuccess: (address) => {
    return {
      type: Web3Types.CREATE_PUBLIC_KEY_SUCCESS,
      address
    }
  }
};

const INITIAL_STATE = { 
  provider: '',
  error: '',
  isConnected: false,
  isLoading: false,
  accounts: [],
  public_key: '',
  web3Provided: null
  // payerAccount: '',
  // receiverAccount: '',
  // arbitorAccount: ''
 };

export function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    
    case Web3Types.SET_WEB3_PROVIDER:
      return {
        ...state,
        provider: action.provider
      };
    case Web3Types.SET_WEB3_IS_CONNECTED: 
      return {
        ...state,
        isConnected: action.isConnected,
        error: action.error
      }
    case Web3Types.SET_WEB3_INFO: 
      return {
        ...state,
        accounts: action.accounts,
        isLoading: action.isLoading,
        web3Provided: action.web3Provided 
        // payerAccount: action.accounts[2],
        // receiverAccount: action.accounts[3],
        // arbitorAccount: action.accounts[4]
      }
    case Web3Types.SET_ESCROW_INSTANCE: 
      return {
        ...state,
        instance: action.instance
      }
    case Web3Types.CREATE_PUBLIC_KEY_SUCCESS: 
      return {
        ...state,
        public_key: action.address
      }
  
    default:
      return state;
  }
}
