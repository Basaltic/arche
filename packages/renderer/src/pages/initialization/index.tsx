import React from 'react';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import { useAppUseCase, useUserUseCase } from '../..//domain/hooks';

/**
 * 初始化页面
 */
export const InitPage = () => {
  const navigate = useNavigate();
  const appUseCase = useAppUseCase();
  const userUseCase = useUserUseCase();

  /**
   * 初始化的逻辑
   */
  const { data, error, isValidating } = useSWR('/app/info', async () => {
    const appInfo = await appUseCase.getAppInfo();
    if (appInfo) {
      const user = await userUseCase.getUserById(appInfo.currentUser);

      navigate(`/arche/edit/${user?.id}`);
    } else {
      navigate('/user-guide');
    }
  });

  const isLoading = !data && !error && isValidating;

  if (isLoading) {
    return <div className="relative w-full h-full">loading</div>;
  }
  return <div />;
};
