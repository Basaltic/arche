import React, { memo } from 'react';
import { useUserGuideAction } from '../state';

/**
 * 欢迎使用
 *
 */
export const StepWelcome = memo(() => {
  const actions = useUserGuideAction();

  return (
    <div className="container">
      <h1 className="text-4xl">欢迎使用 源记（Arche Note）</h1>
      <p className="mt-2 text-xl text-slate-500">一款易用且强大的个人知识库工具，可以轻松的构建并管理您个人的知识体系。</p>
      <div className="mt-4">
        <button className="btn btn-primary" onClick={actions.nextStep}>
          开始使用
        </button>
      </div>
    </div>
  );
});
