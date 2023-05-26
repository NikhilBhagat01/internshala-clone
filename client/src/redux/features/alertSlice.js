import { createSlice } from "@reduxjs/toolkit";

export const alertSlice = createSlice({
  name: "alerts",
  initialState: {
    loading: false,
    isLogin: false,
    isJobLoading: false,
  },
  reducers: {
    showLoading: (state) => {
      state.loading = true;
    },
    hideLoading: (state) => {
      state.loading = false;
    },
    showLogin: (state) => {
      state.isLogin = true;
    },
    hideLogin: (state) => {
      state.isLogin = false;
    },
    showJobLoading: (state) => {
      state.isJobLoading = true;
    },
    hideJobLoading: (state) => {
      state.isJobLoading = false;
    },
  },
});

export const {
  showLoading,
  hideLoading,
  showLogin,
  hideLogin,
  showJobLoading,
  hideJobLoading,
} = alertSlice.actions;
