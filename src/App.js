import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MapFun from './components/MapFun';  
import ChatApp from './pages/chat';

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<MapFun />} />
          <Route path="/chat" element={<ChatApp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
