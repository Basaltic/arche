import { Navigation } from '../model/navigation';
import { Selection } from '../model/selection';
import { SyncableKnowledgeBase } from '../model/syncable-knowledge-base';
import { History } from '../model/history';
import { SyncableDocCollection } from '../model/syncable-doc-collection';
import { SyncableDocFactory } from '../model/factory';
import { Operations } from './operations';
import { IProvider, ProviderManager } from '../provider/provider.interface';
import { EventEmitter } from 'eventemitter3';
import { LocalPersistenceProvider } from '../provider/local-provider';

export type TEditorStateEventType = 'update:node' | 'update:tree';

export type TKnowledgeBaseEditorStateOpts = {
  /**
   * 用户ID，
   */
  uid?: string;
  /**
   * 需要编辑的知识库Id
   */
  knowledgeBaseId: string;
  /**
   * Doc Persistence & Syncer
   */
  providers?: IProvider[];
};

/**
 * 知识库编辑器状态
 */
export class KnowledgeBaseEditorState {
  /**
   * History
   */
  history: History;

  factory: SyncableDocFactory;

  operations: Operations;

  docCollection: SyncableDocCollection;

  provider: ProviderManager;

  /**
   * Main Node Relationship as a Tree
   */
  knowledgeBase: SyncableKnowledgeBase;

  /**
   * 回收站，也是一个特别的知识库
   */
  trash: SyncableKnowledgeBase;

  /**
   * 导航
   */
  navigation: Navigation;

  /**
   * 选中状态
   */
  selection: Selection;

  /**
   * 全局事件
   */
  events = new EventEmitter<'doc:delete'>();

  constructor(opts: TKnowledgeBaseEditorStateOpts) {
    const { knowledgeBaseId, providers = [] } = opts;

    // - 初始化provider
    const localPersistenceProvider = new LocalPersistenceProvider();
    this.provider = new ProviderManager([localPersistenceProvider]);
    this.provider.bindGlobal(this);

    // - 初始化历史记录
    this.history = new History();

    // - initialize syncable doc instance container
    this.docCollection = new SyncableDocCollection();

    // - initialize syncable doc Instance Factory
    this.factory = new SyncableDocFactory({
      docCollection: this.docCollection,
      history: this.history,
      provider: this.provider,
    });

    // - initialize operations
    this.operations = new Operations(this);

    // - initialize main knowledge base instance
    this.knowledgeBase = new SyncableKnowledgeBase(
      {
        guid: knowledgeBaseId,
        autoLoad: true,
      },
      this.docCollection,
      this.factory
    );

    // - 初始化回收站
    this.trash = new SyncableKnowledgeBase(
      {
        guid: 'trash',
        autoLoad: false,
      },
      this.docCollection,
      this.factory
    );

    // - 选中状态初始化
    const selectionId = `selection_${knowledgeBaseId}`;
    this.selection = new Selection({ guid: selectionId });

    // - 导航初始化
    const navigationId = `navigation_${knowledgeBaseId}`;
    this.navigation = new Navigation({ guid: navigationId, autoLoad: true });

    // - add navigation to history (support undo/redo)
    this.history.bind(this.navigation);
  }

  /**
   * Execute Command
   */
  async executeCommand(command: (ops: Operations) => void, config?: { shouldRecord?: boolean }) {
    const shouldRecord = config?.shouldRecord || true;

    this.history.isInTransaction = shouldRecord;

    try {
      command(this.operations);
    } catch (e) {}

    this.history.commit();
  }
}
