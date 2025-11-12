import React, {useState} from 'react';
import {Text, Layout, LegacyCard, Checkbox, Page, InlineGrid, BlockStack} from '@shopify/polaris';
import DesktopPositionInput from '@assets/components/DesktopPositionInput/DesktopPositionInput';
import PropTypes from 'prop-types';
import RangeSliderWithUnit from '@assets/components/RangeSliderWithUnit/RangeSliderWithUnit';

const DisplaySetting = ({settings, onUpdate}) => {
  const handleChangeProperty = key => {
    return value => {
      onUpdate(key, value);
    };
  };
  const handleChangePosition = value => {
    onUpdate('position', value);
  };

  const handleToggleHideTimeAgo = value => {
    onUpdate('hideTimeAgo', value);
  };

  const handleToggleTruncate = value => {
    onUpdate('truncateProductName', value);
  };

  const options = [
    {label: 'Bottom left', value: 'bottom-left'},
    {label: 'Bottom right', value: 'bottom-right'},
    {label: 'Top left', value: 'top-left'},
    {label: 'Top right', value: 'top-right'}
  ];
  return (
    <Layout sectioned>
      <BlockStack gap={'400'}>
        <BlockStack gap={'200'}>
          <Text variant={'bodySm'} as={'p'} fontWeight={'bold'}>
            APPEARANCE
          </Text>
          <DesktopPositionInput
            label={'Desktop position'}
            options={options}
            value={settings.position || 'bottom-left'}
            onChange={handleChangePosition}
            helpText={'The display position of the pop on your website'}
          />
          <Checkbox
            label={'Hide time ago'}
            checked={settings.hideTimeAgo}
            onChange={handleToggleHideTimeAgo}
          />
          <Checkbox
            label={'Truncate content text'}
            checked={settings.truncateProductName}
            onChange={handleToggleTruncate}
            helpText={
              'If your product name is long for one line, it will be truncated to "Product name..."'
            }
          />
        </BlockStack>
        <BlockStack gap={'200'}>
          <Text variant={'bodySm'} as={'p'} fontWeight={'bold'}>
            TIMING
          </Text>
          <BlockStack gap={'200'}>
            <InlineGrid columns={2} gap={'200'}>
              <RangeSliderWithUnit
                label="Display duration"
                helpText="How long each pop will display on your page."
                value={settings.displayDuration}
                min={1}
                max={30}
                step={1}
                unit={'seconds(s)'}
                onChange={handleChangeProperty('displayDuration')}
              />
              <RangeSliderWithUnit
                label="Time before the first pop"
                helpText="The delay time before the first notification."
                value={settings.firstDelay}
                min={0}
                max={60}
                step={1}
                unit={'seconds(s)'}
                onChange={value => onUpdate('firstDelay', value)}
              />
            </InlineGrid>
            <InlineGrid columns={2} gap={'200'}>
              <RangeSliderWithUnit
                label="Gap time between two pops"
                helpText="The time interval between two popup notifications."
                value={settings.popsInterval}
                min={0}
                max={30}
                step={1}
                unit={'seconds(s)'}
                onChange={value => onUpdate('popsInterval', value)}
              />
              <RangeSliderWithUnit
                label="Maximum of popups"
                helpText="The maximum number of popups after page load. Maxinum number is 80"
                value={settings.maxPopsDisplay}
                min={0}
                max={80}
                step={1}
                unit={'pop(s)'}
                onChange={value => onUpdate('maxPopsDisplay', value)}
              />
            </InlineGrid>
          </BlockStack>
        </BlockStack>
      </BlockStack>
    </Layout>
  );
};

DisplaySetting.propTypes = {
  settings: PropTypes.object,
  onUpdate: PropTypes.func
};

export default DisplaySetting;
