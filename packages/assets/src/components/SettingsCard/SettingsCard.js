import React, {Suspense, useState, lazy} from 'react';
import {LegacyCard, Loading, Tabs} from '@shopify/polaris';
import PropTypes from 'prop-types';
import DisplaySetting from '@assets/components/SettingsCard/DisplaySetting/DisplaySetting';
import TriggersSetting from '@assets/components/SettingsCard/TriggerSetting/TriggerSetting';

/**
 * @returns {JSX.Element}
 * @constructor
 */
const SettingsCard = ({settingsValue, onChangeSettings}) => {
  const [selected, setSelected] = useState(0);

  const tabs = [
    {
      id: 'display',
      content: 'Display',
      contentJsx: (
        <LegacyCard.Section>
          <DisplaySetting settings={settingsValue} onChangeSettings={onChangeSettings} />
        </LegacyCard.Section>
      )
    },
    {
      id: 'triggers',
      content: 'Triggers',
      contentJsx: (
        <LegacyCard.Section>
          <TriggersSetting settings={settingsValue} onChangeSettings={onChangeSettings} />
        </LegacyCard.Section>
      )
    }
  ];
  return (
    <LegacyCard>
      <Tabs selected={selected} tabs={tabs} onSelect={setSelected}>
        {tabs[selected].contentJsx}
      </Tabs>
    </LegacyCard>
  );
};

SettingsCard.propTypes = {
  settingsValue: PropTypes.object,
  onChangeSettings: PropTypes.func
};

export default SettingsCard;
