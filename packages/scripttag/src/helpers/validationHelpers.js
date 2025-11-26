import {ALLOW_SHOW_OPTIONS} from '../const/setting';
import {shouldHideOnMobile} from './displayHelpers';
import {isStopped} from './notificationStorage';

const getPageType = () => {
  try {
    const pageType = globalThis.ShopifyAnalytics?.meta?.page?.pageType;
    if (pageType) return pageType;
  } catch (e) {
    console.log(e);
  }

  return 'other';
};

const shouldShowOnThisUrl = settings => {
  const {allowShow = ALLOW_SHOW_OPTIONS.ALL, specificPages = [], showOnMobile = true} = settings;

  if (shouldHideOnMobile({showOnMobile})) return false;

  const pageType = getPageType();

  if (allowShow === ALLOW_SHOW_OPTIONS.ALL) return true;

  if (allowShow === ALLOW_SHOW_OPTIONS.HOME_PAGE) {
    return pageType === 'home';
  }

  if (allowShow === ALLOW_SHOW_OPTIONS.SPECIFIC_PAGES) {
    if (!specificPages.length) return false;

    return specificPages.includes(pageType);
  }

  return true;
};

const canRun = (container, notifications, settings) => {
  if (!container) return false;
  if (!notifications?.length) return false;
  if (!shouldShowOnThisUrl(settings)) return false;

  return true;
};

export {getPageType, shouldShowOnThisUrl, canRun};
