import { useCallback } from 'react';
import type { TCommand } from '../../state/command';
import { useArcheEditorState } from '../hooks/editor.hooks';

import * as commands from './commands';

export function useCommandExecutor() {
  const archeEditorState = useArcheEditorState();

  const execute = useCallback(
    (command: TCommand) => {
      archeEditorState.executeCommand(command);
    },
    [archeEditorState],
  );

  return { execute };
}

export function useCommands() {
  return commands;
}
