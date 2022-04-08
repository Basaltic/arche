import React from 'react';
import { NavigationContextProvider, useNavigationBinding } from '../hooks/navigation.hooks';
import { ElementFragment } from './element-fragment';

/**
 * 展示知识板内容
 */
export const KnowledgeBoardContent = () => {
  const { currentPath } = useNavigationBinding();

  const basePath = currentPath.slice(0, currentPath.length - 1);
  const currentNodeId = currentPath[currentPath.length - 1];

  console.log('current board ====> ', basePath, currentNodeId);

  return currentNodeId ? (
    <NavigationContextProvider value={{ base: basePath, current: '' }}>
      <ElementFragment id={currentNodeId} />
    </NavigationContextProvider>
  ) : null;
};
