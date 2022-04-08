import * as Y from 'yjs';
import clamp from 'lodash/clamp';
import { SyncableDoc } from './syncable-doc';

export type TFragmentEventType = 'change';

export type TSyncableNodeFragmentOpts = {
  guid: string;
};

/**
 * 节点列表，用于管理子节点
 */
export class SyncableNodeFragment extends SyncableDoc {
  constructor(opts: TSyncableNodeFragmentOpts) {
    super(opts);

    this.getArray('children');
  }

  get length() {
    return this.children.length;
  }

  get childNodeIds(): string[] {
    return this.children.toArray();
  }

  get children() {
    return this.getArray('children') as Y.Array<string>;
  }

  /**
   * Get i-th node id
   * @param index
   */
  getAt(index: number): string {
    return this.children.get(index);
  }

  /**
   * Get a range of node ids
   *
   * @param start
   * @param length
   * @returns
   */
  getRange(start: number, length: number): string[] {
    return this.children.slice(start, start + length);
  }

  /**
   * Insert a list of nodes
   *
   * @param index
   * @param nodeIds
   */
  insertAt(index: number, nodeIds: string[], origin?: any) {
    const idx = clamp(index, 0, this.children.length);
    this.transact(() => {
      this.children.insert(idx, nodeIds);
    }, origin);
  }

  /**
   * Insert A list of nodes to end
   */
  insertAtEnd(nodeIds: string[], origin?: any) {
    this.transact(() => {
      this.children.push(nodeIds);
    }, origin);
  }

  /**
   * Remove i-th node
   *
   * @param at
   */
  remove(at: number, length = 1, origin?: any) {
    if (at <= 0 || at >= this.length) {
      throw new Error(`out of range fragment: ${this.guid}`);
    }

    this.transact(() => {
      this.children.delete(at, length);
    }, origin);
  }

  /**
   * Pop last element
   */
  removeLast(origin?: any) {
    this.transact(() => {
      this.children.delete(this.children.length - 1);
    });
  }
}
