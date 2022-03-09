import type { TSyncableDocOpts } from './syncable-doc';
import { SyncableDoc } from './syncable-doc';

/**
 * Node Selection
 *
 */
export class Selection extends SyncableDoc {
  private listeners = new Map<string, () => void>();

  constructor(opts: TSyncableDocOpts) {
    super({ ...opts, autoLoad: true, shouldLoad: false, isLoaded: true });

    this.selectedNodeIds.observe((change) => {
      change.keys.forEach((delta, key) => {
        this.listeners.get(key)?.();
      });
    });

    this.getMap<boolean>('selectedNodeIds');
  }

  get selectedNodeIds() {
    return this.getMap<boolean>('selectedNodeIds');
  }

  subscribe(id: string, cb: () => void) {
    this.listeners.set(id, cb);
  }

  unsubscribe(id: string) {
    this.listeners.delete(id);
  }

  /**
   * 检测输入的节点是否被选中
   *
   * @param nodeId
   * @returns
   */
  checkIsSelected(nodeId: string) {
    const selected = this.selectedNodeIds.get(nodeId) === true;
    return selected;
  }

  /**
   * 选中节点
   */
  select(nodeIds: string[]) {
    if (nodeIds && nodeIds.length > 0) {
      this.transact(() => {
        for (const nodeId of nodeIds) {
          this.selectedNodeIds.set(nodeId, true);
        }
      });
    }
  }

  /**
   * 选中输入的节点，并反选其他节点
   */
  selectAndDeselectOthers(nodeIds: string[]) {
    this.transact(() => {
      // 1. 先清空所有节点
      this.selectedNodeIds.clear();
      // 2. 然后选中需要选中的节点
      for (const nodeId of nodeIds) {
        this.selectedNodeIds.set(nodeId, true);
      }
    });
  }

  /**
   * 反选节点
   */
  deselect(nodeIds: string[]) {
    this.transact(() => {
      for (const nodeId of nodeIds) {
        this.selectedNodeIds.delete(nodeId);
      }
    });
  }

  /**
   * Deselect All Nodes
   */
  deselectAll() {
    this.transact(() => {
      this.selectedNodeIds.clear();
    });
  }
}
