export const AppTypes = {
  INIT_APP: 'INIT_APP',
  CHANGE_ROOT: 'CHANGE_ROOT',
  UPDATE_USER_INFO: 'UPDATE_USER_INFO',
  UPDATE_TRANSCATION: 'UPDATE_TRANSCATION',
  FETCH_TRANSCATION: 'FETCH_TRANSCATION',
  LOGIN: 'LOGIN',
  SIGNUP: 'SIGNUP',
  LOGOUT: 'LOGOUT'
};

export const AppCreators = {
  initApp: () => {
    return {
      type: AppTypes.INIT_APP
    };
  },
  changeRoot: root => {
    return {
      type: AppTypes.CHANGE_ROOT,
      root: root
    };
  },
  login: userInfo => {
    return {
      type: AppTypes.LOGIN,
      userInfo: userInfo
    };
  },
  signup: userInfo => {
    return {
      type: AppTypes.SIGNUP,
      userInfo: userInfo
    };
  },
  logout: () => {
    return {
      type: AppTypes.LOGOUT
    };
  },
  updateUserInfo: userInfo => {
    return {
      type: AppTypes.UPDATE_USER_INFO,
      userInfo: userInfo
    };
  },
  fetchTransaction: () => {
    return {
      type: AppTypes.FETCH_TRANSCATION
    };
  },
  updateTransaction: transaction => {
    return {
      type: AppTypes.UPDATE_TRANSCATION,
      transaction: transaction
    };
  }
};

const INITIAL_STATE = { root: 'WELCOME', transaction: [] };
export function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case AppTypes.CHANGE_ROOT:
      return {
        ...state,
        root: action.root
      };
    case AppTypes.UPDATE_USER_INFO:
      return {
        ...state,
        ...action.userInfo
      };
    case AppTypes.UPDATE_TRANSCATION:
      return {
        ...state,
        transaction: action.transaction
      };
    default:
      return state;
  }
}
