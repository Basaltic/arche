import React from 'react';
import { ActionMenu } from './action.menu';
import { ElementMenu } from './element-menu';
import { PathNavigation } from './navigation';

/**
 * All Menus
 */
export const Menu = (props: { loading: boolean }) => {
  const { loading } = props;
  return (
    <>
      {!loading && <PathNavigation />}

      {!loading && <ElementMenu />}

      {/* FOR TEST */}
      {!loading && <ActionMenu />}
    </>
  );
};
