import { useCallback } from 'react';
import { TCommand } from '../../state/command';
import type { Operations } from '../../state/operations';
import { useArcheEditorState } from './editor.hooks';

import * as commands from '../commands/commands';

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
