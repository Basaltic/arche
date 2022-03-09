import React from 'react';
import type { XYCoord } from 'react-dnd';
import { useDragLayer } from 'react-dnd';
import { ElementInDragging } from './element-in-dragging';

/**
 * 元素拖拽的的样式
 * @returns
 */
export const ElementCustomDragLayer = () => {
  // const selectedIds = useSelectedIds();

  const { isDragging, item, initialOffset, currentOffset } = useDragLayer<{
    item: { draggingNodeId: string };
    itemType: string;
    isDragging: boolean;
    initialOffset: XYCoord;
    currentOffset: XYCoord;
  }>((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType() as string,
    initialOffset: monitor.getInitialSourceClientOffset() ?? { x: 0, y: 0 },
    currentOffset: monitor.getSourceClientOffset() ?? { x: 0, y: 0 },
    isDragging: monitor.isDragging(),
  }));

  // const deltaOffset = { x: currentOffset.x - initialOffset.x, y: currentOffset.y - initialOffset.y };

  if (!isDragging) {
    return null;
  }

  const { draggingNodeId = 'nQesvKkuGkTX62o13eePmNCDXc1bij' } = item ?? {};

  return (
    <div className="fixed left-0 top-0 w-full h-full pointer-events-none z-50">
      <div className="absolute top-0 left-0" style={getItemStyles(initialOffset, currentOffset)}>
        <ElementInDragging id={draggingNodeId} />
      </div>
      {/* 拖动的元素是被选中的情况下才会考虑其他被选中的元素 */}
      {/* {item.isSelected
        ? selectedIds.map((id) => (id !== item.draggingNodeId ? <SibilingDraggingItem key={id} id={id} deltaOffset={deltaOffset} /> : null))
        : null} */}
    </div>
  );
};

function getItemStyles(initialOffset: XYCoord | null, currentOffset: XYCoord | null) {
  if (!initialOffset || !currentOffset) {
    return { display: 'none' };
  }

  const { x, y } = currentOffset;

  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
}
