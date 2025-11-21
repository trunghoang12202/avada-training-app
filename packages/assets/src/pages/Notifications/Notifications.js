import React, {useEffect, useState} from 'react';
import {BlockStack, Button, Page} from '@shopify/polaris';
import {Modal, TitleBar, useAppBridge} from '@shopify/app-bridge-react';
import NotificationList from '@assets/components/NotificationList/NotificationList';
import useFetchApi from '@assets/hooks/api/useFetchApi';
import SyncNotificationsBanner from '@assets/components/Banner/SyncNotificationsBanner';

/**
 * Render a home page for overview
 *
 * @return {React.ReactElement}
 * @constructor
 */
export default function Notifications() {
  const [nextCursor, setNextCursor] = useState(null);
  const [prevCursor, setPrevCursor] = useState(null);
  const [isOpenBanner, setIsOpenBanner] = useState(true);
  const shopify = useAppBridge();

  const [sort, setSort] = useState('desc');

  const {fetchApi, data: notifications, pageInfo, loading} = useFetchApi({
    url: '/notifications'
  });

  useEffect(() => {
    fetchApi('/notifications', {
      nextCursor,
      prevCursor,
      sortOrder: sort
    });
  }, [nextCursor, prevCursor, sort]);

  const handleSortChange = newSort => {
    setSort(newSort);
    setNextCursor(null);
    setPrevCursor(null);
  };

  const handleNextPage = () => {
    if (pageInfo?.hasNext) {
      setNextCursor(pageInfo.nextCursor);
      setPrevCursor(null);
    }
  };

  const handlePrevPage = () => {
    if (pageInfo?.hasPrev) {
      setPrevCursor(pageInfo.prevCursor);
      setNextCursor(null);
    }
  };

  const handleDismissBanner = () => {
    setIsOpenBanner(false);
  };

  const handleSyncNotifications = async () => {
    await shopify.modal.show('sync-modal');
  };

  const syncNotifications = async () => {
    await shopify.modal.hide('sync-modal');
    await fetchApi('/notifications/sync');
  };

  return (
    <Page title={'Notifications'} subtitle={'List of sales notifcation from Shopify'}>
      <BlockStack gap={'400'}>
        {isOpenBanner && (
          <SyncNotificationsBanner
            handleDismiss={handleDismissBanner}
            handleSync={handleSyncNotifications}
            loading={loading}
          />
        )}
        <NotificationList
          notifications={notifications}
          loading={loading}
          pageInfo={pageInfo}
          sortValue={sort}
          handleSortChange={handleSortChange}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
        />
      </BlockStack>
      <Modal id="sync-modal">
        <p style={{marginBlock: '12px', paddingInline: '16px'}}>
          Make sure to delete all your notifications then sync again if you want full update since
          the manual updates will be appended to the list. We do this since you may have other
          imported notifications, we don't want to replace the whole list.
        </p>
        <TitleBar title="Are you sure you want to sync manually?">
          {/* eslint-disable-next-line react/no-unknown-property */}
          <button variant="primary" onClick={syncNotifications}>
            Confirm
          </button>
          <button
            onClick={async () => {
              await shopify.modal.hide('sync-modal');
            }}
          >
            Cancel
          </button>
        </TitleBar>
      </Modal>
    </Page>
  );
}
