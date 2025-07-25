// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Initialize the React application by rendering App into the DOM element with id="root"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
