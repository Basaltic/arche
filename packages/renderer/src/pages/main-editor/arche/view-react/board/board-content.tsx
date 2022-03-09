import React from 'react';
import { NavigationContextProvider, useNavigationBinding } from '../hooks/navigation.hooks';
import { ElementFragment } from './element-fragment';

export const BoardContent = () => {
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
