import { test, expect } from '@playwright/experimental-ct-react';

import { Tooltip, type TooltipProps } from '../src/Tooltip';

test.use({ viewport: { width: 500, height: 500 } });

const createComponent = (props?: Partial<TooltipProps>) => (
  <Tooltip {...props}>
    <button>Target</button>
    <span>Content</span>
  </Tooltip>
);

test.describe('Tooltip', () => {
  test('is accessible', async ({ mount, page }) => {
    const component = await mount(createComponent({ isOpen: true }));

    await expect(component).toBeVisible();
    await expect(page).toBeAccessible();
  });
});
