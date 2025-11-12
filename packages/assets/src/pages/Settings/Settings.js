import React, {useState} from 'react';
import {Button, Card, Layout, Loading, Page} from '@shopify/polaris';
import NotificationPopup from '@assets/components/NotificationPopup/NotificationPopup';
import SettingsCard from '@assets/components/SettingsCard/SettingsCard';
import useFetchApi from '@assets/hooks/api/useFetchApi';
import {defaultSettings} from '@assets/const/defaultSettings';
import {api} from '@assets/helpers';

/**
 * @return {JSX.Element}
 */
export default function Settings() {
  const {data: settings, setData: setSettings, loading} = useFetchApi({
    url: '/settings',
    defaultData: defaultSettings
  });
  const [loadingSave, setLoadingSave] = useState(false);
  const onSave = async () => {
    setLoadingSave(true);
    try {
      return await api('/settings', {
        method: 'PUT',
        body: settings
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingSave(false);
    }
  };
  return (
    <Page
      title={'Settings'}
      subtitle={'Decide how your notifications will display'}
      primaryAction={
        <Button
          variant={'primary'}
          size={'large'}
          onClick={onSave}
          disabled={loading}
          loading={loadingSave}
        >
          Save
        </Button>
      }
    >
      {loading ? (
        <Loading />
      ) : (
        <Layout>
          <Layout.Section variant={'oneThird'}>
            <NotificationPopup settings={settings} />
          </Layout.Section>
          <Layout.Section>
            <SettingsCard settings={settings} setSettings={setSettings} />
          </Layout.Section>
        </Layout>
      )}
    </Page>
  );
}

Settings.propTypes = {};
