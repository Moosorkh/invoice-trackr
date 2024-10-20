import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InvoiceList from './components/InvoiceList';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/invoices" element={<InvoiceList />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
