import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <h1 className="text-3xl text-center mt-10 text-green-400">
      React fonctionne !
    </h1>
  </React.StrictMode>
);
