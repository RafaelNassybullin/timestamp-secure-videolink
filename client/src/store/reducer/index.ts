import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IData, IPopUp, IGlobalState } from "interfaces";

const globalState: IGlobalState = {
  popUpID: {} as IPopUp,
  loading: false,
  expiredLink: "",
  data: [],
  error: false
};

export const globalSlice = createSlice({
  name: "global",
  initialState: globalState,
  reducers: {
    popUpOpen: (state, action: PayloadAction<IPopUp>) => {
      state.popUpID = action.payload;
    },
    popUpClose: (state) => {
      state.popUpID = {} as IPopUp;
    },
    getDataStart: (state) => {
      state.loading = true
      state.error = false
    },
    getDataSuccess: (state, action: PayloadAction<IData[]>) => {
      state.data = action.payload;
      state.loading = false
      state.error = false
    },
    getDataError: (state) => {
      state.loading = false
      state.error = true
    },

    getDataByIdStart: (state, action: PayloadAction<string>) => {
      state.expiredLink = "";
      state.error = false
    },
    getDataByIdSuccess: (state, action: PayloadAction<string>) => {
      state.expiredLink = action.payload;
      state.error = false
    },
    getDataByIdError: (state) => {
      state.error = true
    },
  },
});

export const {
  popUpOpen,
  popUpClose,
  getDataStart,
  getDataSuccess,
  getDataError,
  getDataByIdStart,
  getDataByIdSuccess,
  getDataByIdError
} = globalSlice.actions;

export const dataReducer = globalSlice.reducer;
