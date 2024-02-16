// import React/*, { useContext }*/  from 'react';
import { StrictMode }             from 'react';
import ReactDOM          from 'react-dom/client';
import App               from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { HashRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <HashRouter>  
      <App />
    </HashRouter>
  </StrictMode> 
);