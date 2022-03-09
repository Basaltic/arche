import { SvgIcon } from '@mui/material';
import React, { forwardRef } from 'react';

/**
 * 数字资产管理的图标
 * @param props
 */
export const InformationCircleIconOutline = forwardRef((props: any, ref) => {
  return (
    <SvgIcon fill="none" viewBox="0 0 24 24" {...props} ref={ref}>
      <path
        d="M13 16H12V12H11M12 8H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
        stroke="#111827"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
});
