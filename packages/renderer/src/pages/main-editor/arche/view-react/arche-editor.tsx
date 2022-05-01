import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import useSWR from 'swr';
import { KnowledgeBaseEditorState } from '../state/state';
import { KnowledgeBoard } from './board/board';
import { ElementCustomDragLayer } from './board/element/element-custom-drag-layer';
import { ArcheStateContextProvider } from './hooks/context';
import { Menu } from './menu';

/**
 * Arche Knowledge Base Editor
 *
 * @param props
 * @returns
 */
export const ArcheEditor = (props: { uid: string }) => {
  const { uid } = props;

  const { data } = useSWR(
    'init-state',
    () => {
      return new KnowledgeBaseEditorState({ uid, knowledgeBaseId: uid });
    },
    { suspense: true },
  );

  console.log(data);

  return (
    <DndProvider backend={HTML5Backend}>
      <ArcheStateContextProvider value={data as any}>
        {/* 菜单 */}
        <Menu />

        {/* 画板 */}
        <KnowledgeBoard />

        {/* Drag Layer */}
        <ElementCustomDragLayer />
      </ArcheStateContextProvider>
    </DndProvider>
  );
};
