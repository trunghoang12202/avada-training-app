import React, {useState} from 'react';
import {ResourceList} from '@shopify/polaris';
import NotificationItem from '@assets/components/NotificationList/NotificationItem/NotificationItem';
import PropTypes from 'prop-types';

const NotificationList = ({
  notifications,
  loading,
  pageInfo,
  sortValue,
  handleSortChange,
  handleNextPage,
  handlePrevPage
}) => {
  const [selectedItems, setSelectedItems] = useState();
  const {hasNext, hasPrev} = pageInfo;
  const resourceName = {
    plural: 'notifications',
    singular: 'notification'
  };
  const sortOptions = [
    {label: 'Newest update', value: 'desc'},
    {label: 'Oldest update', value: 'asc'}
  ];
  const renderItem = notification => <NotificationItem notification={{...notification}} />;
  return (
    <ResourceList
      resourceName={resourceName}
      items={notifications}
      renderItem={renderItem}
      selectable={true}
      selectedItems={selectedItems}
      onSelectionChange={setSelectedItems}
      pagination={{
        hasNext: hasNext,
        hasPrevious: hasPrev,
        onNext: handleNextPage,
        onPrevious: handlePrevPage
      }}
      sortOptions={sortOptions}
      sortValue={sortValue}
      onSortChange={selected => {
        handleSortChange(selected);
      }}
      loading={loading}
    />
  );
};

NotificationList.propTypes = {
  notifications: PropTypes.array,
  loading: PropTypes.bool,
  pageInfo: PropTypes.object,
  sortValue: PropTypes.string,
  handleSortChange: PropTypes.func,
  handleNextPage: PropTypes.func,
  handlePrevPage: PropTypes.func
};

export default NotificationList;
