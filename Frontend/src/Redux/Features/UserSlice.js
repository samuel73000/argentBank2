import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userName: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.userName = action.payload; // Action simple
    },
  },
});

export const { setUserName } = userSlice.actions;
export default userSlice.reducer;
