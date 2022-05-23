import type { ArgsStoryFn } from '@storybook/addons';
import type { Args } from '@storybook/api';
import type { DecoratorFn, ReactFramework, StoryContext } from '@storybook/react';
import { Fragment } from 'react';
import cloneDeep from 'lodash.clonedeep';

/**
 * Creates a decorator function that returns a new component with that class name added.
 * You may also pass in a render function that takes in the props with a modified class name. The original story function
 * is also passed in if you want modify the story output (ex: Adding labels or a wrapper)
 */
export const createWithClassesDecorator = (
  classes: string[] = [],
  renderFunc?: (
    props: Args & { className?: string },
    originalStoryFn: ArgsStoryFn<React.ReactElement<unknown>>,
    context: StoryContext<ReactFramework>
  ) => JSX.Element
): DecoratorFn => {
  // Create a function of type DecoratorFn
  const withStateDecorator: DecoratorFn = (storyFn, Context) => {
    const pseudoStates = classes || [];
    const { viewMode, args, name, parameters } = Context;
    // This decorator is explicitly made for react
    const originalStoryFn = Context.originalStoryFn as
      | ArgsStoryFn<React.ReactElement<unknown>>
      | undefined;
    // Just render the component without decoration if viewing the docs
    if (viewMode === 'docs') {
      return storyFn();
    }

    const decoratedComponents = pseudoStates.map((state) => {
      // Don't throw away the original class name prop
      const classWithState = `${state} ${args.className || ''}`;
      const componentKey = `${name} with ${state}`;
      // We don't want to modify the original props
      const modifiedProps = cloneDeep(args);
      const DecoratedComponent = parameters.component;
      modifiedProps.className = classWithState;
      if (renderFunc) {
        if (!originalStoryFn) {
          throw new Error('No story was exported. Please export one when using this decorator.');
        }
        return (
          <Fragment key={componentKey}>
            {renderFunc(modifiedProps, originalStoryFn, Context)}
          </Fragment>
        );
      }
      return <DecoratedComponent key={componentKey} {...modifiedProps} />;
    });

    return (
      <>
        {storyFn()}
        {decoratedComponents}
      </>
    );
  };
  return withStateDecorator;
};

export enum PseudoClasses {
  FOCUS = 'pseudo-focus',
  HOVER = 'pseudo-hover',
  FOCUS_VISIBLE = 'pseudo-focus-visible',
  ACTIVE = 'pseudo-active',
}