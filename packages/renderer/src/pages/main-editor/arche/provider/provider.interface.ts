import type * as Y from 'yjs';
import { ArcheEditorState } from '../state/state';

export interface IProvider {
  /**
   * Bind the doc instance that need to be persisted and synced.
   * @param doc
   */
  bind(doc: Y.Doc): void;

  /**
   * 绑定全局的同步事件，比如删除事件
   */
  bindGlobal(state: ArcheEditorState): void;
}

export class ProviderManager implements IProvider {
  constructor(private providers: IProvider[]) {}

  bind(doc: Y.Doc): void {
    for (const provider of this.providers) {
      provider.bind(doc);
    }
  }

  bindGlobal(state: ArcheEditorState): void {
    for (const provider of this.providers) {
      provider.bindGlobal(state);
    }
  }
}
