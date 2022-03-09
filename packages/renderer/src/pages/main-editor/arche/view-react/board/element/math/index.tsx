import React from 'react';
import { SiLatex } from 'react-icons/si';
import type { TCommonState, TElement } from '../element.types';
import { EElementType } from '../element.types';
import { MathElementView } from './math-element-view';

export type TMathElementState = {
  /**
   * 公式的标题
   */
  title: string;
  /**
   * 公式
   */
  formula: string;
} & TCommonState;

const defaultState: TMathElementState = {
  title: '公式标题',
  formula: '',
};

export const mathElement: TElement<TMathElementState> = {
  name: '公式',
  type: EElementType.Math,
  state: defaultState,
  position: { x: 20, y: 20 },
  view: MathElementView,
  icon: <SiLatex fontSize={20} />,
};
