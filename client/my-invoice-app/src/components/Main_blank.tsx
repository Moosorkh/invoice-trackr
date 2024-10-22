import React from 'react';
import { useNavigate } from 'react-router-dom';

const Main_blank: React.FC = () => {
  const navigate = useNavigate();

  const handleInvoicesClick = () => {
    navigate('/invoices');
  };

  return (
    <div>
      <h1>Welcome to Invoice Tracker</h1>
      <button onClick={handleInvoicesClick}>Go to Invoices</button>
    </div>
  );
};

export default Main_blank;
