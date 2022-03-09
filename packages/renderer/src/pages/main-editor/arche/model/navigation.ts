import type { TSyncableDocOpts } from './syncable-doc';
import { SyncableDoc } from './syncable-doc';

export type TNavigationHistoryEventType = 'change';

/**
 * Navigation History
 */
export class Navigation extends SyncableDoc {
  constructor(opts: TSyncableDocOpts) {
    super({ ...opts, autoLoad: true });

    this.getMap<string[]>('state');
  }

  private get state() {
    return this.getMap<string[]>('state');
  }

  /**
   * Current Navi Path
   */
  get currentPath(): string[] {
    const nodePath = this.state.get('path') || [];
    return nodePath;
  }

  /**
   * Push New Path
   *
   * @param path
   */
  push(nodePath: string[]) {
    this.state.set('path', nodePath);
  }
}
