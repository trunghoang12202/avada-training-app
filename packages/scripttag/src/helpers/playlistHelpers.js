import {DISPLAY_BY_OPTIONS} from '../const/setting';
import {
  getStoredNotificationIds,
  getLastShownId,
  setStoredNotificationIds
} from './notificationStorage';

const shuffle = (notifications, lastShownId) => {
  const shuffled = [...notifications].sort(() => Math.random() - 0.5);

  if (!lastShownId || shuffled.length <= 1) return shuffled;

  const firstId = shuffled[0]?.id;
  if (firstId !== lastShownId) return shuffled;

  const swapIndex = Math.floor(Math.random() * (shuffled.length - 1)) + 1;
  [shuffled[0], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[0]];

  return shuffled;
};

const restoreFromStorage = (storedIds, currentNotifications) => {
  const notificationMap = new Map(currentNotifications.map(n => [n.id, n]));
  return storedIds.map(id => notificationMap.get(id)).filter(Boolean);
};

const prepare = (notifications, settings) => {
  const {displayBy = DISPLAY_BY_OPTIONS.ORDER, continueAfterPageReload = false} = settings;

  const storedIds = getStoredNotificationIds();

  const currentIds = notifications.map(n => n.id);
  const currentIdsString = currentIds.join('|');
  const storedIdsString = storedIds ? storedIds.join('|') : '';

  const hasNewNotifications = currentIdsString !== storedIdsString;
  const shouldRestore = !hasNewNotifications && storedIds && continueAfterPageReload;

  if (shouldRestore) {
    return restoreFromStorage(storedIds, notifications);
  }

  let preparedNotifications = notifications;

  if (displayBy === DISPLAY_BY_OPTIONS.RANDOM) {
    const lastShownId = getLastShownId();
    preparedNotifications = shuffle(notifications, lastShownId);
  }

  setStoredNotificationIds(preparedNotifications.map(n => n.id));

  return preparedNotifications;
};

const getStartIndex = (notifications, currentNotificationId) => {
  if (!currentNotificationId) return 0;

  const foundIndex = notifications.findIndex(n => n.id === currentNotificationId);
  if (foundIndex >= 0) {
    return foundIndex + 1;
  }

  return 0;
};

export {shuffle, restoreFromStorage, prepare, getStartIndex};
