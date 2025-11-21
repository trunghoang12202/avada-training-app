import React, {useEffect, useState} from 'react';
import {
  Card,
  InlineStack,
  Layout,
  Page,
  SkeletonBodyText,
  SkeletonPage,
  SkeletonTabs,
  SkeletonThumbnail,
  Sticky,
  Modal
} from '@shopify/polaris';
import {SaveBar, useAppBridge} from '@shopify/app-bridge-react';

import NotificationPopup from '@assets/components/NotificationPopup/NotificationPopup';
import MobileScreenPreview from '@assets/components/ScreenPreview/MobileScreenPreview';
import SettingsCard from '@assets/components/SettingsCard/SettingsCard';
import useFetchApi from '@assets/hooks/api/useFetchApi';
import {defaultSettings} from '@assets/const/defaultSettings';
import {api} from '@assets/helpers';
import {deepEqual} from '@assets/helpers/utils/object';

/**
 * @return {JSX.Element}
 */
export default function Settings() {
  const {data: initialSettings, setData: setInitialSettings, loading} = useFetchApi({
    url: '/settings',
    defaultData: defaultSettings
  });
  const [settings, setSettings] = useState(initialSettings);
  const [loadingSave, setLoadingSave] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const shopify = useAppBridge();

  useEffect(() => {
    setSettings(initialSettings);
  }, [initialSettings]);

  const onSave = async () => {
    try {
      setLoadingSave(true);
      setInitialSettings(settings);
      return await api('/settings', {
        method: 'PUT',
        body: settings
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingSave(false);
      await shopify.saveBar.hide('save-bar-settings');
      shopify.toast.show('Settings saved successfully');
    }
  };

  const onChangeSettings = (key, value) => {
    setSettings(prev => {
      const updated = {
        ...prev,
        [key]: value
      };

      const isSame = deepEqual(updated, initialSettings);

      if (isSame) {
        shopify.saveBar.hide('save-bar-settings');
      } else {
        shopify.saveBar.show('save-bar-settings');
      }

      return updated;
    });
  };

  const handleDiscardChange = async () => {
    setSettings(initialSettings);
    await shopify.saveBar.hide('save-bar-settings');
  };

  if (loading)
    return (
      <SkeletonPage title={'Settings'}>
        <Layout>
          <Layout.Section variant="oneThird">
            <Card>
              <InlineStack gap={'200'} alignment="space-between" wrap={false}>
                <SkeletonThumbnail></SkeletonThumbnail>
                <SkeletonBodyText lines={5} />
              </InlineStack>
            </Card>
          </Layout.Section>
          <Layout.Section>
            <Card>
              <SkeletonTabs></SkeletonTabs>
              <SkeletonBodyText lines={24}></SkeletonBodyText>
            </Card>
          </Layout.Section>
        </Layout>
      </SkeletonPage>
    );

  return (
    <Page title="Settings" subtitle="Decide how your notifications will display">
      <Layout>
        <Layout.Section variant="oneThird">
          <Sticky offset={true}>
            <MobileScreenPreview
              settingsValue={settings}
              onShowDesktopPreview={() => setIsOpenModal(true)}
            />
          </Sticky>
        </Layout.Section>
        <Layout.Section>
          <SettingsCard settingsValue={settings} onChangeSettings={onChangeSettings} />
        </Layout.Section>
        <Modal
          open={isOpenModal}
          onClose={() => {
            setIsOpenModal(false);
          }}
          title="Desktop Preview"
          primaryAction={{
            content: 'Close',
            onAction: () => {
              setIsOpenModal(false);
            }
          }}
        >
          <Modal.Section>
            <div style={{height: '40vh', position: 'relative', overflow: 'hidden'}}>
              <NotificationPopup settingsValue={settings} isAbsolute={true} />
            </div>
          </Modal.Section>
        </Modal>
      </Layout>
      <SaveBar id={'save-bar-settings'} discardConfirmation={''}>
        <button
          variant="primary"
          onClick={onSave}
          loading={loadingSave ? '' : undefined}
          disabled={loadingSave ? true : undefined}
        ></button>
        <button onClick={handleDiscardChange} disabled={loadingSave ? true : undefined}></button>
      </SaveBar>
    </Page>
  );
}

Settings.propTypes = {};
