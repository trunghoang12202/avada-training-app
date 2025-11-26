import React from 'react';
import {BlockStack, ChoiceList, Select, TextField} from '@shopify/polaris';
import PropTypes from 'prop-types';

const TriggerSetting = ({settings, onChangeSettings}) => {
  const pages = [
    {label: 'Home page', value: 'home'},
    {label: 'Product page', value: 'product'},
    {label: 'Cart page', value: 'cart'},
    {label: 'Collection page', value: 'collection'},
    {label: 'Blog page', value: 'blog'}
  ];

  const renderChildrenSpecificPages = isSelected => {
    if (!isSelected) return null;
    return (
      <ChoiceList
        choices={pages}
        allowMultiple={true}
        onChange={handleSelectSpecificPages}
        title={''}
        selected={settings.specificPages || []}
      />
    );
  };

  const choices = [
    {label: 'All pages', value: 'all'},
    {label: 'Home page only', value: 'home'},
    {label: 'Specific pages', value: 'specificPages', renderChildren: renderChildrenSpecificPages}
  ];

  const handleSelectSpecificPages = value => {
    onChangeSettings('specificPages', value);
  };

  const handleSelectChoiceType = value => {
    onChangeSettings('allowShow', value);
    onChangeSettings('specificPages', []);
  };

  return (
    <BlockStack gap={'200'}>
      <ChoiceList
        title="Display by"
        choices={choices}
        selected={settings.allowShow || ['all']}
        onChange={handleSelectChoiceType}
      />
    </BlockStack>
  );
};

TriggerSetting.propTypes = {
  settings: PropTypes.object,
  onChangeSettings: PropTypes.func
};

export default TriggerSetting;
