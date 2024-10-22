import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/Main_blank';
import InvoiceList from './components/InvoiceList';
import Login from './components/login';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/invoices" element={<InvoiceList />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;