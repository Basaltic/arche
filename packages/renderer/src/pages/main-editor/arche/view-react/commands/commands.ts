import { TSyncableNodeMeta } from '../../model/syncable-node';
import { Operations } from '../../state/operations';
import { TElement } from '../board/element/element.types';

/**
 * Append New Element to list end
 *
 * @param parentId
 * @param element
 * @returns
 */
export const appendElement = (parentId: string, element: TElement) => (ops: Operations) => {
  const { name, type, state, position } = element;
  // TODO: 根据一些情况，动态位置判断
  ops.insertNodeToEnd(parentId, { meta: { name, type }, state, position });
};

/**
 * Move Element
 *
 * @param nodeId
 * @param x
 * @param y
 * @returns
 */
export const moveElement = (id: string, x: number, y: number) => (ops: Operations) => {
  ops.changePosition(id, { x, y });
};

/**
 * Change Meta Info
 */
export const changeMeta = (nodeId: string, meta: Partial<TSyncableNodeMeta>) => (ops: Operations) => {
  ops.changeMeta(nodeId, meta);
};

/**
 * Change State
 */
export const changeState =
  <T = any>(nodeId: string, state: Partial<T>) =>
  (ops: Operations) =>
    ops.changeState(nodeId, state);

/**
 * Navigate
 */
export const navigate = (path: string[]) => (ops: Operations) => ops.navigate(path);
