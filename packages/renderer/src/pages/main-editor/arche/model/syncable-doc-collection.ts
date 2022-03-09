import { UndoManager } from 'yjs';
import type { IProvider } from '../provider/provider.interface';
import type { SyncableDoc } from './syncable-doc';

export type TSyncableDocCollectionOpts = {
  provider?: IProvider;
};

/**
 * 统一管理所有的实例
 */
export class SyncableDocCollection {
  private map = new Map<string, SyncableDoc>();
  private undoManagerMap = new Map<string, UndoManager>();

  public isInTransaction = false;

  /**
   * 获取 doc 实例
   *
   * @param id
   * @returns
   */
  get<T extends SyncableDoc = SyncableDoc>(id: string) {
    const doc = this.map.get(id);
    return doc as T;
  }

  /**
   * 放入 doc 实例
   *
   * @param id
   * @param doc
   */
  set<T extends SyncableDoc>(id: string, doc: T) {
    this.map.set(id, doc);
  }

  /**
   * Destory the doc
   *
   * @param id
   */
  destory(id: string) {
    const doc = this.get(id);
    doc.destroy();

    this.map.delete(id);
  }

  /**
   *
   * @param id
   * @returns
   */
  getUndoManager(id: string) {
    return this.undoManagerMap.get(id);
  }
}
