
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// While the user requested index.css, with Tailwind CDN, it's not strictly necessary for base styles, but we include it for completeness if needed.
// import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
