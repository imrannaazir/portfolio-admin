import { RootState } from "@/redux/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
export type TOnConfirm = () => void;
export type AlertModalProps = {
  isOpen: boolean;
  isLoading: boolean;
  onConfirm: TOnConfirm;
};

const initialState: AlertModalProps = {
  isOpen: false,
  isLoading: false,
  onConfirm: () => {},
};

const alertModalSlice = createSlice({
  name: "alertSlice",
  initialState,
  reducers: {
    // set is open
    setIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },

    // set is loading
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    // set on confirm
    setOnConfirm: (state, action: PayloadAction<TOnConfirm>) => {
      state.onConfirm = action.payload;
    },
  },
});

export const alertModalReducer = alertModalSlice.reducer;
export const { setIsLoading, setIsOpen, setOnConfirm } =
  alertModalSlice.actions;

export const selectIsOpen = (state: RootState) => state.alertModal.isOpen;
export const selectIsLoading = (state: RootState) => state.alertModal.isLoading;
export const selectOnConfirm = (state: RootState) => state.alertModal.onConfirm;
