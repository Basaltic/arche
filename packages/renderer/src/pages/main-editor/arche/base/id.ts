import { nanoid } from 'nanoid';

export const BASE_ID_SIZE = 30;

export const NODE_FRAGMENT_ID_PREFIX = 'f+';

/**
 * Generate Common Id
 *
 * @returns
 */
export function generateId() {
  return nanoid(BASE_ID_SIZE);
}

/**
 * Generate Node Fragment Id By node id
 *
 * @param nodeId
 * @returns
 */
export function generateNodeFragmentId(nodeId: string) {
  return `${NODE_FRAGMENT_ID_PREFIX}${nodeId}`;
}
