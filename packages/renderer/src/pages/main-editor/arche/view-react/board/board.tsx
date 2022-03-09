import React from 'react';
import { BoardContent } from './board-content';
import { BoardContainer } from './board-container';

/**
 * A Canvas Board Style to present elements
 */
export const CanvasBoard = (props: { loading: boolean }) => {
  const { loading } = props;

  if (loading) return <BoardContentLoading />;

  return (
    <BoardContainer>
      <BoardContent />
    </BoardContainer>
  );
};

function BoardContentLoading() {
  return <div>Loading...</div>;
}
