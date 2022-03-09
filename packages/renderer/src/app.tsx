import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainEditorPage } from './pages/main-editor';
import { UserGuidePage } from './pages/user-guide';
import { InitPage } from './pages/initialization';

export const App = () => {
  return (
    <div className="relative w-full h-full">
      <Routes>
        <Route path="/" element={<InitPage />} />
        <Route path="/user-guide" element={<UserGuidePage />} />
        <Route path="/arche/edit/:uid/:kbid" element={<MainEditorPage />} />
      </Routes>
    </div>
  );
};
