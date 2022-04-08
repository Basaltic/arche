import * as Y from 'yjs';
import { getDocUseCase } from '/@/domain/hooks';
import type { SyncableDoc } from '../model/syncable-doc';
import type { IProvider } from './provider.interface';

/**
 * 本地同步
 */
export class PersistenceProvider implements IProvider {
  private docUseCase;

  constructor() {
    this.docUseCase = getDocUseCase();
  }

  /**
   * Bind the do to sync
   * @param doc
   */
  async bind(doc: SyncableDoc) {
    if (!doc.isLocalPersist) {
      return;
    }

    if (doc.isLoaded) {
      doc.on('updateV2', this.storeUpdate.bind(this));
      doc.on('destroy', this.destory.bind(this));

      return;
    }

    if (doc.autoLoad) {
      // 同步加载
      await this.loadDoc(doc);
      doc.on('updateV2', this.storeUpdate.bind(this));
      doc.on('destroy', this.destory.bind(this));
    }

    if (doc.shouldLoad) {
      // 开始加载（异步）
      this.loadDoc(doc).then(() => {
        doc.on('updateV2', this.storeUpdate.bind(this));
        doc.on('destroy', this.destory.bind(this));
      });
    }
  }

  /**
   * Persist DOC Update Content
   *
   * @param update
   * @param origin
   * @param doc
   */
  private storeUpdate(update: Uint8Array, origin: any, doc: Y.Doc) {
    console.log('store update ====> ', doc.guid);
    this.docUseCase.store(doc.guid, update, doc);
  }

  /**
   * Load DOC
   *
   * @param doc
   */
  private async loadDoc(doc: Y.Doc) {
    const res = await this.docUseCase.get(doc.guid);
    if (res.success) {
      const updates = res.data;
      for (const update of updates) {
        Y.applyUpdateV2(doc, update.update);
      }
    }

    doc.emit('load', []);
  }

  /**
   * Clear all updates while the doc destory
   * @param doc
   */
  private async destory(doc: Y.Doc) {
    doc.off('updateV2', this.storeUpdate.bind(this));
    doc.off('destroy', this.destory.bind(this));

    this.docUseCase.delete(doc.guid);
  }
}
