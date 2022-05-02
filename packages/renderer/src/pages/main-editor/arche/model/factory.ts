import { generateId } from '../base/id';
import type { IProvider } from '../provider/provider.interface';
import type { History } from './history';
import type { SyncableDocCollection } from './syncable-doc-collection';
import type { TSyncableNodeMeta, TSyncableNodePostiion } from './syncable-node';
import { SyncableNode } from './syncable-node';
import { SyncableNodeFragment } from './syncable-node-fragment';

export type TSyncableFactorynOpts = {
  docCollection: SyncableDocCollection;
  provider?: IProvider;
  history?: History;
};

/**
 * A Factory to create syncable doc instance
 */
export class SyncableDocFactory {
  private docCollection: SyncableDocCollection;
  private provider?: IProvider;
  private history?: History;

  constructor(opts: TSyncableFactorynOpts) {
    this.docCollection = opts.docCollection;
    this.provider = opts.provider;
    this.history = opts.history;
  }

  /**
   * 创建新的 节点
   *
   * @param id
   * @param meta
   * @param state
   * @returns
   */
  createNode(id?: string, opts?: { meta?: TSyncableNodeMeta; state?: Record<string, any>; position?: TSyncableNodePostiion }) {
    const { meta, state, position } = opts || {};
    const isNew = Boolean(!id && meta && state);

    // 1. 创建实例
    const nodeId = id || generateId();
    const syncableNode = new SyncableNode({ guid: nodeId, isLoaded: isNew });

    // 2. 绑定 provider
    this.provider?.bind(syncableNode);

    // 3. 初始数据设置
    syncableNode.setAll({ meta, state, position });

    // 4. undo manager 绑定
    this.history?.bind(syncableNode);

    // 5. 实例放入容器中
    this.docCollection.set(nodeId, syncableNode);

    return syncableNode;
  }

  /**
   * 创建节点列表容器
   *
   * @param fragmentId
   * @returns
   */
  createNodeFragment(fragmentId: string) {
    // 创建实例
    const fragment = new SyncableNodeFragment({ guid: fragmentId });
    this.docCollection.set(fragmentId, fragment);

    // 绑定 provider
    this.provider?.bind(fragment);

    // undo manager 绑定
    this.history?.bind(fragment);

    return fragment;
  }
}
