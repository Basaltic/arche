import { useArcheEditorState } from './editor.hooks';

export function useStateQueries() {
  const state = useArcheEditorState();

  /**
   * 获取当前展示的节点id
   */
  const getPresentNodeId = () => {
    let currentPath = state.navigation.currentPath;
    if (currentPath.length <= 0) {
      const rootId = state.knowledgeBase.rootNodeId;
      if (rootId) {
        currentPath = [rootId];
      }
    }
    return currentPath[currentPath.length - 1];
  };

  return { getPresentNodeId };
}
