import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './store/store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <GoogleOAuthProvider clientId="581205926194-nr25f8kqgvskebhmr2jftv0gmo1htkcb.apps.googleusercontent.com">
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
  </GoogleOAuthProvider>
);
