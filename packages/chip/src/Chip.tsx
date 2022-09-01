import type { KeyboardEvent, ReactNode } from 'react';

import { cx } from 'classix';

import './styles/Chip.css';
import { ChipKind, ChipSize } from './types';

type ChipProps = {
  kind?: ChipKind;
  size?: ChipSize;
  subtle?: boolean;
  isClickable?: boolean;
  handleClick?(): void;
  handleKeyPress?(e: KeyboardEvent<HTMLSpanElement>): void;
  className?: string;
  children?: ReactNode;
  ariaDisabled?: boolean;
};

const Chip = ({
  kind = ChipKind.DEFAULT,
  size = ChipSize.NORMAL,
  subtle = false,
  isClickable,
  handleClick,
  handleKeyPress,
  className,
  children,
  ariaDisabled,
}: ChipProps) => {
  const classes = cx(
    'Chip',
    `Chip--${kind}`,
    `Chip--${size}`,
    className,
    subtle && 'Chip--subtle',
    isClickable && 'Chip--clickable'
  );

  if (isClickable) {
    return (
      <span
        onClick={handleClick}
        onKeyPress={handleKeyPress}
        className={classes}
        role="button"
        tabIndex={0}
        aria-disabled={ariaDisabled}
      >
        {children}
      </span>
    );
  }
  return (
    <span className={classes} aria-disabled={ariaDisabled}>
      {children}
    </span>
  );
};

export { Chip };
export type { ChipProps };