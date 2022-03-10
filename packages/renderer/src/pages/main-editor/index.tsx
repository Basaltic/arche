import React from 'react';
import { useParams } from 'react-router-dom';
import { ArcheEditor } from './arche/view-react/arche-editor';

/**
 * 知识库编辑主视图页面
 */
export const MainEditorPage = () => {
  const params = useParams();

  return <ArcheEditor uid={params.uid || ''} />;
};
