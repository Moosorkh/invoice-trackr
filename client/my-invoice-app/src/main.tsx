import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from react-dom/client
import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import AppRoutes from './routes';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root')!); // Create root correctly
root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </QueryClientProvider>
  </StrictMode>,
);
