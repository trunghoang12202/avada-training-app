import React from 'react';
import {BlockStack, Select, TextField} from '@shopify/polaris';
import PropTypes from 'prop-types';

const TriggerSetting = ({settings, onUpdate}) => {
  const options = [
    {label: 'All pages', value: 'all'},
    {label: 'Specific pages', value: 'specific'}
  ];
  const handleSelectOption = value => {
    onUpdate('allowShow', value);
  };
  const handleChangeIncludedPages = value => {
    onUpdate('includedUrls', value);
  };
  const handleChangeExcludedPages = value => {
    onUpdate('excludedUrls', value);
  };
  return (
    <BlockStack gap={'200'}>
      <Select
        label="PAGES RESTRICTION"
        options={options}
        value={settings.allowShow}
        onChange={handleSelectOption}
      />
      {settings.allowShow === 'specific' && (
        <TextField
          label="Included Pages"
          value={settings.includedUrls}
          multiline={4}
          autoComplete={'off'}
          helpText={'Page URLs not to show the pop-up (separate by new lines)'}
          onChange={handleChangeIncludedPages}
        />
      )}
      <TextField
        label="Excluded Pages"
        value={settings.excludedUrls}
        multiline={4}
        autoComplete={'off'}
        helpText={'Page URLs not to show the pop-up (separate by new lines)'}
        onChange={handleChangeExcludedPages}
      />
    </BlockStack>
  );
};

TriggerSetting.propTypes = {
  settings: PropTypes.object,
  onUpdate: PropTypes.func
};

export default TriggerSetting;
