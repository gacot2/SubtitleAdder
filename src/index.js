import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Component/App.js';
import reportWebVitals from './reportWebVitals';
import Navbar from './Component/NavBar';
import Footer from './Component/Footer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Navbar />
    <App />
    <Footer/>
  </React.StrictMode>
);

reportWebVitals();
