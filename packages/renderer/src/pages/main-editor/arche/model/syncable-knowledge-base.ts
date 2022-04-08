import type { IProvider } from '../provider/provider.interface';
import type { SyncableDocCollection } from './syncable-doc-collection';
import { SyncableDoc, TSyncableDocOpts } from './syncable-doc';
import { SyncableNode } from './syncable-node';
import { SyncableNodeFragment } from './syncable-node-fragment';
import { SyncableDocFactory } from './factory';
import { NodeId } from './types';

export type TSyncableKnowledgeBaseOpts = {
  /**
   * 知识库的id
   */
  guid: string;
  rootNodeId?: string;
  provider?: IProvider;
} & TSyncableDocOpts;

export type TSyncableKnowledgeInfo = {
  name: string;
};

/**
 * 知识库：A Tree Structure persist the relationship of nodes as content
 */
export class SyncableKnowledgeBase extends SyncableDoc {
  private factory: SyncableDocFactory;
  private docCollection: SyncableDocCollection;

  readonly rootNodeId: string;

  constructor(opts: TSyncableKnowledgeBaseOpts, docCollection: SyncableDocCollection, factory: SyncableDocFactory) {
    super(opts);

    if (opts.rootNodeId) {
      this.rootNodeId = opts.rootNodeId;
    } else {
      // 默认id
      this.rootNodeId = `${opts.guid}_root_id`;
    }

    this.factory = factory;
    this.docCollection = docCollection;

    this.getRootNode();
    this.getFragment(this.rootNodeId);

    this.getMap('info');
  }

  /**
   * Check wether inputed id is root id of the tree
   */
  isRoot(id: string) {
    return this.rootNodeId === id;
  }

  /**
   * Get Root Node
   */
  getRootNode() {
    return this.getNode(this.rootNodeId);
  }

  /**
   * Get Node
   */
  getNode(nodeId: string) {
    let node = this.docCollection.get<SyncableNode>(nodeId);
    if (!node) {
      node = this.factory.createNode(nodeId);
    }

    return node;
  }

  getNodeIdAt(parentNodeId: NodeId, at: number) {
    const frag = this.getFragment(parentNodeId);
    return frag.getAt(at);
  }

  getRootFragment() {
    return this.getFragment(this.rootNodeId);
  }

  /**
   * Get child node ids of a parent node
   *
   * @param parentNodeId
   * @returns {NodeFragment}
   */
  getFragment(parentNodeId: string) {
    const fragmentId = `f+${parentNodeId}`;

    let fragment = this.docCollection.get<SyncableNodeFragment>(fragmentId);
    if (!fragment) {
      fragment = this.factory.createNodeFragment(fragmentId);
    }

    return fragment;
  }

  /**
   * Insert Nodes To a Specific Position
   *
   * @param parentNodeId
   * @param at
   * @param nodeIds
   */
  insertAt(parentNodeId: string, at: number, nodeIds: string[], origin?: any) {
    const fragment = this.getFragment(parentNodeId);
    fragment.insertAt(at, nodeIds, origin);
  }

  /**
   *
   * @param parentNodeId
   * @param nodesToInsert
   */
  insertAtEnd(parentNodeId: string, nodeIds: string[], origin?: any) {
    const fragment = this.getFragment(parentNodeId);

    fragment.insertAtEnd(nodeIds, origin);
  }

  /**
   * Insert node ids in root end
   *
   * @param nodeIds
   * @param origin
   */
  insertAtEndInRoot(nodeIds: NodeId[], origin?: any) {
    const fragment = this.getFragment(this.rootNodeId);
    fragment.insertAtEnd(nodeIds, origin);
  }

  /**
   *
   * @param parentNodeId
   * @param at
   * @param length
   */
  removeAt(parentNodeId: string, at: number, length = 1, origin?: any) {
    const fragment = this.getFragment(parentNodeId);
    fragment.remove(at, length, origin);
  }
}
