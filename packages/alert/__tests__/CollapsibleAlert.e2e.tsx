import { test, expect } from '@playwright/experimental-ct-react';

import { CollapsibleAlert, type CollapsibleAlertProps } from '../src/CollapsibleAlert';
import { AlertKind } from '../src/types';

test.use({ viewport: { width: 500, height: 500 } });

const createComponent = (props?: CollapsibleAlertProps) => (
  <CollapsibleAlert message="A test message." kind={AlertKind.WARNING} {...props} />
);

test.describe('CollapsibleAlert', () => {
  test('is accessible', async ({ mount, page }) => {
    const component = await mount(createComponent());

    await expect(component).toBeVisible();
    await expect(page).toBeAccessible();
  });
});