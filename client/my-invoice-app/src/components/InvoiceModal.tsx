import React from 'react';
import { Modal, Button } from 'antd';

interface InvoiceModalProps {
  visible: boolean;
  onClose: () => void;
  invoice: any;
  isTotalView?: boolean; // Optional prop to determine the view mode
}

const InvoiceModal: React.FC<InvoiceModalProps> = ({
  visible,
  onClose,
  invoice,
  isTotalView = false,
}) => {
  return (
    <Modal
      title={`Invoice from ${invoice.vendor_name}`}
      open={visible}
      onCancel={onClose}
      footer={
        <Button key="close" onClick={onClose}>
          Close
        </Button>
      }
    >
      <p>Vendor: {invoice.vendor_name}</p>
      <p>Amount: ${invoice.amount}</p>
      {!isTotalView && (
        <>
          <p>Due Date: {invoice.due_date || 'N/A'}</p>
          <p>Description: {invoice.description || 'No Description'}</p>
          <p>Status: {invoice.paid ? 'Paid' : 'Unpaid'}</p>
        </>
      )}
    </Modal>
  );
};

export default InvoiceModal;
