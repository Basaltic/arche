import type { TSyncableDocOpts } from './syncable-doc';
import { SyncableDoc } from './syncable-doc';

export type TNodeEventType = 'change:meta' | 'change:state';

export type TSyncableNodeMeta = {
  /**
   * Name Of the node
   */
  name: string;
  /**
   * Type of the node
   */
  type: string;
  /**
   * When the node created, millisecond
   */
  createdTime?: number;
  /**
   * Last time the node modified, millisecond
   */
  lastModified?: number;
};

export type TSyncableNodePostiion = {
  x: number;
  y: number;
};

export type TSyncableNodeOpts = {
  guid: string;
} & TSyncableDocOpts;

export type TSetableValus = {
  meta?: Partial<TSyncableNodeMeta> & Record<string, any>;
  state?: Record<string, any>;
  position?: TSyncableNodePostiion;
};

/**
 * 组成知识库的最基本的单位：节点
 */
export class SyncableNode extends SyncableDoc {
  constructor(opts: TSyncableNodeOpts) {
    super(opts);

    this.meta = this.getMap<any>('meta');
    this.getMap<any>('state');
    this.getMap<any>('position');
  }

  /**
   * 节点的状态内容
   */
  get state() {
    return this.getMap('state');
  }

  /**
   * 节点的位置
   */
  get position() {
    return this.getMap('position');
  }

  /**
   * 修改某个状态值
   *
   * @param key
   * @param values
   */
  set(key: 'meta' | 'state' | 'position', values: Record<string, any>, origin?: any) {
    const sharedType = this.getMap(key);
    this.transact(() => {
      const keys = Object.keys(values);
      for (const key of keys) {
        sharedType.set(key, values[key]);
      }
    }, origin);
  }

  /**
   *
   * @param keyValues
   */
  setAll(keyValues: { [key: string]: Record<string, any> }, origin?: any) {
    this.transact(() => {
      const sharedTypeKeys = Object.keys(keyValues);
      for (const sharedTypeKey of sharedTypeKeys) {
        const sharedType = this.getMap(sharedTypeKey);
        const keys = Object.keys(keyValues[sharedTypeKey]);
        for (const key of keys) {
          sharedType.set(key, keyValues[sharedTypeKey][key]);
        }
      }
    }, origin);
  }
}
