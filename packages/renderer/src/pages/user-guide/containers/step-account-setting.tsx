import React from 'react';

export const StepAccountSetting = () => {
  return (
    <div className="container">
      <h1 className="text-4xl">账号设置</h1>
      <p className="mt-2 text-xl text-slate-500">设置账号可以</p>
      <div className="mt-4">
        <input className="input input-bordered input-md block" type="text" placeholder="你的名字" />
        <input className="input input-bordered input-md block" type="text" placeholder="锁屏密码" />
        <button className="btn btn-primary mt-2">下一步</button>
      </div>
    </div>
  );
};
