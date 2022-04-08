import React from 'react';
import { KnowledgeBoardContent } from './board-content';
import { BoardContainer } from './board-container';

/**
 * A Canvas Board Style to present elements
 */
export const KnowledgeBoard = () => {
  return (
    <BoardContainer>
      <KnowledgeBoardContent />
    </BoardContainer>
  );
};
