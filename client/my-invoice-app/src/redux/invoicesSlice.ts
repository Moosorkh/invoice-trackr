import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchInvoices, fetchInvoiceTotal } from '../api/invoiceApi';

// Fetch invoices from backend
export const fetchInvoicesThunk = createAsyncThunk(
  'invoices/fetchInvoices',
  async () => {
    return await fetchInvoices();
  },
);

// Fetch total amount of invoices
export const fetchInvoiceTotalThunk = createAsyncThunk(
  'invoices/fetchInvoiceTotal',
  async () => {
    return await fetchInvoiceTotal();
  },
);

const initialState: {
  invoices: any[];
  loading: boolean;
  error: string | null;
  totalAmount: number | null;
} = {
  invoices: [],
  loading: false,
  error: null,
  totalAmount: null,
};

const invoicesSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoicesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInvoicesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.invoices = action.payload;
      })
      .addCase(fetchInvoicesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      })
      .addCase(fetchInvoiceTotalThunk.fulfilled, (state, action) => {
        state.totalAmount = action.payload;
      });
  },
});

export default invoicesSlice.reducer;
