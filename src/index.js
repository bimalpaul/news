import React from 'react';
import ReactDOM from 'react-dom/client';
import NewsApp from './NewsApp.jsx';

import 'util'
import { Buffer } from 'buffer'
window.Buffer = Buffer

const root = ReactDOM.createRoot(document.getElementById('news'));
root.render(
  <React.StrictMode>
    <NewsApp />
  </React.StrictMode>
);


