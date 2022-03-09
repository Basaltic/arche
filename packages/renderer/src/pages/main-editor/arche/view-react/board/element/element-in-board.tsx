import cs from 'classnames';
import React, { useRef } from 'react';
import { useNodeBinding, useObserveElementMeta, useObserveElementPosition, useObserveElementLoad } from '../../hooks/node.hooks';
import { elementRegistry } from './element-registry';
import { useElementDrag } from './use-element-drag';
import { useElementSelection } from './use-element-selection';

export type TElementInBoardProps = {
  id: string;
};

export const ElementInBoardMain = (props: TElementInBoardProps) => {
  const { id } = props;

  const draggableRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const meta = useObserveElementMeta(id);
  const position = useObserveElementPosition(id);
  const selection = useElementSelection(id);
  const { isDragging } = useElementDrag({ draggableRef, id });

  const clickToSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    selection.select();
  };

  const element = elementRegistry.get(meta?.type);
  const ElementView = element?.view;

  const classname = cs('absolute hover:z-50 rounded-md', {
    'ring-2': selection.isSelected,
    'opacity-0': isDragging,
    'opacity-100': !isDragging,
  });

  return (
    <div
      ref={containerRef}
      className={classname}
      style={{
        transform: `translate3d(${position?.x || 10}px, ${position?.y || 10}px, 0)`,
      }}
      onClick={clickToSelect}
    >
      <div ref={draggableRef}>{ElementView && <ElementView where="default" id={id} isSelected={selection.isSelected} />}</div>
    </div>
  );
};

/**
 * Element Wrapper In Board
 */
export const ElementInBoard = (props: TElementInBoardProps) => {
  const { id } = props;

  const isLoaded = useObserveElementLoad(id);

  const isEmpty = !isLoaded;

  if (isEmpty) {
    return null;
  }

  return <ElementInBoardMain id={id} />;
};
