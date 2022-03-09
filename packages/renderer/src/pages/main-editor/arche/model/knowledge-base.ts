import type { IProvider } from '../provider/provider.interface';
import type { SyncableDocCollection } from './syncable-doc-collection';
import type { TSyncableDocOpts } from './syncable-doc';
import type { SyncableNode } from './syncable-node';
import type { SyncableNodeFragment } from './syncable-node-fragment';
import type { SyncableDocFactory } from './factory';

export type TKnowledgeBaseOpts = {
  rootNodeId: string;
  provider?: IProvider;
} & TSyncableDocOpts;

export type TSyncableKnowledgeInfo = {
  name: string;
};

/**
 * 知识库：A Tree Structure persist the relationship of nodes as content
 */
export class KnowledgeBase {
  private factory: SyncableDocFactory;
  private docCollection: SyncableDocCollection;

  readonly rootNodeId: string;

  constructor(opts: TKnowledgeBaseOpts, docCollection: SyncableDocCollection, factory: SyncableDocFactory) {
    this.rootNodeId = opts.rootNodeId;

    this.factory = factory;
    this.docCollection = docCollection;

    this.getRootNode();
    this.getFragment(this.rootNodeId);
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

    fragment.insertAt(at, nodeIds, origin);
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
