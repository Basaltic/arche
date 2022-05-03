import './index.css';
import 'overlayscrollbars/css/OverlayScrollbars.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { App } from './app';

const container = document.getElementById('app') as HTMLDivElement;
const root = createRoot(container);

root.render(
  <HashRouter>
    <App />
  </HashRouter>,
);
