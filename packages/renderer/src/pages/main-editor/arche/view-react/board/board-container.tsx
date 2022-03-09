import React, { useEffect, useRef } from 'react';
import OverlayScrollbars from 'overlayscrollbars';
import bgSvg from '../assets/bg/bg-point.svg';
import { useDropToBoard } from './use-drop-to-board';
import { useSelection } from '../hooks/editor.hooks';

/**
 *
 *
 * @param props
 * @returns
 */
export const BoardContainer = (props: JSX.ElementChildrenAttribute) => {
  const { children } = props;
  const ref = useRef(null);

  useDropToBoard(ref);

  const selection = useSelection();

  useEffect(() => {
    if (ref.current) {
      OverlayScrollbars(ref.current, {
        overflowBehavior: { x: 'scroll', y: 'scroll' },
        scrollbars: { clickScrolling: true },
      });
    }
  });

  const onClick = () => {
    selection.deselectAll();
  };

  return (
    <div
      ref={ref}
      className="relative w-full h-full overflow-auto z-0 bg-slate-300"
      style={{ backgroundImage: `url(${bgSvg})` }}
      onClick={onClick}
    >
      <div className="relative min-w-full min-h-full" style={{ width: 1000, height: 2000 }}>
        {children}
      </div>
    </div>
  );
};
