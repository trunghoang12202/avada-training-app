import React from 'react';
import {
  Card,
  InlineStack,
  Layout,
  SkeletonBodyText,
  SkeletonPage,
  SkeletonTabs,
  SkeletonThumbnail
} from '@shopify/polaris';

export default function SettingsSkeleton() {
  return (
    <SkeletonPage title="Settings">
      <Layout>
        <Layout.Section variant="oneThird">
          <Card>
            <InlineStack gap="200" alignment="space-between" wrap={false}>
              <SkeletonThumbnail />
              <SkeletonBodyText lines={5} />
            </InlineStack>
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Card>
            <SkeletonTabs />
            <SkeletonBodyText lines={24} />
          </Card>
        </Layout.Section>
      </Layout>
    </SkeletonPage>
  );
}
