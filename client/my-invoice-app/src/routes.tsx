import React from 'react';
import MainBlank from './components/Main_blank';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InvoiceList from './components/InvoiceList';
import Login from './components/login';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<MainBlank />} />
        <Route path="/invoices" element={<InvoiceList />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;