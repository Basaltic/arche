import { MouseSelectionProps } from './components/selection-container';
import { useSelectionContainer } from './hooks/use-selection-container';
import { boxesIntersect } from './utils/boxes';
import { Point, Box, SelectionBox, OnSelectionChange, MouseSelectionRef } from './utils/types';
import { isElementDraggable } from './utils/utils';

export type { Point, Box, SelectionBox, OnSelectionChange, MouseSelectionRef, MouseSelectionProps };

export { useSelectionContainer, boxesIntersect, isElementDraggable };
