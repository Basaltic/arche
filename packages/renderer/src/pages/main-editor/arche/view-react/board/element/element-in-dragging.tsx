import React from 'react';
import { useNodeBinding } from '../../hooks/node.hooks';
import { elementRegistry } from './element-registry';

export type TElementInDraggingProps = {
  id: string;
};

/**
 * Element Wrapper While Dragging
 */
export const ElementInDragging = (props: TElementInDraggingProps) => {
  const { id } = props;

  const node = useNodeBinding(id);

  const element = elementRegistry.get(node.meta.type);
  if (!element) {
    return null;
  }

  const ElementView = element.view;

  return (
    <div>
      <ElementView id={id} where="dragging" />
    </div>
  );
};
