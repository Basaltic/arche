import * as Y from 'yjs';
import type { DocOpts } from 'yjs/dist/src/internals';
import { HISTORY_TRACTER_MARK } from './constants';

export type TSyncableDocOpts = DocOpts & {
  /**
   * 是否本地持久化
   *
   * @default true
   */
  isLocalPersist?: boolean;

  /**
   * 是否远程持久化
   *
   * @default true
   */
  isRemotePersist?: boolean;

  /**
   * 是否已经加载过了
   */
  isLoaded?: boolean;

  /**
   * 表示本文档是否是新建的，
   */
  isNew?: boolean;
};

/**
 * 可同步文档
 */
export abstract class SyncableDoc extends Y.Doc {
  /**
   * 是否本地持久化
   */
  isLocalPersist: boolean;

  /**
   * 是否远程持久化
   */
  isRemotePersist?: boolean;

  constructor(opts: TSyncableDocOpts) {
    super(opts);

    this.isLoaded = opts.isLoaded || false;
    this.isLocalPersist = opts.isLocalPersist || true;
    this.isRemotePersist = opts.isRemotePersist || true;

    this.on('load', () => {
      this.isLoaded = true;
      this.shouldLoad = false;
      this.autoLoad = false;
    });
  }

  transact(f: (arg0: Y.Transaction) => void, origin: any = HISTORY_TRACTER_MARK): void {
    return super.transact(f, origin);
  }
}
