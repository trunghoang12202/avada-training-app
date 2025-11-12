import React, {useState} from 'react';
import {Button, Card, InlineStack, Page, Text} from '@shopify/polaris';
import useFetchApi from '@assets/hooks/api/useFetchApi';

/**
 * Render a home page for overview
 *
 * @return {React.ReactElement}
 * @constructor
 */
export default function Home() {
  const [isEnabled, setIsEnabled] = useState(false);
  const {data, loading} = useFetchApi({url: '/test'});

  const toggleEnabled = () => setIsEnabled(!isEnabled);
  return (
    <Page title="Home">
      <Card>
        <InlineStack align="space-between" blockAlign="center">
          <Text as={'span'}>
            App status is&nbsp;
            <Text as={'span'} fontWeight={'bold'}>
              {!isEnabled ? 'disabled' : 'enabled'}
            </Text>
          </Text>
          <Button onClick={toggleEnabled} size={'large'}>
            {!isEnabled ? 'Enable' : 'Disable'}
          </Button>
        </InlineStack>
      </Card>
    </Page>
  );
}
