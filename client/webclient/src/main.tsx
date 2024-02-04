import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <GoogleOAuthProvider clientId="581205926194-nr25f8kqgvskebhmr2jftv0gmo1htkcb.apps.googleusercontent.com">
  <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </React.StrictMode>
  </GoogleOAuthProvider>
);
