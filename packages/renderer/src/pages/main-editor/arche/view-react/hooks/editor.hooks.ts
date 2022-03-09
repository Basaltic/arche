import { useEffect, useContext } from 'react';
import { EditorStateContext } from './context';
import { useForceUpdate } from '../../../../../hooks/use-force-update';

/**
 * 通过context获取编辑器的状态
 */
export const useArcheEditorState = () => {
  const context = useContext(EditorStateContext);

  if (context === null) {
    throw new Error('No Arche Editor State Was Configged!');
  }

  return context;
};

/**
 * Get Selection Instance in hooks
 */
export function useSelection() {
  const state = useArcheEditorState();
  return state.selection;
}

/**
 * Get Navigation Instance in hooks
 */
export function useNavigation() {
  const state = useArcheEditorState();
  return state.navigation;
}

/**
 * Get Current Knowlege base instance in hooks
 */
export function useKnowlegeBase() {
  const state = useArcheEditorState();
  return state.knowledgeBase;
}

/**
 * Get Current History Instance in hooks
 */
export function useHistory() {
  const state = useArcheEditorState();

  return state.history;
}
