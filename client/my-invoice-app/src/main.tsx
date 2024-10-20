import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from react-dom/client
import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import AppRoutes from './routes';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root')!); // Create root correctly
root.render(
  <StrictMode>
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  </StrictMode>,
);
