import { AppCreators } from '../Redux/AppRedux';
import { call, put, select, apply } from 'redux-saga/effects';
import * as StorageService from '../Service/StorageService';
import * as API from '../Service/API';
import * as APIService from '../Service/API/APIService';

export function* initApp() {
  try {
    const userInfo = yield call(StorageService.getAppUserInfo);
    if (userInfo) {
      yield put(AppCreators.changeRoot('HOME'));
      yield apply(API, 'setToken', [userInfo.jwt]);
      yield put(AppCreators.updateUserInfo({ userInfo }));
    } else {
      yield put(AppCreators.changeRoot('WELCOME'));
    }
  } catch (e) {
    yield put(AppCreators.changeRoot('WELCOME'));
  }
}

export function* login({ userInfo }) {
  yield call(StorageService.saveAppUserInfo, userInfo);
  yield put(AppCreators.changeRoot('HOME'));
  yield put(AppCreators.updateUserInfo({ userInfo }));
  yield apply(API, 'setToken', [userInfo.jwt]);
}

export function* signup({ userInfo }) {
  yield call(StorageService.saveAppUserInfo, userInfo);
  yield put(AppCreators.changeRoot('HOME'));
  yield put(AppCreators.updateUserInfo({ userInfo }));
  yield apply(API, 'setToken', [userInfo.jwt]);
}

export function* logout() {
  yield put(AppCreators.updateUserInfo(null));
  yield put(AppCreators.changeRoot('WELCOME'));
  yield call(StorageService.clearAppUserInfo);
}

export function* fetchAllTransaction() {
  try {
    const result = yield call(APIService.fetchTransaction);
    yield put(AppCreators.updateTransaction(result));
  } catch (e) {}
}
