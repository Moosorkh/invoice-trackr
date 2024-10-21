//import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InvoiceList from './components/InvoiceList';
import Login from './components/login';
import { Navigate } from 'react-router-dom';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/invoices" element={<InvoiceList />} />
      {/* Add other routes as needed */}
    </Routes>
  </Router>
);

export default AppRoutes;
