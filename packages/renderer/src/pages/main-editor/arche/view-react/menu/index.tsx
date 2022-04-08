import React from 'react';
import { ActionMenu } from './action.menu';
import { ElementMenu } from './element-menu';
import { PathNavigation } from './navigation';

/**
 * All Menus
 */
export const Menu = () => {
  return (
    <>
      <PathNavigation />

      <ElementMenu />

      {/* FOR TEST */}
      <ActionMenu />
    </>
  );
};
