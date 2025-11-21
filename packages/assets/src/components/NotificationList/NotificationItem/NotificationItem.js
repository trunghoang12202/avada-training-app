import React from 'react';
import NotificationPopup from '@assets/components/NotificationPopup/NotificationPopup';
import {ResourceItem} from '@shopify/polaris';
import PropTypes from 'prop-types';
import moment from 'moment';

const NotificationItem = ({notification}) => {
  const {id, firstName, city, country, productName, timestamp, productImage} = notification;
  return (
    <ResourceItem id={id}>
      <NotificationPopup
        firstName={firstName}
        city={city}
        country={country}
        productName={productName}
        timestamp={moment(timestamp).fromNow()}
        productImage={productImage}
      />
    </ResourceItem>
  );
};

NotificationItem.propTypes = {
  notification: PropTypes.object
};

export default NotificationItem;
