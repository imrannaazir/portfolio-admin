/* import { RootState } from "@/redux/store";
import { TProductDefaultValue } from "@/types/product.type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const defaultValues: TProductDefaultValue = {
  name: "",
  description: "",
  brand: "",
  tags: [],
  category: "",
  connectivity: "",
  dimensions: "",
  operatingSystem: "",
  powerSource: "",
  price: "",
  quantity: "",
  unit: "",
  weight: "",
  features: {},
  featureName: "",
};

type TInitialState = {
  defaultValues: TProductDefaultValue;
  selectedProduct: string[];
};

const initialState: TInitialState = { defaultValues, selectedProduct: [] };

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // set default values
    setDefaultValues: (state, action: PayloadAction<TProductDefaultValue>) => {
      state.defaultValues = action.payload;
    },
    //set default value empty
    setDefaultValuesEmpty: (state) => {
      state.defaultValues = defaultValues;
    },

    // set selected product
    storeSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
  },
});

export const productReducer = productSlice.reducer;
export const { setDefaultValues, setDefaultValuesEmpty, storeSelectedProduct } =
  productSlice.actions;

// selector
export const selectDefaultProductValues = (state: RootState) =>
  state.product.defaultValues;

export const selectSelectedProducts = (state: RootState) =>
  state.product.selectedProduct;
 */
