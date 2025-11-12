import React from 'react';
import NotificationPopup from '@assets/components/NotificationPopup/NotificationPopup';
import {Box, ResourceItem} from '@shopify/polaris';
import PropTypes from 'prop-types';

const NotificationItem = ({notification}) => {
  const {id, firstName, city, country, productName, timestamp, productImage} = notification;
  return (
    <ResourceItem id={id}>
      <NotificationPopup
        firstName={firstName}
        city={city}
        country={country}
        productName={productName}
        timestamp={timestamp}
        productImage={productImage}
      />
    </ResourceItem>
  );
};

NotificationItem.propTypes = {
  notification: PropTypes.object
};

export default NotificationItem;
