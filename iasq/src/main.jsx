import { StrictMode } from 'react'
import React from 'react';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App.jsx'

<<<<<<< HEAD
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> 
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
=======
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)


>>>>>>> ce67c39 (handle signup and login functions)

