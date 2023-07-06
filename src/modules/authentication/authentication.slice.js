import { createSlice } from '@reduxjs/toolkit';
import { signOut } from './authentication.action';

const initialState = {
  user: {},
  error: null,
  loading: false
};

// TODO: this is an example
export const authUserReducer = createSlice({
  name: 'authentication',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // SignOut
    builder.addCase(signOut.fulfilled, (state) => {
      state.user = {};
      state.error = null;
      state.loading = false;
    });
    builder.addCase(signOut.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signOut.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        // Being that we passed in ValidationErrors to rejectType in `createAsyncThunk`, the payload will be available here.
        state.error = {
          message: action.payload.errorMessage
        };
      } else {
        state.error = {
          message: action.error.message
        };
      }
    });
  }
});

export default authUserReducer.reducer;
