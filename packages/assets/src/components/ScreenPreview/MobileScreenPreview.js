import React from 'react';
import {Card, Button, InlineStack, Text, Icon} from '@shopify/polaris';
import {ViewIcon, DesktopIcon} from '@shopify/polaris-icons';
import NotificationPopup from '@assets/components/NotificationPopup/NotificationPopup';

import './MobileScreenPreview.scss';
import PropTypes from 'prop-types';

export default function MobileScreenPreview({settingsValue, onShowDesktopPreview}) {
  return (
    <Card>
      <div className="Avada-PreviewContainer">
        <div className="Avada-PreviewHeader">
          <InlineStack align="space-between" blockAlign="center">
            <InlineStack blockAlign="center" gap="200">
              <Icon source={ViewIcon} tone="base" />
              <Text as="span" variant="bodyMd" fontWeight="bold">
                Preview
              </Text>
            </InlineStack>

            <Button icon={DesktopIcon} size="slim" onClick={onShowDesktopPreview}>
              Show Desktop
            </Button>
          </InlineStack>
        </div>

        <div className="Avada-PreviewBody">
          <NotificationPopup isMobile={true} settingsValue={settingsValue} isAbsolute={true} />
        </div>
      </div>
    </Card>
  );
}

MobileScreenPreview.propTypes = {
  settingsValue: PropTypes.object,
  onShowDesktopPreview: PropTypes.func
};
