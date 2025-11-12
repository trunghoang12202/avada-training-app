import React from 'react';
import {Page} from '@shopify/polaris';
import NotificationList from '@assets/components/NotificationList/NotificationList';
import useFetchApi from '@assets/hooks/api/useFetchApi';
/**
 * Render a home page for overview
 *
 * @return {React.ReactElement}
 * @constructor
 */
export default function Notifications() {
  const {data: notifications, loading} = useFetchApi({url: '/notifications'});
  return (
    <Page title={'Notifications'} subtitle={'List of sales notifcation from Shopify'}>
      <NotificationList notifications={notifications} loading={loading} />
    </Page>
  );
}
