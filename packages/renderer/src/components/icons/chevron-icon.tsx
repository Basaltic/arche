import { SvgIcon } from '@mui/material';
import React from 'react';

export const ChevronRightIcon = (props: { color: string; selected?: boolean }) => {
  const { color = 'gray.500', ...otherProps } = props;

  return (
    <SvgIcon viewBox="0 0 24 24" fill="none" stroke="currentColor" {...otherProps}>
      <path d="M9 5L16 12L9 19" stroke={color as string} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </SvgIcon>
  );
};
