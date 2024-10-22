import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchInvoices } from '../redux/invoicesSlice';
import InvoiceModal from './InvoiceModal';

const InvoiceList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { invoices, loading, error } = useSelector(
    (state: RootState) => state.invoices,
  );

  // State to manage modal visibility and selected invoice
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  useEffect(() => {
    dispatch(fetchInvoices());
  }, [dispatch]);

  // Function to handle invoice click
  const handleInvoiceClick = (invoice: any) => {
    setSelectedInvoice(invoice);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedInvoice(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Invoices</h2>
      <ul>
        {invoices.map((invoice: { id: string; vendor_name: string; amount: number; due_date: string }) => (
          <li key={invoice.id} onClick={() => handleInvoiceClick(invoice)}>
            {invoice.vendor_name} - ${invoice.amount} - {invoice.due_date}
          </li>
        ))}
      </ul>

      {/* Modal Component */}
      {selectedInvoice && (
        <InvoiceModal
          visible={isModalOpen}
          onClose={handleModalClose}
          invoice={selectedInvoice}
        />
      )}
    </div>
  );
};

export default InvoiceList;
