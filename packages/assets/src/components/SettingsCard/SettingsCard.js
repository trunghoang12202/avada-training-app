import React, {Suspense, useState, lazy} from 'react';
import {LegacyCard, Tabs} from '@shopify/polaris';
import Loading from '@assets/components/Loading';
import PropTypes from 'prop-types';

const DisplaySetting = lazy(() =>
  import('@assets/components/SettingsCard/DisplaySetting/DisplaySetting')
);
const TriggersSetting = lazy(() =>
  import('@assets/components/SettingsCard/TriggerSetting/TriggerSetting')
);

/**
 * @returns {JSX.Element}
 * @constructor
 */
const SettingsCard = ({settings, setSettings}) => {
  const [selected, setSelected] = useState(0);

  const onUpdate = (key, value) => {
    setSettings(prev => ({...prev, [key]: value}));
  };
  const tabs = [
    {
      id: 'display',
      content: 'Display',
      contentJsx: (
        <LegacyCard.Section>
          <DisplaySetting settings={settings} onUpdate={onUpdate} />
        </LegacyCard.Section>
      )
    },
    {
      id: 'triggers',
      content: 'Triggers',
      contentJsx: (
        <LegacyCard.Section>
          <TriggersSetting settings={settings} onUpdate={onUpdate} />
        </LegacyCard.Section>
      )
    }
  ];
  return (
    <LegacyCard>
      <Tabs selected={selected} tabs={tabs} onSelect={setSelected}>
        <Suspense fallback={<Loading />}>{tabs[selected].contentJsx}</Suspense>
      </Tabs>
    </LegacyCard>
  );
};

SettingsCard.propTypes = {
  settings: PropTypes.object,
  setSettings: PropTypes.func
};

export default SettingsCard;
