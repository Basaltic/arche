import React, { Suspense } from 'react';
import { PageLoading } from '/@/components/page-loading';
import { ArcheEditor } from './arche/view-react/arche-editor';

import { useParams } from 'react-router-dom';

/**
 * 知识库编辑主视图页面
 */
export function MainEditorPage() {
  const { uid } = useParams();

  return (
    <Suspense fallback={<PageLoading />}>
      <ArcheEditor uid={uid || ''} />
    </Suspense>
  );
}
