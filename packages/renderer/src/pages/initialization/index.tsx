import React from 'react';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import { useAppUseCase, useKnowledgeBaseUseCase, useUserUseCase } from '../..//domain/hooks';

/**
 * 初始化页面
 */
export const InitPage = () => {
  const navigate = useNavigate();
  const appUseCase = useAppUseCase();
  const userUseCase = useUserUseCase();
  const knowledgeBaseUseCase = useKnowledgeBaseUseCase();

  const { data, error, isValidating } = useSWR('/app/info', async () => {
    const appInfo = await appUseCase.getAppInfo();
    if (appInfo) {
      const user = await userUseCase.getUserById(appInfo.currentUser);
      const userSetting = await userUseCase.getUserSettingByUid(user?.id || '');
      const knowledgeBase = await knowledgeBaseUseCase.getKnowledgeBaseById(userSetting?.currentKnowledgeBase || '');

      navigate(`/arche/edit/${user?.id}/${knowledgeBase?.id}`);
    } else {
      navigate('/user-guide');
    }
  });

  const isLoading = !data && !error && isValidating;

  if (isLoading) {
    return <div className="relative w-full h-full">loading</div>;
  }
  return <div></div>;
};
