import { createDecorator } from '../../../../shared/di/instantiation';
import { UseCaseResp } from '../base/use-case-resp';
import { IAppDb } from '../db/app.db';
import type { TApp } from '../db/table';
import { DEFAULT_APP_ID, DEFAULT_USER_ID, DEFAULT_USER_NAME } from '../lib/constants';
import { IIdService } from '../service/id-service';

export const IAppUseCase = createDecorator<AppUseCase>('IAppUseCase');

/**
 * 应用全局的接口
 */
export class AppUseCase {
  _serviceBrand: undefined;
  constructor(@IAppDb private appDb: IAppDb, @IIdService private idService: IIdService) {}

  /**
   * 获取应用全局信息
   */
  async getAppInfo() {
    const appInfo = await this.appDb.app.get(DEFAULT_APP_ID);
    return appInfo;
  }

  /**
   * 更新全局应用信息
   *
   * @param appInfo
   */
  async updateAppInfo(appInfo: Partial<Omit<TApp, 'id'>>) {
    await this.appDb.app.update('arche', appInfo);
    return true;
  }

  /**
   * 初次使用 - 初始化用户
   */
  async initializeApp(params: { kbName: string }) {
    const userId = DEFAULT_USER_ID;
    await this.appDb.users.add({ id: userId, name: DEFAULT_USER_NAME });

    const kbid = this.idService.getId();
    await this.appDb.knowledgeBases.add({ id: kbid, uid: userId, name: params.kbName });

    await this.appDb.userSetting.add({ id: userId, currentKnowledgeBase: kbid });

    await this.appDb.app.add({ id: DEFAULT_APP_ID, currentUser: userId });

    return UseCaseResp.success({ uid: userId, kbid });
  }
}
