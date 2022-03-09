import type { Table } from 'dexie';
import type { TApp, TDoc, TDocUpdate, TUser, TUserSetting } from './table';
import Dexie from 'dexie';
import { createDecorator } from '../../../../shared/di/instantiation';

export interface IAppDb {
  app: Table<TApp>;
  users: Table<TUser>;
  userSetting: Table<TUserSetting>;
  docUpdates: Table<TDocUpdate>;
  doc: Table<TDoc>;
}

export const IAppDb = createDecorator<IAppDb>('IAppDb');

/**
 * 应用的主数据库
 */
export class AppDb extends Dexie {
  app!: Table<TApp>;

  users!: Table<TUser>;
  userSetting!: Table<TUserSetting>;

  docUpdates!: Table<TDocUpdate>;
  doc!: Table<TDoc>;

  constructor() {
    super('app');
    this.version(1).stores({
      app: 'id, currentUser',
      users: 'id, name, currentKnowledgeBase',
      userSetting: 'id',
      knowledgeBases: 'id, uid, name',
      docUpdates: '++id, did',
      doc: 'id',
    });
  }
}
