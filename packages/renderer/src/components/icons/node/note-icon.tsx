import { SvgIcon } from '@mui/material';
import React from 'react';

export const NoteIconOutline = (props: { selected?: boolean }) => {
  return (
    <SvgIcon width="24" height="24" fill="none" viewBox="0 0 24 24" {...props}>
      <path
        fill="white"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M4.75 19.25L9 18.25L18.2929 8.95711C18.6834 8.56658 18.6834 7.93342 18.2929 7.54289L16.4571 5.70711C16.0666 5.31658 15.4334 5.31658 15.0429 5.70711L5.75 15L4.75 19.25Z"
      ></path>
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.25 19.25H13.75"></path>
    </SvgIcon>
  );
};
