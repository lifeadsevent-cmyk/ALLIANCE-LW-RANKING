import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <div style={{
      textAlign: 'center',
      padding: '100px',
      background: '#0f172a',
      color: 'white',
      minHeight: '100vh'
    }}>
      <h1 style={{ color: '#10b981' }}>✅ Application React Fonctionne !</h1>
      <p>Vercel déploiement réussi</p>
      <p>{new Date().toLocaleString()}</p>
    </div>
  </React.StrictMode>
);
