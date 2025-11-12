import {SettingsIcon, ShareIcon} from '@shopify/polaris-icons';

const menuIcons = [
  {
    icon: ShareIcon,
    destination: '/'
  },
  {
    icon: SettingsIcon,
    destination: '/notifications'
  },
  {
    icon: SettingsIcon,
    destination: '/settings'
  }
];

export const getMenuIcon = url => menuIcons.find(x => x.destination === url)?.icon || SettingsIcon;
