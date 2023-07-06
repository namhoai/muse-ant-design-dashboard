import { createAsyncThunk } from '@reduxjs/toolkit';

// action.
import authenticationActionType from './authenticationActionType';

// service.
import { signOut as signOutRequest } from '@modules/authentication/services/authenticationService';

// TODO: Example.
export const signOut = createAsyncThunk(
  authenticationActionType.SIGN_OUT,
  async (data, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('token', data.token);
      const response = await signOutRequest(formData);
      if (!response) throw new Error('Unauthorized!');
      return response.data;
    } catch (err) {
      const error = err;
      if (!error.response) {
        throw err;
      }
      rejectWithValue(error.response.data);
    }
  }
);
