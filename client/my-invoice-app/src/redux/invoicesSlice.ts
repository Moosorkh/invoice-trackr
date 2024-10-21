import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/invoiceApi';

// Fetch invoices from backend
export const fetchInvoices = createAsyncThunk(
  'invoices/fetchInvoices',
  async () => {
    const response = await axios.get('/invoices');
    return response.data;
  },
);

const initialState: { invoices: any[]; loading: boolean; error: string | null } = {
  invoices: [],
  loading: false,
  error: null,
};

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
        state.error = action.error.message ?? null;
      });
  },
});

export default invoicesSlice.reducer;
