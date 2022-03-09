import { useForceUpdate } from '/@/hooks/use-force-update';
import { createContext, useContext, useEffect } from 'react';
import { useNavigation, useKnowlegeBase } from './editor.hooks';

export const NavigationContext = createContext<{ base: string[]; current: string }>({ base: [], current: '' });

export const NavigationContextProvider = NavigationContext.Provider;

export function useLocation() {
  const { base, current } = useContext(NavigationContext);

  return current ? [...base, current] : base;
}

/**
 * Bind Navigation
 */
export function useNavigationBinding() {
  const forceUpdate = useForceUpdate();
  const navigation = useNavigation();
  const knowledgeBase = useKnowlegeBase();

  useEffect(() => {
    navigation.on('updateV2', forceUpdate);

    return () => {
      navigation.off('updateV2', forceUpdate);
    };
  }, [navigation]);

  let currentPath = navigation.currentPath;
  if (currentPath.length <= 0) {
    const rootId = knowledgeBase.rootNodeId;
    if (rootId) {
      currentPath = [rootId];
    }
  }

  return { currentPath };
}

export function useCurrentPresentNodeId() {
  const navigation = useNavigation();
  const knowledgeBase = useKnowlegeBase();

  let currentPath = navigation.currentPath;
  if (currentPath.length <= 0) {
    const rootId = knowledgeBase.rootNodeId;
    if (rootId) {
      currentPath = [rootId];
    }
  }

  return {
  };
}
