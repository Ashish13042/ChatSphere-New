import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/services/GlobalApi";

interface Contact {
  _id: string;
  contactId: string;
  name: string;
  userName: string;
  profileImage: string;
  email?: string;
  lastMessage: string;
  lastMessageType: string;
  lastMessageTime: string;
  addedAt: string;
  pinned?: boolean;
}

interface ContactsState {
  contacts: Contact[];
  loading: boolean;
  error: string | null;
}

const initialState: ContactsState = {
  contacts: [],
  loading: false,
  error: null,
};

// Async thunk to fetch contacts
export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async () => {
    const response = await axiosInstance.get("/contacts");
    return response.data as Contact[];
  }
);

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts = action.payload;
        state.loading = false;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch contacts";
      });
  },
});

export default contactsSlice.reducer;
