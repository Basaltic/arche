import type React from 'react';

/**
 * Element Type For Arche
 */
export enum EElementType {
  /**
   * 容器、画板
   */
  BOARD = 'board',

  // ---- 聚合开始
  /**
   * 列聚合
   */
  COLUMN = 'column',
  /**
   * 行聚合
   */
  ROW = 'row',

  // ---- 聚合结束

  // ---- 普通节点开始

  /**
   * 普通富文本笔记
   */
  NOTE = 'note',

  /**
   * Math Fomula
   */
  Math = 'math',

  /**
   * 任务列表
   */
  TASK = 'task',

  /**
   * Link
   */
  LINK = 'link',

  /**
   * Files
   */
  FILE = 'file',

  /**
   * Image
   */
  IMAGE = 'image',

  /**
   * Video
   */
  VIDEO = 'video',

  // ---- 普通节点结束
}

/**
 * Common State for Node
 */
export type TCommonState = {
  x?: number;
  y?: number;
};

/**
 * 元素定义
 */
export type TElement<S extends TCommonState = TCommonState> = {
  /**
   * Name of the Element
   */
  name: string;
  /**
   * Type of the node
   */
  type: string;
  /**
   * Default State
   */
  state: S;
  /**
   * Element Default Position
   */
  position: { x: number; y: number };
  /**
   * View
   */
  view: React.FC<TElementViewProps>;
  /**
   * Icon View
   */
  icon: React.ReactNode;
};

export type TElementViewProps = {
  /**
   * The identifier to fetch the data the view needed
   */
  id: string;

  /**
   * Where the view will display. e.x default, trash, column, row and so on
   */
  where?: TWhere;

  /**
   * Wether the element is selected
   */
  isSelected?: boolean;
};

/**
 * Define the place where the element view display
 */
export type TWhere = 'default' | 'board' | 'dragging' | 'trash';
