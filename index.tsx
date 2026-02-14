
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

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

// Registrazione del Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const swPath = `${(import.meta as any).env.BASE_URL}sw.js`;
    navigator.serviceWorker.register(swPath)
      .then(registration => {
        console.log('SW registrato con successo:', registration.scope);
      })
      .catch(error => {
        console.error('Registrazione SW fallita:', error);
      });
  });
}
