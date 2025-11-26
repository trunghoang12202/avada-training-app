import {insertAfter} from '../helpers/insertHelpers';
import {render} from 'preact';
import React from 'preact/compat';
import NotificationPopup from '../components/NotificationPopup/NotificationPopup';
import {getProductLink} from '../helpers/displayHelpers';
import {sleep} from '../helpers/asyncHelpers';
import {
  getStoredNotifications,
  setStopped,
  setCurrentNotificationId,
  removeCurrentNotificationId,
  getCurrentNotificationId,
  setLastShownId,
  isStopped
} from '../helpers/notificationStorage';
import {canRun} from '../helpers/validationHelpers';
import {prepare, getStartIndex} from '../helpers/playlistHelpers';

export default class DisplayManager {
  constructor() {
    this.notifications = [];
    this.settings = {};
    this.container = null;
    this.stopped = false;
  }

  async initialize({notifications, settings}) {
    this.notifications = notifications || [];
    this.settings = settings || {};
    this.container = this.insertContainer();

    this.stopped = isStopped();
    if (this.stopped || !canRun(this.container, this.notifications, this.settings)) {
      return;
    }

    const {continueAfterPageReload = false} = this.settings;
    if (continueAfterPageReload && this.notifications.length === 0) {
      const stored = getStoredNotifications();
      if (stored) {
        this.notifications = stored;
      }
    }

    this.notifications = prepare(this.notifications, this.settings);
    await this.runSequence();
  }

  stop() {
    this.stopped = true;
    setStopped();
    this.fadeOut();
  }

  async processNotification(notification, isLast, displayDuration, popsInterval) {
    if (this.stopped) return false;

    this.display({notification});
    setCurrentNotificationId(notification.id);
    await sleep(displayDuration * 1000);

    if (this.stopped) return false;
    this.fadeOut();

    if (!isLast) {
      await sleep(popsInterval * 1000);
    }

    return true;
  }

  async runSequence() {
    const {
      firstDelay = 5,
      displayDuration = 3,
      popsInterval = 2,
      maxPopsDisplay = 10,
      replayPlaylist = true
    } = this.settings;

    await sleep(firstDelay * 1000);

    const total = Math.min(maxPopsDisplay, this.notifications.length);
    if (!total) return;

    let isReplay = false;

    do {
      if (isReplay) {
        await sleep(popsInterval * 1000);
        removeCurrentNotificationId();
        this.notifications = prepare(this.notifications, this.settings);
      }

      const currentNotificationId = getCurrentNotificationId();
      const startIndex = getStartIndex(this.notifications, currentNotificationId);
      const notificationsToShow = this.notifications.slice(startIndex, startIndex + total);

      let lastShownId = null;
      for (const [index, notification] of notificationsToShow.entries()) {
        const isLast = index === notificationsToShow.length - 1;
        const shouldContinue = await this.processNotification(
          notification,
          isLast,
          displayDuration,
          popsInterval
        );

        if (!shouldContinue) break;
        lastShownId = notification.id;
      }

      if (lastShownId) {
        setLastShownId(lastShownId);
      }

      if (this.stopped || !replayPlaylist) break;

      isReplay = true;
    } while (replayPlaylist);
  }

  fadeOut() {
    const container = this.container || document.querySelector('#Avada-SalePop');
    if (!container) return;

    const wrapper = container.querySelector('.Avava-SP__Container');
    if (!wrapper) {
      render(null, container);
      return;
    }

    wrapper.classList.remove('sp-fade-in');
    wrapper.classList.add('sp-fade-out');

    setTimeout(() => {
      render(null, container);
    }, 450);
  }

  display({notification}) {
    const container = this.container || document.querySelector('#Avada-SalePop');
    if (!container) return;

    const productLink = getProductLink(notification.handle);

    render(
      <NotificationPopup
        {...notification}
        relativeDate={notification.timestamp}
        productLink={productLink}
        settingsValue={this.settings}
        onClose={() => this.stop()}
      />,
      container
    );

    requestAnimationFrame(() => {
      const wrapper = container.querySelector('.Avava-SP__Container');
      if (wrapper) {
        wrapper.classList.remove('sp-fade-out');
        wrapper.classList.add('sp-fade-in');
      }
    });
  }

  insertContainer() {
    const popupEl = document.createElement('div');
    popupEl.id = 'Avada-SalePop';
    popupEl.classList.add('Avada-SalePop__OuterWrapper');

    const targetEl = document.querySelector('body').firstChild;
    if (targetEl) insertAfter(popupEl, targetEl);

    return popupEl;
  }
}
