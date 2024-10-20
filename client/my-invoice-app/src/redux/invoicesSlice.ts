import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Invoice {
  id: number;
  vendor_name: string;
  amount: number;
  due_date: string;
  description: string;
  paid: boolean;
  user_id: number | null;
}

interface InvoicesState {
  invoices: Invoice[];
  loading: boolean;
  error: string | null;
}

const initialState: InvoicesState = {
  invoices: [],
  loading: false,
  error: null,
};

// Fetch invoices from the backend
export const fetchInvoices = createAsyncThunk(
  'invoices/fetchInvoices',
  async () => {
    const response = await axios.get('http://localhost:3000/invoices');
    return response.data;
  },
);

const invoicesSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoices.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.loading = false;
        state.invoices = action.payload;
      })
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch invoices';
      });
  },
});

export default invoicesSlice.reducer;
