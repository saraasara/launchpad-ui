import type { ComponentStoryObj } from '@storybook/react';

import { Radio } from '../src';

export default {
  component: Radio,
  title: 'Components/Form/Radio',
  description: 'A radio button allows the user to select one of a set of options."',
};

type Story = ComponentStoryObj<typeof Radio>;

export const Default: Story = {
  args: {
    id: 'optionOne',
    value: 'Option One',
    checked: true,
  },
};