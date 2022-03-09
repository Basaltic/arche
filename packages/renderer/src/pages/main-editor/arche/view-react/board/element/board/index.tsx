import React from 'react';
import type { TCommonState, TElement } from '../element.types';
import { EElementType } from '../element.types';
import { BoardElementView } from './board-element-view';
import { CgClapperBoard } from 'react-icons/cg';

export type TBoardElementState = {
  title: string;
  background: string;
  icon: string;
  color: string;
} & TCommonState;

const defaultState: TBoardElementState = {
  title: '未命名',
  background: 'gray.50',
  icon: '',
  color: '',
};

/**
 * Board Element Defination
 */
export const boardElement: TElement<TBoardElementState> = {
  name: '知识板',
  type: EElementType.BOARD,
  state: defaultState,
  position: { x: 20, y: 20 },
  view: BoardElementView,
  icon: <CgClapperBoard fontSize={20} />,
};
