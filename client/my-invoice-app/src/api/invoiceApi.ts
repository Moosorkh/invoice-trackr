import axios from 'axios';

const API_URL = 'http://localhost:3000/invoices';

export const getInvoices = () => {
  return axios.get(API_URL);
};

export const getInvoiceById = (id: number) => {
  return axios.get(`${API_URL}/${id}`);
};
