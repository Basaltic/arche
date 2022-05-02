import type { XYCoord } from 'react-dnd';
import { useDrop } from 'react-dnd';
import { useCommandExecutor, useCommands } from '../commands/commands.hooks';

/**
 *
 * @param dropAreaContainerRef
 */
export function useDropToBoard(dropAreaContainerRef: React.RefObject<HTMLDivElement>) {
  const commands = useCommands();
  const commandExecutor = useCommandExecutor();

  /**
   * 元素移动检测
   */
  const [, dropFromBoard] = useDrop(
    {
      accept: ['element'],
      drop: async (item: any, monitor) => {
        const { draggingNodeId } = item;

        // 如果已经有内部的元素处理了drop事件，那么不再处理本逻辑
        const didDrop = monitor.didDrop();
        if (didDrop) return;

        // 1. 有id表示是已经存在的元素，移动之，否则新建之
        // 如果有多个选中的，需要更改所有被选中的元素的位置
        const currentOffset = monitor.getSourceClientOffset() as XYCoord;
        // const initialOffset = monitor.getInitialSourceClientOffset() as XYCoord;

        // const deltaOffset = { x: currentOffset.x - initialOffset.x, y: currentOffset.y - initialOffset.y };
        commandExecutor.execute(commands.moveElement(draggingNodeId, currentOffset.x, currentOffset.y));
        // commands.moveSelectedNodePosition({ deltaOffset });

        // if (isSelected) {
        //   // 当拖动元素是选中的情况下，需要考虑其他选中的元素的位置变换
        //   const deltaOffset = { x: currentOffset.x - initialOffset.x, y: currentOffset.y - initialOffset.y };
        //   commands.moveSelectedNodePosition({ deltaOffset });
        // } else {
        //   const x = clamp(currentOffset.x - rect.x, 0, Number.MAX_VALUE);
        //   const y = clamp(currentOffset.y - rect.y, 0, Number.MAX_VALUE);

        //   commands.moveNodePosition({ movingNodeId: draggingNodeId, x, y });
        // }
      },
    },
    [commands],
  );

  dropFromBoard(dropAreaContainerRef);
}
