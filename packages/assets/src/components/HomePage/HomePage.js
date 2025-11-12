import React, {useState} from 'react';
import {Card, InlineStack, Page, Text, Button} from '@shopify/polaris';

const HomePage = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  return (
    <Page title="Home">
      <Card>
        <InlineStack align="space-between" blockAlign="center">
          <InlineStack>
            <Text as="span" alignment="left">
              App status is&nbsp;
            </Text>
            <Text fontWeight="bold">{isEnabled ? 'enabled' : 'disabled'}</Text>
          </InlineStack>
          <Button
            onClick={() => setIsEnabled(!isEnabled)}
            size="large"
            tone={!isEnabled ? 'success' : 'critical'}
            variant={!isEnabled ? 'primary' : 'secondary'}
          >
            {!isEnabled ? 'Enable' : 'Disable'}
          </Button>
        </InlineStack>
      </Card>
    </Page>
  );
};

export default HomePage;
