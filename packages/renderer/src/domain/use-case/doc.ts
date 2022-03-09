import * as Y from 'yjs';
import { UseCaseResp } from '../base/use-case-resp';
import { createDecorator } from '../../../../shared/di/instantiation';
import { IAppDb } from '../db/app.db';
import { IIdService } from '../service/id-service';

export const IDocUseCase = createDecorator<DocUseCase>('IDocUseCase');

const MAX_UPDATE_COUNT = 20;

/**
 * 应用全局的接口
 */
export class DocUseCase {
  _serviceBrand: undefined;
  constructor(@IAppDb private appDb: IAppDb, @IIdService private idService: IIdService) {}

  /**
   * 获取文档内容
   *
   * @param did
   */
  async get(did: string) {
    const doc = await this.appDb.doc.get(did);
    const updates = await this.appDb.docUpdates.where({ did }).toArray();

    if (doc) {
      updates.unshift({ did, update: doc.content });
    }

    return UseCaseResp.success(updates);
  }

  /**
   * Store Doc Update
   *
   * @param did
   * @param update
   */
  async store(did: string, update: Uint8Array, ydoc: Y.Doc) {
    // - 超过一定的数量合并为一个update，来节省空间
    const updateCount = await this.appDb.docUpdates.where({ did }).count();
    if (updateCount > MAX_UPDATE_COUNT) {
      await this.appDb.docUpdates.where({ did }).delete();
      const isExisted = await this.appDb.doc.where({ id: did }).count();
      if (isExisted) {
        const content = Y.encodeStateAsUpdateV2(ydoc);
        const sv = Y.encodeStateVectorFromUpdateV2(content);
        await this.appDb.doc.update(did, { content, sv });
      } else {
        const content = Y.encodeStateAsUpdateV2(ydoc);
        const sv = Y.encodeStateVectorFromUpdateV2(content);
        await this.appDb.doc.add({ id: did, content, sv });
      }
    } else {
      await this.appDb.docUpdates.add({ did, update });
    }

    return UseCaseResp.success(true);
  }

  /**
   * Clear Doc Updates
   * @param did
   */
  async delete(did: string) {
    try {
      await this.appDb.doc.delete(did);
      await this.appDb.docUpdates.where({ did }).delete();
      return UseCaseResp.success(true);
    } catch (e) {
      return UseCaseResp.failure(e);
    }
  }
}
