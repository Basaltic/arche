import React from 'react';
import { NavigationContextProvider, useLocation } from '../../hooks/navigation.hooks';
import { ElementInBoard } from '../element/element-in-board';
import { useFragmentBinding } from './use-fragment-binding';

export type TElementFragment = {
  /**
   * 父节点
   */
  id: string;
};

export const ElementFragment = (props: { id: string }) => {
  const { id } = props;

  const base = useLocation();

  const fragment = useFragmentBinding(id);
  const nodeIds = fragment?.nodeIds;

  console.log('current fragment ===> ', id, nodeIds);

  return (
    <NavigationContextProvider value={{ base, current: id }}>
      {nodeIds && nodeIds.map(id => <ElementInBoard key={id} id={id} />)}
    </NavigationContextProvider>
  );
};
