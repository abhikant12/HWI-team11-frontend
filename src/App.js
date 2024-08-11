import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MapFun from './components/MapFun';  


export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<MapFun />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}
