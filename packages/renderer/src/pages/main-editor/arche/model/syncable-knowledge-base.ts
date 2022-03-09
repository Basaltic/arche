import type { IProvider } from '../provider/provider.interface';
import type { SyncableDocCollection } from './syncable-doc-collection';
import { SyncableDoc, TSyncableDocOpts } from './syncable-doc';
import { SyncableNode } from './syncable-node';
import { SyncableNodeFragment } from './syncable-node-fragment';
import { SyncableDocFactory } from './factory';

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
   * @param nodesToInsert
   */
  insertNodeAt(parentNodeId: string, at: number, nodesToInsert: SyncableNode[], origin?: any) {
    const fragment = this.getFragment(parentNodeId);

    const nodeIds: string[] = [];
    for (const node of nodesToInsert) {
      nodeIds.push(node.guid);
      this.docCollection.set(node.guid, node);
    }

    fragment.insertAt(at, nodeIds);
  }

  /**
   *
   * @param parentNodeId
   * @param nodesToInsert
   */
  insertNodeAtEnd(parentNodeId: string, nodesToInsert: SyncableNode[]) {
    const fragment = this.getFragment(parentNodeId);

    const nodeIds: string[] = [];
    for (const node of nodesToInsert) {
      nodeIds.push(node.guid);
      this.docCollection.set(node.guid, node);
    }

    fragment.insertAtEnd(nodeIds);
  }

  /**
   *
   * @param parentNodeId
   * @param at
   * @param length
   */
  removeNodeAt(parentNodeId: string, at: number, length = 1) {
    const fragment = this.getFragment(parentNodeId);
    fragment.remove(at, length);
  }
}
