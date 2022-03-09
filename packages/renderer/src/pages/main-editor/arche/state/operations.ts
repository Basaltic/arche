import { HISTORY_TRACTER_MARK } from '../model/constants';
import type { TSyncableNodeMeta, TSyncableNodePostiion } from '../model/syncable-node';
import type { KnowledgeBaseEditorState } from './state';

/**
 * Operations to change state
 */
export class Operations {
  private state: KnowledgeBaseEditorState;

  constructor(state: KnowledgeBaseEditorState) {
    this.state = state;
  }

  /**
   * Change Node Meta Info
   *
   * @param nodeId
   * @param meta
   * @returns
   */
  changeMeta(nodeId: string, meta: Partial<TSyncableNodeMeta>) {
    const node = this.state.knowledgeBase.getNode(nodeId);
    node.setMeta(meta, HISTORY_TRACTER_MARK);
    return this;
  }

  /**
   * Change Node State Info
   *
   * @param nodeId
   * @param state
   * @returns
   */
  changeState(nodeId: string, state: Record<string, any>) {
    const node = this.state.knowledgeBase.getNode(nodeId);
    node.setState(state, HISTORY_TRACTER_MARK);
    return this;
  }

  /**
   * Change the position of the node
   *
   * @param nodeId
   * @param position
   */
  changePosition(nodeId: string, position: TSyncableNodePostiion) {
    const node = this.state.knowledgeBase.getNode(nodeId);
    node.setPosition(position, HISTORY_TRACTER_MARK);
    return this;
  }

  /**
   * 更改逻辑位置
   * - 从一个列表移动到另一个列表的末尾
   *
   * @param nodeId
   * @param from
   * @param to
   */
  changeLogicPosition(nodeId: string, from: { parentId: string; at: number }, to: { parentId: string }) {
    const fromFg = this.state.knowledgeBase.getFragment(from.parentId);
    const toFg = this.state.knowledgeBase.getFragment(to.parentId);

    fromFg.remove(from.at, HISTORY_TRACTER_MARK);
    toFg.insertAtEnd([nodeId], HISTORY_TRACTER_MARK);
  }

  /**
   * Insert a new node. （For now this op is unrevertable）
   *
   * @param parentNodeId
   * @param at
   * @param meta
   * @param state
   * @returns
   */
  insertNode(
    parentNodeId: string,
    at: number,
    config: { meta: TSyncableNodeMeta; state: Record<string, any>; position: TSyncableNodePostiion },
  ) {
    const node = this.state.factory.createNode(undefined, config);
    this.state.knowledgeBase.insertNodeAt(parentNodeId, at, [node]);

    return this;
  }

  /**
   *
   * @param parentNodeId
   * @param meta
   * @param state
   * @returns
   */
  insertNodeToEnd(parentNodeId: string, config: { meta: TSyncableNodeMeta; state: Record<string, any>; position: TSyncableNodePostiion }) {
    const node = this.state.factory.createNode(undefined, config);
    this.state.knowledgeBase.insertNodeAtEnd(parentNodeId, [node]);

    return this;
  }

  /**
   * Move to Trash
   */
  removeNode(parentNodeId: string, at: number) {
    const nodeTree = this.state.knowledgeBase;
    nodeTree.removeNodeAt(parentNodeId, at);

    // TODO: 移动到回收站
    return this;
  }

  /**
   * Navigate to new node
   */
  navigate(path: string[]) {
    this.state.navigation.push(path);
    return this;
  }
}
