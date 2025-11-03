import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import {
  fetchInvoicesThunk,
  fetchInvoiceTotalThunk,
} from '../redux/invoicesSlice';
import InvoiceModal from './InvoiceModal';
import './InvoiceList.css';

const InvoiceList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { invoices, loading, error, totalAmount } = useSelector(
    (state: RootState) => state.invoices,
  );

  // State to manage modal visibility and selected invoice
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [showTotal, setShowTotal] = useState(false);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [filterPaid, setFilterPaid] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchInvoicesThunk());
  }, [dispatch]);

  // Function to handle invoice click
  const handleInvoiceClick = (invoice: any) => {
    setSelectedInvoice(invoice);
    setIsModalOpen(true);
    setIsCreateMode(false);
  };

  // Function to close the modal
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedInvoice(null);
    setShowTotal(false);
    setIsCreateMode(false);
    dispatch(fetchInvoicesThunk());
  };

  // Function to view total amount
  const handleViewTotalClick = async () => {
    await dispatch(fetchInvoiceTotalThunk());
    setShowTotal(true);
    setIsModalOpen(true);
  };

  // Function to open create invoice modal
  const handleCreateInvoice = () => {
    setSelectedInvoice(null);
    setIsCreateMode(true);
    setIsModalOpen(true);
  };

  // Filter and search invoices
  const filteredInvoices = invoices.filter((invoice) => {
    const matchesFilter =
      filterPaid === 'all' ||
      (filterPaid === 'paid' && invoice.paid) ||
      (filterPaid === 'unpaid' && !invoice.paid);

    const matchesSearch = invoice.vendor_name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) return <div className="loading">Loading invoices...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="invoice-container">
      <div className="invoice-header">
        <h1>Invoice Manager</h1>
        <div className="header-actions">
          <button className="btn btn-primary" onClick={handleCreateInvoice}>
            + New Invoice
          </button>
          <button className="btn btn-secondary" onClick={handleViewTotalClick}>
            View Total
          </button>
        </div>
      </div>

      <div className="controls">
        <input
          type="text"
          className="search-input"
          placeholder="Search by vendor name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="filter-buttons">
          <button
            className={`filter-btn ${filterPaid === 'all' ? 'active' : ''}`}
            onClick={() => setFilterPaid('all')}
          >
            All
          </button>
          <button
            className={`filter-btn ${filterPaid === 'paid' ? 'active' : ''}`}
            onClick={() => setFilterPaid('paid')}
          >
            Paid
          </button>
          <button
            className={`filter-btn ${filterPaid === 'unpaid' ? 'active' : ''}`}
            onClick={() => setFilterPaid('unpaid')}
          >
            Unpaid
          </button>
        </div>
      </div>

      <div className="invoice-table">
        <table>
          <thead>
            <tr>
              <th>Vendor</th>
              <th>Amount</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.length === 0 ? (
              <tr>
                <td colSpan={5} className="no-data">
                  No invoices found
                </td>
              </tr>
            ) : (
              filteredInvoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td>{invoice.vendor_name}</td>
                  <td className="amount">${invoice.amount.toFixed(2)}</td>
                  <td>{formatDate(invoice.due_date)}</td>
                  <td>
                    <span
                      className={`status-badge ${invoice.paid ? 'paid' : 'unpaid'}`}
                    >
                      {invoice.paid ? 'Paid' : 'Unpaid'}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn-action btn-view"
                      onClick={() => handleInvoiceClick(invoice)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

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
          isCreateMode={isCreateMode}
        />
      )}
    </div>
  );
};

export default InvoiceList;
