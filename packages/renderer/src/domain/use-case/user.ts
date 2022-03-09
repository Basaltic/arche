import { createDecorator } from '../../../../shared/di/instantiation';
import { IAppDb } from '../db/app.db';
import type { TUser } from '../db/table';
import { IIdService } from '../service/id-service';

export const IUserUseCase = createDecorator<UserUseCase>('IUserUseCase');

const DEFAULT_USER_ID = 'default';

/**
 * 用户接口
 */
export class UserUseCase {
  constructor(@IAppDb private appDb: IAppDb, @IIdService private idService: IIdService) {}

  /**
   * 根据用户id获取用户信息
   */
  async getUserById(uid: string) {
    const user = await this.appDb.users.get(uid);
    return user;
  }

  /**
   * 修改用户特定的信息
   *
   * @param uid
   * @param user
   */
  async updateUserById(uid: string, user: Partial<Omit<TUser, 'id'>>) {
    await this.appDb.users.update(uid, user);
    return true;
  }

  /**
   * 创建用户
   *
   * @param name
   */
  async createUser(name: string) {
    const userId = this.idService.getUserId();
    const user: TUser = { id: userId, name };
    await this.appDb.users.add({ ...user });

    return user;
  }

  /**
   * 创建一个默认用户
   *
   * @returns
   */
  async createDefaultUser() {
    const user: TUser = { id: DEFAULT_USER_ID, name: '无名' };
    await this.appDb.users.add({ ...user });
    return user;
  }

  async getUserSettingByUid(uid: string) {
    const userSetting = await this.appDb.userSetting.get(uid);
    return userSetting;
  }
}
