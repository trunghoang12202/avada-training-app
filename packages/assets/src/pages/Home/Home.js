import React from 'react';
import {Button, Card, InlineStack, Page, Text} from '@shopify/polaris';
import useFetchApi from '@assets/hooks/api/useFetchApi';

/**
 * Render a home page for overview
 *
 * @return {React.ReactElement}
 * @constructor
 */
export default function Home() {
  const {fetchApi, data, setData: setStatus, loading} = useFetchApi({url: '/status'});

  const handleRefreshStatus = async () => {
    await fetchApi('/status');
  };
  const toggleEnabled = () => {
    open(
      `https://${shopify.config.shop}/admin/themes/current/editor?context=apps&activateAppId=${shopify.config.apiKey}/avada-sale-pop`,
      '_top'
    );
  };
  return (
    <Page title="Home">
      <Card>
        <InlineStack align="space-between" blockAlign="center">
          <Text as={'span'}>
            App status is&nbsp;
            <Text as={'span'} fontWeight={'bold'}>
              {!data.status ? 'disabled' : 'enabled'}
            </Text>
          </Text>
          <InlineStack gap={'200'}>
            <Button variant={'plain'} loading={loading} onClick={handleRefreshStatus}>
              Refresh Status
            </Button>
            <Button
              loading={loading}
              onClick={toggleEnabled}
              size={'large'}
              variant={'primary'}
              tone={!data.status ? '' : 'critical'}
            >
              {!data.status ? 'Enable' : 'Disable'}
            </Button>
          </InlineStack>
        </InlineStack>
      </Card>
    </Page>
  );
}
