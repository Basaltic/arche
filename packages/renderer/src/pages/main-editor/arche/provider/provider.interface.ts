import type * as Y from 'yjs';

export interface IProvider {
  /**
   * Bind the doc instance that need to be persisted and synced.
   * @param doc
   */
  bind(doc: Y.Doc): void;
}

export class ProviderManager implements IProvider {
  constructor(private providers: IProvider[]) {}

  bind(doc: Y.Doc): void {
    for (const provider of this.providers) {
      provider.bind(doc);
    }
  }
}
