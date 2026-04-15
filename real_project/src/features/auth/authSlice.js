import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  role: null, 
  loading: false,
};


// reducer-actionu
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // userin melumatlarini email, password
    // login button/signup
    setUser(state, action) {
      state.user = action.payload.user;
      state.role = action.payload.role;
    },

    // userin cixarilmasi logout
    clearUser(state) {
      state.user = null;
      state.role = null;
    },

    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { setUser, clearUser, setLoading } = authSlice.actions;
export default authSlice.reducer;