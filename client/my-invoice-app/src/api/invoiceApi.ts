import axios from 'axios';
import { API_URL } from '../config';

const api = axios.create({
  baseURL: API_URL,
});

// Interceptor to add token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Function to fetch invoices
export const fetchInvoices = async () => {
  try {
    const response = await api.get('/invoices');
    return response.data;
  } catch (error) {
    console.error('Error fetching invoices:', error);
    throw error;
  }
};

// Function to fetch total invoices amount
export const fetchInvoiceTotal = async () => {
  try {
    const response = await api.get('/invoices/total');
    return response.data._sum.amount; // Adjust this based on the response structure
  } catch (error) {
    console.error('Error fetching total invoices:', error);
    throw error;
  }
};

export default api;
