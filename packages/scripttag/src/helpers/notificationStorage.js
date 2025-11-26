import {STORAGE_KEYS} from '../const/storage';
import {getStorage, setStorage, removeStorage} from './storageHelpers';

const getStoppedTimestamp = () => {
  const timestamp = getStorage(STORAGE_KEYS.STOPPED);
  return timestamp ? Number(timestamp) : null;
};

const isStopped = () => {
  const timestamp = getStoppedTimestamp();
  if (!timestamp) return false;
  if (Date.now() < timestamp) return true;
  removeStorage(STORAGE_KEYS.STOPPED);
  return false;
};

const setStopped = () => {
  setStorage(STORAGE_KEYS.STOPPED, (Date.now() + 24 * 60 * 60 * 1000).toString());
};

const getCurrentNotificationId = () => {
  return getStorage(STORAGE_KEYS.CURRENT);
};

const setCurrentNotificationId = id => {
  setStorage(STORAGE_KEYS.CURRENT, id);
};

const removeCurrentNotificationId = () => {
  removeStorage(STORAGE_KEYS.CURRENT);
};

const getLastShownId = () => {
  return getStorage(STORAGE_KEYS.LAST_SHOWN);
};

const setLastShownId = id => {
  setStorage(STORAGE_KEYS.LAST_SHOWN, id);
};

const getStoredNotificationIds = () => {
  return getStorage(STORAGE_KEYS.NOTIFICATIONS);
};

const setStoredNotificationIds = ids => {
  setStorage(STORAGE_KEYS.NOTIFICATIONS, ids);
};

const getStoredNotifications = () => {
  return getStorage(STORAGE_KEYS.NOTIFICATIONS);
};

export {
  getStoppedTimestamp,
  isStopped,
  setStopped,
  getCurrentNotificationId,
  setCurrentNotificationId,
  removeCurrentNotificationId,
  getLastShownId,
  setLastShownId,
  getStoredNotificationIds,
  setStoredNotificationIds,
  getStoredNotifications
};
