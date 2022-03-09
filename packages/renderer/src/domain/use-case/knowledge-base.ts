import { createDecorator } from '../../../../shared/di/instantiation';
import { IAppDb } from '../db/app.db';
import type { TKnowledgeBase } from '../db/table';
import { IIdService } from '../service/id-service';

export const IKnowledgeBaseUseCase = createDecorator<KnowledgeBaseUseCase>('IKnowledgeBaseUseCase');

/**
 * 知识库接口
 */
export class KnowledgeBaseUseCase {
  constructor(@IAppDb private appDb: IAppDb, @IIdService private idService: IIdService) {}

  /**
   * 获取单个知识库
   */
  async getKnowledgeBaseById(id: string) {
    return this.appDb.knowledgeBases.get(id);
  }

  /**
   * 获取用户的所有知识库信息
   */
  async getAllKnowledgeBase(uid: string) {
    return this.appDb.knowledgeBases.where({ uid }).toArray();
  }

  /**
   * 创建新的知识库
   *
   * @param uid
   * @param partialKnowledgeBase
   */
  async createKnowledgeBase(uid: string, partialKnowledgeBase: Omit<TKnowledgeBase, 'id' | 'uid'>) {
    const kbId = this.idService.getId();
    const knowledgeBase = { ...partialKnowledgeBase, uid, id: kbId };

    await this.appDb.knowledgeBases.add(knowledgeBase);

    return knowledgeBase;
  }

  /**
   * 更新知识库信息
   */
  async updateKnowledgeBase(id: string, partialKnowledgeBase: Omit<TKnowledgeBase, 'id' | 'uid'>) {
    await this.appDb.knowledgeBases.update(id, partialKnowledgeBase);
    return true;
  }
}
