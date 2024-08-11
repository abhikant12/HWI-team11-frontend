import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
  
import GetCityDetail from './components/GetCityDetails';
import ChatApp from './pages/chat';

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<GetCityDetail />} />
          <Route path="/chat" element={<ChatApp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
