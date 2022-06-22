import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { it, expect, describe } from 'vitest';

import { CompactTextField } from '../src';

describe('CompactTextField', () => {
  it('renders', () => {
    render(<CompactTextField label="Email" aria-label="Email" onChange={() => undefined} />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('is accessible', async () => {
    const { container } = render(
      <CompactTextField label="Email" aria-label="Email" onChange={() => undefined} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});