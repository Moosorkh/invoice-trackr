import React from 'react';
import { Modal, Button } from 'antd'; // Assuming you are using Ant Design

interface InvoiceModalProps {
  visible: boolean;
  onClose: () => void;
  invoice: any; // Define a more specific type if possible
}

const InvoiceModal: React.FC<InvoiceModalProps> = ({
  visible,
  onClose,
  invoice,
}) => {
  return (
    <Modal
      title={`Invoice from ${invoice?.vendor_name || 'N/A'}`}
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
      ]}
    >
      <p>
        <strong>Vendor:</strong> {invoice?.vendor_name || 'N/A'}
      </p>
      <p>
        <strong>Amount:</strong> ${invoice?.amount || 'N/A'}
      </p>
      <p>
        <strong>Due Date:</strong>{' '}
        {invoice?.due_date
          ? new Date(invoice.due_date).toLocaleDateString()
          : 'N/A'}
      </p>
      <p>
        <strong>Description:</strong> {invoice?.description || 'No Description'}
      </p>
      <p>
        <strong>Status:</strong> {invoice?.paid ? 'Paid' : 'Unpaid'}
      </p>
    </Modal>
  );
};

export default InvoiceModal;
