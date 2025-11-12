import React, {useState} from 'react';
import {useParams} from 'react-router';
import {Frame, Navigation, TopBar} from '@shopify/polaris';
import {HomeIcon, NotificationIcon, SettingsIcon} from '@shopify/polaris-icons';
import HomePage from '@assets/components/HomePage/HomePage';
import NotificationPage from '@assets/components/NotificationPage/NotificationPage';

const userMenuMarkup = <TopBar.UserMenu initials="A" name="Avada Group" />;
const topBarMarkup = <TopBar showNavigationToggle userMenu={userMenuMarkup} />;

const NavigationMarkup = () => {
  const {tab = ''} = useParams();
  return (
    <Navigation location="/">
      <Navigation.Section
        separator
        items={[
          {
            url: '/app',
            selected: tab === '',
            label: 'Home',
            icon: HomeIcon
          },
          {
            url: '/app/notifications',
            selected: tab === 'notifications',
            label: 'Notifications',
            icon: NotificationIcon
          },
          {
            url: '/app/settings',
            selected: tab === 'settings',
            label: 'Settings',
            icon: SettingsIcon
          }
        ]}
      />
    </Navigation>
  );
};
const logo = {
  topBarSource: 'https://avadagroup.com/images/logo.png',
  width: 86,
  url: '#',
  accessibilityLabel: 'Shopify'
};

/**
 * @return {JSX.Element}
 */
export default function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const {tab = ''} = useParams();

  const toggleOpenNav = () => setIsNavOpen(!isNavOpen);

  return (
    <Frame
      logo={logo}
      // topBar={<AppTopBar isNavOpen={isNavOpen} toggleOpenNav={toggleOpenNav} />}
      // navigation={<AppNavigation />}
      topBar={topBarMarkup}
      navigation={<NavigationMarkup />}
    >
      {tab === '' && <HomePage />}
      {tab === 'notifications' && <NotificationPage />}
      {tab === 'settings' && <div>Settings</div>}
    </Frame>
  );
}

App.propTypes = {};
