import { forwardRef } from 'react';

import './styles.css';

type MenuItemListProps = Omit<React.ComponentPropsWithRef<'div'>, 'className'>;

const MenuItemList = forwardRef<HTMLDivElement, MenuItemListProps>(({ children, ...rest }, ref) => (
  <div {...rest} ref={ref} data-test-id="menu-item-list" className="Menu-item-list">
    {children}
  </div>
));

MenuItemList.displayName = 'MenuItemList';

export { MenuItemList };
export type { MenuItemListProps };