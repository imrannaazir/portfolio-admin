import { RootState } from "@/redux/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ReactNode } from "react";

type TInitialState = {
  title: string;
  description?: string;
  isOpen: boolean;
  children?: React.ReactNode;
  className?: string;
};
const initialState: TInitialState = {
  isOpen: false,
  title: "",
  description: "",
  children: null,
  className: "",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    onOpen: (
      state,
      action: PayloadAction<{
        title: string;
        description: string;
        children: ReactNode;
        className?: string;
      }>
    ) => {
      const { children, description, title, className } = action.payload;
      state.isOpen = true;
      state.title = title;
      state.description = description;
      state.children = children;
      state.className = className;
    },
    onClose: (state) => {
      state.isOpen = false;
      state.title = "";
      state.description = "";
      state.children = null;
      state.className = "";
    },
  },
});

export default modalSlice.reducer;
export const { onClose, onOpen } = modalSlice.actions;
export const selectModal = (state: RootState) => state.modal;
