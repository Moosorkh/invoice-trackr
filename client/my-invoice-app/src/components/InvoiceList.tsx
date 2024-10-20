import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInvoices } from '../redux/invoicesSlice';
import { RootState, AppDispatch } from '../redux/store';

const InvoiceList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { invoices, loading, error } = useSelector(
    (state: RootState) => state.invoices,
  );

  useEffect(() => {
    dispatch(fetchInvoices());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Invoices</h2>
      <ul>
        {invoices.map((invoice) => (
          <li key={invoice.id}>
            {invoice.vendor_name} - {invoice.amount} - {invoice.due_date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InvoiceList;
