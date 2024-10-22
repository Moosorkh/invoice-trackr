import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchInvoicesThunk, fetchInvoiceTotalThunk } from '../redux/invoicesSlice';
import InvoiceModal from './InvoiceModal';

const InvoiceList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { invoices, loading, error, totalAmount } = useSelector(
    (state: RootState) => state.invoices,
  );

  // State to manage modal visibility and selected invoice
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [showTotal, setShowTotal] = useState(false);

  useEffect(() => {
    dispatch(fetchInvoicesThunk());
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
    setShowTotal(false);
  };

  // Function to view total amount
  const handleViewTotalClick = async () => {
    await dispatch(fetchInvoiceTotalThunk());
    setShowTotal(true);
    setIsModalOpen(true);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Invoices</h2>
      <ul>
        {invoices.map((invoice) => (
          <li key={invoice.id} onClick={() => handleInvoiceClick(invoice)}>
            {invoice.vendor_name} - ${invoice.amount} - {invoice.due_date}
          </li>
        ))}
      </ul>

      <button onClick={handleViewTotalClick}>View Invoice Total</button>

      {/* Modal Component */}
      {isModalOpen && (
        <InvoiceModal
          visible={isModalOpen}
          onClose={handleModalClose}
          invoice={
            showTotal
              ? { vendor_name: 'Total', amount: totalAmount, due_date: '' }
              : selectedInvoice
          }
        />
      )}
    </div>
  );
};

export default InvoiceList;
