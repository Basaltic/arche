import React from 'react';
import { useUserGuideAction } from '../state';

export const StepKnowledgeBaseSetting = () => {
  const actions = useUserGuideAction();

  return (
    <div className="container">
      <h1 className="text-4xl">创建您的知识库</h1>
      <p className="mt-2 text-xl text-slate-500">让我们开始创建一个全新的知识库</p>
      <div className="mt-4">
        <input className="input input-bordered input-md block" type="text" placeholder="第一个知识库的名字" />
        <button className="btn btn-primary mt-2" onClick={actions.nextStep}>
          创建新的知识库
        </button>
      </div>
    </div>
  );
};
