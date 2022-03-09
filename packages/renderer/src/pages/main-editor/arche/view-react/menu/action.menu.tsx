import React from 'react';
import { useHistory } from '../hooks/editor.hooks';

/**
 * Action Menu For Test
 */
export const ActionMenu = () => {
  const history = useHistory();

  const redo = () => history.redo();

  const undo = () => history.undo();

  return (
    <div className="absolute bottom-2 right-2 z-40 flex">
      <div className="mt-1 text-xs" onClick={redo}>
        redo
      </div>
      <div className="mt-1 text-xs" onClick={undo}>
        undo
      </div>
    </div>
  );
};
