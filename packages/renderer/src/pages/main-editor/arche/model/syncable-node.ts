import type * as Y from 'yjs';
import { SyncableDoc, TSyncableDocOpts } from './syncable-doc';

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
  /**
   *
   */
  x: number;
  /**
   *
   */
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
  isSelected = false;

  constructor(opts: TSyncableNodeOpts) {
    super(opts);

    this.meta = this.getMap<any>('meta');
    this.getMap<any>('state');
    this.getMap<any>('position');

    this.on('select', this.select);
    this.off('deselect', this.deselect);
  }

  get state() {
    return this.getMap('state');
  }

  get position() {
    return this.getMap('position');
  }

  // TODO: 这些操作方法，全部去除，改到在原子操作中去统一实现

  /**
   * 修改某个状态值
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
   * 初始化
   *
   * @param partialMeta
   * @param partialState
   */
  setup(partialMeta: Partial<TSyncableNodeMeta> & Record<string, any>, partialState: Record<string, any>, partialPos: Record<string, any>) {
    const meta = this.getMap('meta') as Y.Map<any>;
    const state = this.getMap('state') as Y.Map<any>;
    const position = this.getMap('position') as Y.Map<any>;

    this.transact(() => {
      let keys = Object.keys(partialMeta);
      for (const key of keys) {
        meta.set(key, partialMeta[key]);
      }

      keys = Object.keys(partialState);
      for (const key of keys) {
        state.set(key, partialState[key]);
      }

      keys = Object.keys(partialPos);
      for (const key of keys) {
        position.set(key, partialPos[key]);
      }
    });
  }

  /**
   *
   */
  setPosition(partialPos: Partial<TSyncableNodePostiion> & Record<string, any>, origin?: any) {
    const position = this.getMap('position') as Y.Map<any>;
    this.transact(() => {
      const keys = Object.keys(partialPos);
      for (const key of keys) {
        position.set(key, partialPos[key]);
      }
    }, origin);
  }

  /**
   * Change the meta info of the node
   *
   * @param partialMeta
   */
  setMeta(partialMeta: Partial<TSyncableNodeMeta> & Record<string, any>, origin?: any) {
    const meta = this.getMap('meta') as Y.Map<any>;
    this.transact(() => {
      const keys = Object.keys(partialMeta);
      for (const key of keys) {
        meta.set(key, partialMeta[key]);
      }
    }, origin);
  }

  /**
   * Change the state of the node
   *
   * @param partialState
   */
  setState(partialState: Record<string, any>, origin?: any) {
    const state = this.getMap('state') as Y.Map<any>;

    this.transact(() => {
      const keys = Object.keys(partialState);
      for (const key of keys) {
        state.set(key, partialState[key]);
      }
    }, origin);
  }

  private select() {
    this.isSelected = true;
  }

  private deselect() {
    this.isSelected = false;
  }
}
