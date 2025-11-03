import React from 'react';
import MainBlank from './components/Main_blank';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InvoiceList from './components/InvoiceList';
import Login from './components/login';
import Navbar from './components/Navbar';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainBlank />} />
        <Route path="/login" element={<Login />} />
        <Route path="/invoices" element={<InvoiceList />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;