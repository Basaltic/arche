import React from 'react';

export type TButtonProps = {} & JSX.ElementChildrenAttribute;

/**
 * 按钮
 */
export const Button = (props: TButtonProps) => {
  const { children } = props;

  return <div>{children}</div>;
};
