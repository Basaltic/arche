import React, { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '/@/components/button';
import { useAppUseCase } from '/@/domain/hooks';

/**
 * 欢迎使用
 */
export const StepWelcome = memo(() => {
  const navigate = useNavigate();
  const appUseCase = useAppUseCase();

  const [loading, setLoading] = useState(false);

  /**
   *
   */
  const handleClickToInitialize = async () => {
    setLoading(true);
    try {
      const res = await appUseCase.initializeApp();
      if (res.success) {
        navigate(`/arche/edit/${res.data.uid}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container text-center">
      <h1 className="text-4xl">欢迎使用 源记</h1>
      <p className="mt-2 text-xl text-slate-500">易用且强大的个人知识库工具，可以轻松的构建并管理您个人的知识体系</p>
      <div className="mt-12">
        <Button width="wide" loading={loading} onClick={handleClickToInitialize}>
          全新开始
        </Button>
        {/* TODO: 同步已有数据 */}
      </div>
    </div>
  );
});
