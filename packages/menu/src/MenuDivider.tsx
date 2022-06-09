import { SeparatorProps, useSeparator } from '@react-aria/separator';

import './styles.css';

type MenuDividerProps = SeparatorProps & {
  innerRef?: React.RefObject<HTMLDivElement>;
};

const MenuDivider = ({ elementType = 'div', orientation, innerRef }: MenuDividerProps) => {
  const { separatorProps } = useSeparator({
    orientation,
    elementType,
  });

  return <div {...separatorProps} ref={innerRef} className="Menu-divider" />;
};

export { MenuDivider };
export type { MenuDividerProps };