import React, { memo } from 'react';
import type { TBoardElementState } from '.';
import type { TElementViewProps } from '../element.types';
import { useElementMeta, useElementState } from '../../../hooks/node.hooks';
import { useLocation } from '../../../hooks/navigation.hooks';
import { useCommands } from '../../../hooks/commands.hooks';
import { BoardIconOutline } from '/@/components/icons/node/board-icon';
import { hexToRgb } from '/@/utils/color';

/**
 * Board Element View Component
 */
export const BoardElementView = memo((props: TElementViewProps) => {
  const { id } = props;

  const commands = useCommands();
  const boardMeta = useElementMeta(id);
  const boardState = useElementState<TBoardElementState>(id);

  const path = useLocation();

  const color = boardState.color || '#ED8936';
  const { r, g, b } = hexToRgb(color) || { r: 0, g: 0, b: 0 };
  const fillColor = r * 0.299 + g * 0.587 + b * 0.114 > 186 ? '#2D3748' : '#E2E8F0';

  const doubleClickToNavigate = () => {
    commands.navigate([...path, id]);
  };

  return (
    <div className="p-1 flex items-center rounded-md bg-white shadow-inner" onDoubleClick={doubleClickToNavigate}>
      <BoardIconOutline className="text-sm" strokeColor={color} fillColor={fillColor} />
      <div className="ml-1 text-sm">{boardMeta.name}</div>
    </div>
  );
});
