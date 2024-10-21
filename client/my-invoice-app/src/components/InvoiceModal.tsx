import React from 'react';
import { Modal, Button } from 'antd'; // Using Ant Design as an example

const InvoiceModal = ({ visible, onClose, invoice }) => {
  return (
    <Modal visible={visible} onCancel={onClose} footer={null}>
      <h3>{invoice.vendor_name}</h3>
      <p>Amount: ${invoice.amount}</p>
      <p>Due Date: {new Date(invoice.due_date).toLocaleDateString()}</p>
      <p>Description: {invoice.description}</p>
      <p>Status: {invoice.paid ? 'Paid' : 'Unpaid'}</p>
    </Modal>
  );
};

export default InvoiceModal;
