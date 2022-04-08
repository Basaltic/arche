import { HISTORY_NOT_TRACK_MARK } from '../model/constants';
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
    node.setMeta(meta);
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
    node.setState(state);
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
    node.setPosition(position);
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

    fromFg.remove(from.at);
    toFg.insertAtEnd([nodeId]);
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
    this.state.knowledgeBase.insertAt(parentNodeId, at, [node.guid]);
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

    // 重要：
    // - 首先在回收站插入节点，但是不追踪历史变更
    // - 然后把回收站的节点id，移动到主知识库中
    // 这样变相的实现节点的删除，并且保证节点不会漏删，因为至少在回收站中有引用
    this.state.trash.insertAtEndInRoot([node.guid], HISTORY_NOT_TRACK_MARK);

    const fromFg = this.state.trash.getRootFragment();
    const toFg = this.state.knowledgeBase.getFragment(parentNodeId);

    fromFg.removeLast();
    toFg.insertAtEnd([node.guid]);

    return this;
  }

  /**
   * Move to Trash
   */
  removeNode(parentNodeId: string, at: number) {
    const nodeIdToRemove = this.state.knowledgeBase.getNodeIdAt(parentNodeId, at);
    this.state.knowledgeBase.removeAt(parentNodeId, at);
    this.state.trash.insertAtEndInRoot([nodeIdToRemove]);
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
