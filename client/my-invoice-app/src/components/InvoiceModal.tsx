import React, { useState, useEffect } from 'react';
import './InvoiceModal.css';
import { API_URL } from '../config';

interface InvoiceModalProps {
  visible: boolean;
  onClose: () => void;
  invoice: any;
  isCreateMode?: boolean;
  isTotalView?: boolean;
}

const InvoiceModal: React.FC<InvoiceModalProps> = ({
  visible,
  onClose,
  invoice,
  isCreateMode = false,
  isTotalView = false,
}) => {
  const [isEditing, setIsEditing] = useState(isCreateMode);
  const [formData, setFormData] = useState({
    vendor_name: '',
    amount: '',
    due_date: '',
    description: '',
    paid: false,
  });

  useEffect(() => {
    if (invoice && !isCreateMode && !isTotalView) {
      setFormData({
        vendor_name: invoice.vendor_name || '',
        amount: invoice.amount?.toString() || '',
        due_date: invoice.due_date ? invoice.due_date.split('T')[0] : '',
        description: invoice.description || '',
        paid: invoice.paid || false,
      });
    }
  }, [invoice, isCreateMode, isTotalView]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    const url = isCreateMode
      ? `${API_URL}/invoices`
      : `${API_URL}/invoices/${invoice.id}`;

    const method = isCreateMode ? 'POST' : 'PUT';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          amount: parseFloat(formData.amount),
          due_date: new Date(formData.due_date).toISOString(),
        }),
      });

      if (response.ok) {
        alert(
          isCreateMode
            ? 'Invoice created successfully!'
            : 'Invoice updated successfully!',
        );
        onClose();
      } else {
        alert('Failed to save invoice');
      }
    } catch (error) {
      console.error('Error saving invoice:', error);
      alert('Error saving invoice');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this invoice?'))
      return;

    const token = localStorage.getItem('token');
    try {
      const response = await fetch(
        `${API_URL}/invoices/${invoice.id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.ok) {
        alert('Invoice deleted successfully!');
        onClose();
      } else {
        alert('Failed to delete invoice');
      }
    } catch (error) {
      console.error('Error deleting invoice:', error);
      alert('Error deleting invoice');
    }
  };

  const handleTogglePaid = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(
        `${API_URL}/invoices/${invoice.id}/toggle-paid`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.ok) {
        alert('Invoice status updated!');
        onClose();
      } else {
        alert('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Error updating status');
    }
  };

  if (!visible) return null;

  if (isTotalView) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Total Amount</h2>
            <button className="close-btn" onClick={onClose}>
              ×
            </button>
          </div>
          <div className="modal-body total-view">
            <div className="total-amount">
              ${invoice.amount?.toFixed(2) || '0.00'}
            </div>
            <p>Sum of all invoices</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>
            {isCreateMode
              ? 'Create New Invoice'
              : isEditing
                ? 'Edit Invoice'
                : 'Invoice Details'}
          </h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          {isEditing ? (
            <form className="invoice-form">
              <div className="form-group">
                <label>Vendor Name</label>
                <input
                  type="text"
                  name="vendor_name"
                  value={formData.vendor_name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  step="0.01"
                  required
                />
              </div>

              <div className="form-group">
                <label>Due Date</label>
                <input
                  type="date"
                  name="due_date"
                  value={formData.due_date}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                />
              </div>

              <div className="form-group checkbox">
                <label>
                  <input
                    type="checkbox"
                    name="paid"
                    checked={formData.paid}
                    onChange={handleInputChange}
                  />
                  Mark as Paid
                </label>
              </div>
            </form>
          ) : (
            <div className="invoice-details">
              <div className="detail-row">
                <span className="detail-label">Vendor:</span>
                <span className="detail-value">{invoice.vendor_name}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Amount:</span>
                <span className="detail-value amount">
                  ${invoice.amount?.toFixed(2)}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Due Date:</span>
                <span className="detail-value">
                  {new Date(invoice.due_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Description:</span>
                <span className="detail-value">
                  {invoice.description || 'No description'}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Status:</span>
                <span
                  className={`status-badge ${invoice.paid ? 'paid' : 'unpaid'}`}
                >
                  {invoice.paid ? 'Paid' : 'Unpaid'}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          {isEditing ? (
            <>
              <button
                className="btn btn-secondary"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSave}>
                {isCreateMode ? 'Create' : 'Save Changes'}
              </button>
            </>
          ) : (
            <>
              <button className="btn btn-danger" onClick={handleDelete}>
                Delete
              </button>
              <button className="btn btn-secondary" onClick={handleTogglePaid}>
                {invoice.paid ? 'Mark Unpaid' : 'Mark Paid'}
              </button>
              <button
                className="btn btn-primary"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;
