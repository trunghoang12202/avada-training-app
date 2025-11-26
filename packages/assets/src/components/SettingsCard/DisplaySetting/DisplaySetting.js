import React from 'react';
import {Text, Layout, Checkbox, InlineGrid, BlockStack, ChoiceList} from '@shopify/polaris';
import DesktopPositionInput from '@assets/components/DesktopPositionInput/DesktopPositionInput';
import RangeSliderWithUnit from '@assets/components/RangeSliderWithUnit/RangeSliderWithUnit';
import PropTypes from 'prop-types';

const DisplaySetting = ({settings, onChangeSettings}) => {
  const handleChangeProperty = key => {
    return value => {
      onChangeSettings(key, value);
    };
  };
  const handleChangePosition = value => {
    onChangeSettings('position', value);
  };

  const handleToggleHideTimeAgo = value => {
    onChangeSettings('hideTimeAgo', value);
  };

  const handleToggleTruncate = value => {
    onChangeSettings('truncateProductName', value);
  };

  const handleChoiceDisplayBy = value => {
    onChangeSettings('displayBy', value);
  };

  const handleChoiceReplayPlaylist = value => {
    onChangeSettings('replayPlaylist', value);
  };

  const handleChoiceContinueAfterPageReload = value => {
    onChangeSettings('continueAfterPageReload', value);
  };

  const handleHideCustomerName = value => {
    onChangeSettings('hideCustomerName', value);
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
            label={'Hide customer name'}
            checked={settings.hideCustomerName}
            onChange={handleHideCustomerName}
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
                onChange={handleChangeProperty('firstDelay')}
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
                onChange={handleChangeProperty('popsInterval')}
              />
              <RangeSliderWithUnit
                label="Maximum of popups"
                helpText="The maximum number of popups after page load. Maxinum number is 80"
                value={settings.maxPopsDisplay}
                min={0}
                max={80}
                step={1}
                unit={'pop(s)'}
                onChange={handleChangeProperty('maxPopsDisplay')}
              />
            </InlineGrid>
          </BlockStack>
        </BlockStack>
        <BlockStack gap={'400'}>
          <Text variant={'bodySm'} as={'p'} fontWeight={'bold'}>
            STRATEGY
          </Text>
          <ChoiceList
            title="Display by"
            choices={[
              {label: 'Display randomly', value: 'random'},
              {label: 'Display in order', value: 'order'}
            ]}
            selected={settings.displayBy}
            onChange={handleChoiceDisplayBy}
          />
          <BlockStack>
            <Checkbox
              label="Replay playlist"
              checked={settings.replayPlaylist}
              onChange={handleChoiceReplayPlaylist}
              helpText={
                'If enabled, the playlist will be replayed when all items have all been displayed.'
              }
            />
            <Checkbox
              label="Continue after page reload"
              checked={settings.continueAfterPageReload}
              onChange={handleChoiceContinueAfterPageReload}
              helpText={
                'If enabled, after the page is reloaded, the next popup is displayed. If not, the list will be replayed from the start.'
              }
            />
          </BlockStack>
        </BlockStack>
      </BlockStack>
    </Layout>
  );
};

DisplaySetting.propTypes = {
  settings: PropTypes.object,
  onChangeSettings: PropTypes.func
};

export default DisplaySetting;
