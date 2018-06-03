import { takeLatest, all } from 'redux-saga/effects';

import { AppTypes } from '../Redux/AppRedux';
import { Web3Types } from '../Redux/Web3Redux';
import * as AppSagas from '../Sagas/AppSaga';
import { Web3Watcher, publicKeyWatcher } from '../Sagas/Web3Saga';

export default function* root() {
  yield all([
    takeLatest(AppTypes.INIT_APP, AppSagas.initApp),
    takeLatest(AppTypes.SIGNUP, AppSagas.signup),
    takeLatest(AppTypes.LOGIN, AppSagas.login),
    takeLatest(AppTypes.LOGOUT, AppSagas.logout),
    takeLatest(AppTypes.FETCH_TRANSCATION, AppSagas.fetchAllTransaction),
    Web3Watcher(),
    publicKeyWatcher()
  ]);
}
