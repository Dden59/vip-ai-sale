import React from 'react';
import ReactDOM from 'react-dom/client';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Не найден элемент root");
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh', 
    color: 'white', 
    fontSize: '40px',
    fontFamily: 'sans-serif',
    flexDirection: 'column',
    gap: '20px'
  }}>
    <h1 style={{margin: 0}}>СИСТЕМА ЗАГРУЖЕНА</h1>
    <div style={{fontSize: '20px', color: '#d946ef'}}>React работает стабильно</div>
  </div>
);
