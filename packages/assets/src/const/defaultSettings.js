export const ALLOW_SHOW_OPTIONS = {
  ALL: 'all',
  SPECIFIC_PAGES: 'specificPages',
  HOME_PAGE: 'home'
};

export const SPECTIFIC_PAGES_OPTIONS = {
  HOME: 'home',
  CART: 'cart',
  COLLECTION: 'collection',
  PRODUCT: 'product',
  BLOG: 'blog'
};

export const DISPLAY_BY_OPTIONS = {
  ORDER: 'order',
  RANDOM: 'random'
};

export const POSITION_OPTIONS = {
  TOP_LEFT: 'top-left',
  TOP_RIGHT: 'top-right',
  BOTTOM_LEFT: 'bottom-left',
  BOTTOM_RIGHT: 'bottom-right',
  TOP: 'top',
  BOTTOM: 'bottom'
};

export const defaultSettings = {
  allowShow: [ALLOW_SHOW_OPTIONS.ALL],
  specificPages: [],
  displayDuration: 3,
  excludedUrls: '',
  firstDelay: 5,
  hideTimeAgo: false,
  includedUrls: '',
  maxPopsDisplay: 10,
  popsInterval: 2,
  position: POSITION_OPTIONS.TOP_LEFT,
  truncateProductName: false,
  showOnMobile: false,
  displayBy: DISPLAY_BY_OPTIONS.ORDER,
  hideCloseButton: true,
  headingText: '{{first_name}} in {{city}}, {{country}}',
  contentText: 'Purchased {{product_name}}',
  hideCustomerName: false,
  replayPlaylist: false,
  continueAfterPageReload: false,
  backgroundColorStart: '#1983ff',
  backgroundColorEnd: '#1983ff',
  headingColor: '#ffffff',
  textColor: '#ffffff',
  timeColor: '#ffffff'
};
