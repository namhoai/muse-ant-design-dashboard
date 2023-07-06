import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'light'
};

export const globalUIReducer = createSlice({
  name: 'global_ui',
  initialState,
  reducers: {
    changeTheme: (state, action) => {
      state.theme = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { changeTheme } = globalUIReducer.actions;

export default globalUIReducer.reducer;
