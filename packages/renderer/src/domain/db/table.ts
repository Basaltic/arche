/**
 * 应用全局的信息表定义，只有一条记录
 */
export type TApp = {
  /**
   * 默认为 app，不变
   */
  id: string;
  /**
   * 当前用户
   */
  currentUser: string;
};

/**
 * 用户表定义
 */
export type TUser = {
  /**
   * 用户id
   */
  id: string;
  /**
   * 用户名称
   */
  name: string;
};

export type TUserSetting = {
  /**
   * 用户ID
   */
  id: string;
};

/**
 * 文档，存储整个文档为一个updates
 */
export type TDoc = {
  /**
   * 文档的id
   */
  id: string;
  /**
   * 文档的内容
   */
  content: Uint8Array;
  /**
   * State Vector;
   */
  sv: Uint8Array;
};

/**
 * 文档的Update
 */
export type TDocUpdate = {
  /**
   * Update Id
   */
  id?: number;
  /**
   * Doc Id
   */
  did: string;
  /**
   * update content
   */
  update: Uint8Array;
};
