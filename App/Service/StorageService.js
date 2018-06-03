import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

let STORAGE = null;
const APPUSERINFO = 'APPUSERINFO';
function getInstance() {
  if (!STORAGE) {
    STORAGE = new Storage({
      size: 1000,
      storageBackend: AsyncStorage,
      defaultExpires: 10 * 1000 * 3600 * 24 * 100,
      enableCache: true
    });
  }
  return STORAGE;
}

export function save(key, data) {
  return getInstance().save({
    key: key,
    data: data
  });
}

function remove(key) {
  getInstance().remove({
    key: key
  });
  STORAGE = null;
}

export function load(key) {
  return getInstance().load({
    key: key
  });
}

export function saveAppUserInfo(userInfo) {
  return save(APPUSERINFO, userInfo);
}

export function getAppUserInfo() {
  return load(APPUSERINFO);
}

export function clearAppUserInfo() {
  return remove(APPUSERINFO);
}
