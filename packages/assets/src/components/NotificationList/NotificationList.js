import React, {useState} from 'react';
import {ResourceItem, ResourceList} from '@shopify/polaris';
import NotificationItem from '@assets/components/NotificationList/NotificationItem/NotificationItem';
import PropTypes from 'prop-types';

const NotificationList = ({notifications, loading}) => {
  const [selectedItems, setSelectedItems] = useState();
  const [sortValue, setSortValue] = useState('DATE_MODIFIED_DESC');

  const resourceName = {
    plural: 'Notifications',
    singular: 'Notification'
  };
  const sortOptions = [
    {label: 'Newest update', value: 'DATE_MODIFIED_DESC'},
    {label: 'Oldest update', value: 'DATE_MODIFIED_ASC'}
  ];
  const renderItem = notification => <NotificationItem notification={{...notification}} />;
  return (
    <ResourceList
      resourceName={resourceName}
      items={items}
      renderItem={renderItem}
      selectable={true}
      selectedItems={selectedItems}
      onSelectionChange={setSelectedItems}
      pagination={{
        hasNext: true,
        hasPrevious: true,
        onNext: () => {},
        onPrevious: () => {}
      }}
      sortOptions={sortOptions}
      sortValue={sortValue}
      onSortChange={selected => {
        setSortValue(selected);
      }}
      loading={loading}
    />
  );
};

NotificationList.propTypes = {
  notifications: PropTypes.array,
  loading: PropTypes.bool
};

export default NotificationList;
