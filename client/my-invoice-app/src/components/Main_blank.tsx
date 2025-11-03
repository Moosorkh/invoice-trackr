import React from 'react';
import { useNavigate } from 'react-router-dom';

const Main_blank: React.FC = () => {
  const navigate = useNavigate();

  const handleInvoicesClick = () => {
    navigate('/invoices');
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Welcome to Invoice Tracker</h1>
      <p>Manage your invoices efficiently and effectively.</p>
      <button onClick={handleInvoicesClick}>Go to Invoices</button>
    </div>
  );
};

export default Main_blank;
