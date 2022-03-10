import { Operations } from './operations';
import { ArcheEditorState } from './state';

/**
 * A command is just a pure function
 *
 * @params state
 * @params dispatch
 * @returns {boolean} true: applicatable, false: not applicatable
 */
export type TCommand = (ops: Operations) => void;

export interface ICommand {
  readonly state: ArcheEditorState;
  execute(): void;
}
