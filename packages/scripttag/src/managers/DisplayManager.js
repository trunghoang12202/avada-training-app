import {insertAfter} from '../helpers/insertHelpers';
import {render} from 'preact';
import React from 'preact/compat';
import NotificationPopup from '../components/NotificationPopup/NotificationPopup';
import moment from 'moment';
import {ALLOW_SHOW_OPTIONS, SPECTIFIC_PAGES_OPTIONS, DISPLAY_BY_OPTIONS} from '../const/setting';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default class DisplayManager {
  constructor() {
    this.notifications = [];
    this.settings = {};
    this.container = null;
  }

  async initialize({notifications, settings}) {
    this.notifications = notifications || [];
    this.settings = settings || {};
    this.container = this.insertContainer();

    if (!this.shouldShowOnThisUrl()) return;
    if (!this.notifications.length) return;

    this.prepareNotifications();
    await this.runSequence();
  }

  getPageType() {
    try {
      const pageType = window.ShopifyAnalytics?.meta?.page?.pageType;
      if (pageType) return pageType;
    } catch (e) {}

    const path = window.location.pathname;
    if (path === '/' || path === '') return 'home';
    if (path.includes('/products/')) return 'product';
    if (path.includes('/collections/')) return 'collection';
    if (path.includes('/cart')) return 'cart';
    if (path.includes('/blogs/') || path.includes('/blog/')) return 'blog';

    return 'other';
  }

  shouldShowOnThisUrl() {
    const {
      allowShow = ALLOW_SHOW_OPTIONS.ALL,
      specificPages = [],
      showOnMobile = true
    } = this.settings;

    if (!showOnMobile && window.innerWidth < 768) return false;

    const pageType = this.getPageType();

    if (allowShow === ALLOW_SHOW_OPTIONS.ALL) return true;

    if (allowShow === ALLOW_SHOW_OPTIONS.HOME_PAGE) {
      return pageType === 'home';
    }

    if (allowShow === ALLOW_SHOW_OPTIONS.SPECIFIC_PAGES) {
      if (!specificPages.length) return false;

      return specificPages.some(page => {
        switch (page) {
          case SPECTIFIC_PAGES_OPTIONS.HOME:
            return pageType === 'home';
          case SPECTIFIC_PAGES_OPTIONS.CART:
            return pageType === 'cart';
          case SPECTIFIC_PAGES_OPTIONS.COLLECTION:
            return pageType === 'collection';
          case SPECTIFIC_PAGES_OPTIONS.PRODUCT:
            return pageType === 'product';
          case SPECTIFIC_PAGES_OPTIONS.BLOG:
            return pageType === 'blog';
          default:
            return false;
        }
      });
    }

    return true;
  }

  prepareNotifications() {
    const {displayBy = DISPLAY_BY_OPTIONS.ORDER} = this.settings;

    if (displayBy === DISPLAY_BY_OPTIONS.RANDOM) {
      this.notifications = [...this.notifications].sort(() => Math.random() - 0.5);
    }
  }

  async runSequence() {
    const {
      firstDelay = 5,
      displayDuration = 3,
      popsInterval = 2,
      maxPopsDisplay = 10
    } = this.settings;

    if (firstDelay > 0) await sleep(firstDelay * 1000);

    const total = Math.min(maxPopsDisplay, this.notifications.length);

    for (let i = 0; i < total; i++) {
      const notification = this.notifications[i];

      this.display({notification});

      if (displayDuration > 0) await sleep(displayDuration * 1000);

      this.fadeOut();

      const last = i === total - 1;
      if (!last && popsInterval > 0) {
        await sleep(popsInterval * 1000);
      }
    }
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

    const {hideTimeAgo, truncateProductName, showOnMobile, position} = this.settings;
    const relativeDate = notification.timestamp ? moment(notification.timestamp).fromNow() : '';
    const productLink = `https://${window.Shopify.shop}/products/${notification.handle}`;

    render(
      <NotificationPopup
        {...notification}
        relativeDate={!hideTimeAgo ? relativeDate : ''}
        productLink={productLink}
        settingsValue={{
          hideTimeAgo,
          truncateProductName,
          showOnMobile,
          position
        }}
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
