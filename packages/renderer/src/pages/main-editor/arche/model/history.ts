import { UndoManager } from 'yjs';
import type { SyncableDoc } from './syncable-doc';

// TODO: 两种mutation
// 1. 内容的变更 - 使用 undo manage 实现，只要记录doc id即可
// 2. 新增节点 - 比较特殊，需要记录新增节点的内容，用于在此创建
export type TMutation = string[];

/**
 * 历史记录
 */
export class History {
  private undoMutationStack: TMutation[] = [];
  private redoMutationStack: TMutation[] = [];

  private undoManagerMap = new Map<string, UndoManager>();

  private mutation: TMutation = [];

  isInTransaction = false;

  push(mutation: TMutation) {
    this.undoMutationStack.push(mutation);
    this.redoMutationStack = [];
  }

  /**
   * 绑定需要增加历史功能的节点。
   *
   * @param doc
   */
  bind(doc: SyncableDoc) {
    // 默认跟踪所有的变更
    const undoManager = new UndoManager(Array.from(doc.share.values()), {});
    this.undoManagerMap.set(doc.guid, undoManager);

    doc.on('updateV2', this.recordMutation.bind(this));
    doc.on('destroy', this.recordMutation.bind(this));
  }

  commit() {
    if (this.mutation.length > 0) {
      const m = this.mutation;
      this.push(m);

      this.mutation = [];
    }

    this.isInTransaction = false;
  }

  private recordMutation(update: Uint8Array, origin: string, doc: SyncableDoc) {
    if (this.isInTransaction) {
      this.mutation.push(doc.guid);
    }
  }

  /**
   * 撤销
   */
  undo() {
    const mutation = this.undoMutationStack.pop();

    if (mutation) {
      const len = mutation.length;
      if (len > 0) {
        for (let i = len - 1; i >= 0; i--) {
          const id = mutation[i];
          this.undoManagerMap.get(id)?.undo();
        }

        this.redoMutationStack.push(mutation);
      }
    }
  }

  /**
   * 重放
   */
  redo() {
    const mutation = this.redoMutationStack.pop();

    if (mutation) {
      const len = mutation.length;
      if (len > 0) {
        for (let i = 0; i < len; i++) {
          const id = mutation[i];
          this.undoManagerMap.get(id)?.redo();
        }

        this.undoMutationStack.push(mutation);
      }
    }
  }
}
