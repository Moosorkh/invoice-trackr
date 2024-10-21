import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

// Interceptor to add token to every request
api.interceptors.request.use(
  (config) => {
    //check if expired
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

export default api;
