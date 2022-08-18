import type { OffsetOptions } from '@floating-ui/core';
import type { ComputePositionConfig, Placement, Strategy } from '@floating-ui/dom';
import type { CSSProperties, ReactHTML, Ref, RefObject } from 'react';

import { arrow, computePosition, flip, offset as floatOffset, shift } from '@floating-ui/dom';
import { Overlay } from '@launchpad-ui/overlay';
import { FocusScope } from '@react-aria/focus';
import cx from 'clsx';
import { LazyMotion, m } from 'framer-motion';
import {
  Children,
  cloneElement,
  createElement,
  isValidElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { v4 } from 'uuid';

import './styles/Popover.css';
import { PopoverInteractionKind } from './types';

const loadFeatures = () =>
  import(
    /* webpackChunkName: "lp-popover-framer-features" */
    /* webpackExports: "domAnimation" */
    'framer-motion'
  ).then((res) => res.domAnimation);

type Offset = OffsetOptions;

type PopoverProps = {
  allowBoundaryElementOverflow?: boolean;
  content?: string | JSX.Element | JSX.Element[];
  children: React.ReactNode;
  disabled?: boolean;
  disablePlacementFlip?: boolean;
  enforceFocus?: boolean;
  hoverCloseDelay?: number;
  hoverOpenDelay?: number;
  interactionKind?: PopoverInteractionKind;
  isFixed?: boolean;
  isModal?: boolean;
  isOpen?: boolean;
  offset?: Offset;
  onClick?(): void;
  onClose?(event?: Event): void;
  onInteraction?(isOpen: boolean): void;
  placement?: Placement;
  popoverClassName?: string;
  popoverContentClassName?: string;
  restrictHeight?: boolean;
  restrictWidth?: boolean;
  rootElementStyle?: CSSProperties;
  rootElementTag?: keyof ReactHTML;
  target?: string | JSX.Element;
  targetElementRef?: Ref<Element>;
  targetClassName?: string;
  targetTestId?: string;
  enableArrow?: boolean;
};

type PopoverTargetProps = {
  onMouseEnter?: (event: React.MouseEvent) => void;
  onMouseLeave?: (event: React.MouseEvent) => void;
  onPointerEnter?: (event: React.PointerEvent) => void;
  onPointerLeave?: (event: React.PointerEvent) => void;
  onFocus?: (event: React.FocusEvent) => void;
  onBlur?: (event: React.FocusEvent) => void;
  onClick?: (event: React.MouseEvent) => void;
  ref: RefObject<HTMLElement>;
  className?: string;
  isopen?: boolean;
  'data-test-id': string;
  style?: CSSProperties;
};

type PopoverContentProps = {
  onMouseEnter?: (event: React.MouseEvent) => void;
  onMouseLeave?: (event: React.MouseEvent) => void;
  onPointerEnter?: (event: React.PointerEvent) => void;
  onPointerLeave?: (event: React.PointerEvent) => void;
  onClick?: (event: React.MouseEvent) => void;
};

const isOrContainsElement = (referenceElement: Element, element: Element) => {
  return referenceElement === element || (referenceElement && referenceElement.contains(element));
};

/**
 * Popover component driven by floating-ui.
 *
 * If you need more control over the popover's behavior,
 * you may specify the `isOpen` prop to use the component
 * in controlled mode.
 *
 */
const Popover = ({
  rootElementTag = 'span',
  placement = 'bottom',
  restrictHeight = true,
  restrictWidth = true,
  isModal = false,
  isFixed = false,
  interactionKind = PopoverInteractionKind.CLICK,
  hoverOpenDelay = 250,
  hoverCloseDelay = 250,
  disablePlacementFlip = false,
  allowBoundaryElementOverflow = false,
  isOpen: isOpenProp,
  enableArrow,
  enforceFocus,
  onClick,
  onInteraction,
  onClose,
  disabled,
  children,
  target: targetProp,
  content: contentProp,
  targetClassName,
  targetTestId,
  popoverClassName,
  popoverContentClassName,
  rootElementStyle,
  offset,
  targetElementRef,
}: PopoverProps) => {
  const [isOpen, setIsOpen] = useState(isOpenProp ?? undefined);
  const [popoverElement, setPopoverElement] = useState<HTMLElement | null>();

  const targetRef = useRef<HTMLElement>(null);
  const contentRef = useCallback((node: HTMLElement | null) => {
    if (node !== null) {
      return setPopoverElement(node);
    }
    return;
  }, []);
  const arrowRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const optionsRef = useRef<Partial<ComputePositionConfig>>();
  const popoverId = useRef(`popover-${v4()}`);

  const updatePosition = useCallback(async () => {
    const middleware = [];

    if (popoverElement === null || popoverElement === undefined) {
      return;
    }

    if (!allowBoundaryElementOverflow) {
      middleware.push(shift({ padding: 5 }));
    }

    if (!disablePlacementFlip && !offset) {
      middleware.push(flip({ padding: 5 }));
    }

    if (offset) {
      middleware.push(floatOffset(offset));
    }

    if (enableArrow && arrowRef.current) {
      middleware.push(arrow({ element: arrowRef.current }));
    }

    const hasModal = targetRef.current?.closest('.has-modal');
    const strategy: Strategy = isFixed || hasModal ? 'fixed' : 'absolute';

    optionsRef.current = {
      placement,
      middleware,
      strategy,
    };

    const parentNode = targetRef.current;
    if (!parentNode || !parentNode.childNodes) {
      return;
    }

    const target = parentNode.childNodes[0] as Element;
    const {
      x,
      y,
      placement: floatPlacement,
      middlewareData,
      strategy: floatStrategy,
    } = await computePosition(target, popoverElement, optionsRef.current);

    if (popoverElement) {
      Object.assign(popoverElement.style, {
        left: `${x}px`,
        top: `${y}px`,
        position: floatStrategy,
      });

      popoverElement.dataset.popoverPlacement = floatPlacement;
    }

    if (enableArrow && arrowRef.current && middlewareData.arrow) {
      const { x: arrowX, y: arrowY } = middlewareData.arrow;

      const staticSide = {
        top: 'bottom',
        right: 'left',
        bottom: 'top',
        left: 'right',
      }[floatPlacement.split('-')[0]];

      if (staticSide) {
        Object.assign(arrowRef.current?.style, {
          left: arrowX !== null ? `${arrowX}px` : '',
          top: arrowY !== null ? `${arrowY}px` : '',
          right: '',
          bottom: '',
          [staticSide]: '5px',
        });
      }
    }
  }, [
    allowBoundaryElementOverflow,
    disablePlacementFlip,
    enableArrow,
    isFixed,
    offset,
    placement,
    popoverElement,
  ]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const updatePopover = async () => {
      if (isOpen && !(popoverElement === null || popoverElement === undefined)) {
        window.addEventListener('scroll', updatePosition, { passive: true });
        window.addEventListener('resize', updatePosition, { passive: true });
        await updatePosition();
      } else {
        window.removeEventListener('scroll', updatePosition);
        window.removeEventListener('resize', updatePosition);
      }
    };
    updatePopover();
  }, [isOpen, contentProp, popoverElement, updatePosition]);

  useEffect(() => {
    setIsOpen(isOpenProp);
  }, [isOpenProp]);

  const handleTargetClick = (event: React.MouseEvent) => {
    const eventTarget = event.target as Element;
    onClick?.();
    if (!disabled && targetRef.current && isOrContainsElement(targetRef.current, eventTarget)) {
      // always close the menu, and only open unless something prevented the default
      setOpenState(isOpen ? false : !event.defaultPrevented);
    }
  };

  const handleMouseEnter = () => {
    if (!disabled) {
      setOpenState(true, hoverOpenDelay);
      attachGlobalListener();
    }
  };

  const handleMouseLeave = () => {
    setOpenState(false, hoverCloseDelay);
    removeGlobalListener();
  };

  const handleFocus = () => {
    if (!disabled) {
      setOpenState(true);
      attachGlobalListener();
    }
  };

  const handleBlur = () => {
    setOpenState(false);
    removeGlobalListener();
  };

  const handlePopoverClick = (event: React.MouseEvent) => {
    const eventTarget = event.target as Element;
    if (eventTarget?.closest?.('.popover-dismiss')) {
      setOpenState(false);
    }
  };

  const handleOverlayClose = (event: React.MouseEvent | React.KeyboardEvent) => {
    const eventTarget = event.target as Element;
    if (
      (targetRef.current && !isOrContainsElement(targetRef.current, eventTarget)) ||
      event.nativeEvent instanceof KeyboardEvent
    ) {
      setOpenState(false);
    }
  };

  const setOpenState = (nextIsOpen: boolean, timeout?: number) => {
    timeoutRef.current && clearTimeout(timeoutRef.current);

    if (typeof timeout !== 'undefined' && timeout > 0) {
      timeoutRef.current = setTimeout(() => setOpenState(nextIsOpen), timeout);
    } else {
      // controlled mode
      if (isOpenProp === null || isOpenProp === undefined) {
        setIsOpen(nextIsOpen);
      } else {
        typeof onInteraction === 'function' && onInteraction(nextIsOpen);
      }

      if (!nextIsOpen) {
        typeof onClose === 'function' && onClose();
      }
    }
  };

  const parseChildren = (): {
    target: React.ReactNode;
    content: React.ReactNode;
  } => {
    const [targetChild, contentChild] = Children.toArray(children);

    return {
      target: targetChild ?? targetProp,
      content: contentChild ?? contentProp,
    };
  };

  const attachGlobalListener = () => {
    document.addEventListener('keydown', handleKeyDown);
  };

  const removeGlobalListener = () => {
    document.removeEventListener('keydown', handleKeyDown);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
      removeGlobalListener();
    }
  };

  const renderPopover = (content: React.ReactNode) => {
    const classes = cx('Popover', popoverClassName);

    let handlers: PopoverContentProps = {};

    if (interactionKind === 'hover') {
      handlers = {
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onPointerEnter: handleMouseEnter,
        onPointerLeave: handleMouseLeave,
      };
    }

    if (interactionKind !== 'hover-target-only') {
      handlers.onClick = handlePopoverClick;
    }

    const popoverContent = (
      <LazyMotion strict features={loadFeatures}>
        <m.div
          transition={{ duration: 0.15 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={cx(
            'Popover-content',
            {
              'Popover-content--restrict-width': restrictWidth,
            },
            popoverContentClassName
          )}
        >
          {restrictHeight ? <div className="Popover-scroller">{content}</div> : content}
        </m.div>
      </LazyMotion>
    );

    return (
      <div
        id={popoverId.current}
        data-test-id="popover-with-spring"
        ref={contentRef}
        className={classes}
        role="tooltip"
        aria-hidden={!isOpen}
        {...handlers}
      >
        {enableArrow && <div id="arrow" ref={arrowRef}></div>}
        {interactionKind === 'click' ? (
          <FocusScope autoFocus contain>
            {popoverContent}
          </FocusScope>
        ) : (
          popoverContent
        )}
      </div>
    );
  };

  const { target, content } = parseChildren();
  const hasEmptyContent =
    content === null || content === undefined || (typeof content === 'string' && !content);
  const isTargetDisabled = isValidElement(target) ? !!target?.props?.disabled : false;

  const targetProps: PopoverTargetProps = {
    ref: targetRef,
    className: cx('Popover-target', targetClassName, {
      'Popover-target--active': isOpen,
      'Popover-target--disabled': isTargetDisabled,
    }),
    style: rootElementStyle,
    'data-test-id': targetTestId || 'popover-target',
  };

  if (
    interactionKind === 'hover' ||
    interactionKind === 'hover-target-only' ||
    interactionKind === 'hover-or-focus'
  ) {
    targetProps.onMouseEnter = handleMouseEnter;
    targetProps.onMouseLeave = handleMouseLeave;
    targetProps.onPointerEnter = handleMouseEnter;
    targetProps.onPointerLeave = handleMouseLeave;
    if (interactionKind === 'hover-or-focus') {
      targetProps.onFocus = handleFocus;
      targetProps.onBlur = handleBlur;
    }
  } else {
    targetProps.onClick = handleTargetClick;
  }

  return createElement(
    rootElementTag,
    targetProps,
    cloneElement(target as React.ReactElement, {
      ref: targetElementRef,
      ...(isOpen && { 'aria-describedby': popoverId.current }),
    }),
    <Overlay
      isOpen={!!isOpen && !hasEmptyContent}
      canOutsideClickClose={interactionKind === 'click'}
      isModal={isModal}
      enforceFocus={enforceFocus}
      onClose={handleOverlayClose}
    >
      <div>{renderPopover(content)}</div>
    </Overlay>
  );
};

export { Popover };
export type { Offset, PopoverProps };
