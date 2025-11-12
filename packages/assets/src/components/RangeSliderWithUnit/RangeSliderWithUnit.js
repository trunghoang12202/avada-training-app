import React from 'react';
import {
  BlockStack,
  Box,
  InlineGrid,
  InlineStack,
  Labelled,
  RangeSlider,
  Text
} from '@shopify/polaris';
import PropTypes from 'prop-types';

const RangeSliderWithUnit = ({label, value, min, max, step, helpText, unit, onChange}) => {
  const BlockUnit = () => (
    <Box borderWidth={'0165'} padding={'100'} width={'1000'}>
      <InlineStack align={'space-between'} blockAlign={'center'} spacing={'tight'}>
        <Text as="span" alignment="start">
          {value || min}
        </Text>
        <Text as="span" alignment="start">
          {unit}
        </Text>
      </InlineStack>
    </Box>
  );
  return (
    <BlockStack gap={'200'}>
      <Labelled label={label} id={label} />
      {/* <InlineGrid columns={['twoThirds', 'oneThird']} id={label} gap={'200'} align={'start'}>*/}
      <RangeSlider
        value={value || min}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        label={''}
        suffix={<BlockUnit />}
      />
      {/* </InlineGrid>*/}
      <Labelled label={helpText} id={helpText} />
    </BlockStack>
  );
};

RangeSliderWithUnit.propTypes = {
  label: PropTypes.string,
  value: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  helpText: PropTypes.string,
  unit: PropTypes.string,
  onChange: PropTypes.func
};

export default RangeSliderWithUnit;
