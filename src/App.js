import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
  
import GetCityDetail from './components/GetCityDetails';
import ChatApp from './pages/chat';
import { GlobalStateProvider } from './helper/context';


export default function App() {
  return (
    <GlobalStateProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GetCityDetail />} />
          <Route path="/chat" element={<ChatApp />} />
        </Routes>
      </BrowserRouter>
    </GlobalStateProvider>
  );
}
