import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { App } from './App';
import { AddWish } from './routes/AddWish';
import { Navbar } from './components/Navbar';
import { UpdateWish } from './routes/UpdateWish';
import { Login } from './routes/Login';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <Navbar />
    <div className="content">
      <Routes>
        <Route path="/wish/login" element={<Login />} />
        <Route path="/wish/home" element={<App />} />
        <Route path="/wish/add" element={<AddWish />} />
        <Route path='/wish/update/:wishId' element={<UpdateWish />}/>
        <Route path="*" element={<Navigate to="/wish/login" />} />
      </Routes>
    </div>
  </BrowserRouter>,
);