import React, { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { KnowledgeBaseEditorState } from '../state/state';
import { CanvasBoard } from './board/board';
import { ElementCustomDragLayer } from './board/element/element-custom-drag-layer';
import { ArcheStateContextProvider } from './hooks/context';
import { Menu } from './menu';

/**
 * Arche Knowledge Base Editor
 *
 * @param props
 * @returns
 */
export const ArcheEditor = (props: { uid: string; knowledgeBaseId: string }) => {
  const [state, setState] = useState<KnowledgeBaseEditorState | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const state = new KnowledgeBaseEditorState({ ...props });
    setState(state);
    setLoading(false);
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <ArcheStateContextProvider value={state}>
        {/* 菜单 */}
        <Menu loading={loading} />

        {/* 画板 */}
        <CanvasBoard loading={loading} />

        {/* Drag Layer */}
        <ElementCustomDragLayer />
      </ArcheStateContextProvider>
    </DndProvider>
  );
};
