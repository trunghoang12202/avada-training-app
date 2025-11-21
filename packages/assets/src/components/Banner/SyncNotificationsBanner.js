import React from 'react';
import {Banner, Text} from '@shopify/polaris';
import PropTypes from 'prop-types';

export default function SyncNotificationsBanner({handleDismiss, handleSync, loading}) {
  return (
    <Banner
      title="If orders are not up to date"
      action={{content: 'Sync manually', onAction: handleSync, disabled: loading}}
      onDismiss={handleDismiss}
    >
      <Text>
        We only keep maximum amount of 30 purchase notifications synchronized from your store. If
        you find your orders are not up to date, try synchronizing it again.
      </Text>
    </Banner>
  );
}

SyncNotificationsBanner.propTypes = {
  handleDismiss: PropTypes.func,
  handleSync: PropTypes.func,
  loading: PropTypes.bool
};
