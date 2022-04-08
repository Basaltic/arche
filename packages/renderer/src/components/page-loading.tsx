import React from 'react';

/**
 * 页面级加载
 */
export function PageLoading() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="radial-progress" />
      <div>加载中</div>
    </div>
  );
}
