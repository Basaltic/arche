import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { TUserGuideFormValues } from '../state';
import { useUserGuideForm } from '../state';
import { useAppUseCase } from '../../../domain/hooks';

/**
 * 结束创建
 */
export const StepDone = () => {
  const navigate = useNavigate();

  const form = useUserGuideForm();
  const appUseCase = useAppUseCase();

  const submitToInitialize = async (values: TUserGuideFormValues) => {
    const { knowledgeBaseName } = values;

    const res = await appUseCase.initializeApp({ kbName: knowledgeBaseName });
    if (res.success) {
      navigate(`/arche/edit/${res.data.uid}/${res.data.kbid}`);
    }
  };

  return (
    <div className="container">
      <h1 className="text-4xl" onClick={form.handleSubmit(submitToInitialize)}>
        完成创建
      </h1>
    </div>
  );
};
