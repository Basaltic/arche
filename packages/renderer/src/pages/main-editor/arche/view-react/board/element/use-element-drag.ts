import { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

let isSomeElementDragging = false;

/**
 * 画板中元素拖拽逻辑
 *
 * @param props
 * @returns
 */
export function useElementDrag(props: { draggableRef: React.RefObject<HTMLDivElement>; id: string }) {
  const { draggableRef, id } = props;

  /**
   * 节点的拖拽逻辑
   * 1. 节点被选中的情况下不能被拖动
   */
  const [{ isDragging }, drag, preview] = useDrag<{ draggingNodeId: string }, any, { isDragging: boolean }>(
    {
      type: 'element',
      item: () => {
        isSomeElementDragging = true;
        return { draggingNodeId: id };
      },

      collect: (monitor) => {
        const isDragging = monitor.isDragging();
        return { isDragging };
      },
      canDrag: () => true,
      end: () => {
        isSomeElementDragging = false;
      },
    },
    [isSomeElementDragging]
  );

  /**
   * 默认拖拽效果设置为空白
   */
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  drag(draggableRef);

  return { isDragging };
}
