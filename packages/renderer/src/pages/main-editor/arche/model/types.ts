export type NodeId = string;

/**
 * 节点（文档）的位置
 */
export interface ILocation {
  /**
   * 父节点
   */
  parentId: string;
}
