import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";

export type TFilter = {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
};

export type TMeta = {
  page: number | string;
  limit: number | string;
  total: number;
  totalPage: number;
};

type TInitialState = {
  orderBy: string;
  sortBy: string;
  status: TFilter[];
  brands: TFilter[];
  categories: TFilter[];
  tags: TFilter[];
  searchTerm: string;
  page: number;
  limit: number;
  meta: TMeta | null;
  date: string | null;
};

const initialState: TInitialState = {
  orderBy: "",
  sortBy: "",
  status: [],
  brands: [],
  categories: [],
  tags: [],
  searchTerm: "",
  limit: 10,
  page: 1,
  meta: null,
  date: null,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    //set order by
    setOrderBy: (state, action) => {
      state.orderBy = action.payload;
    },
    //set sort by
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setMeta: (state, action) => {
      state.meta = action.payload;
    },
    setDataLimit: (state, action) => {
      state.limit = action.payload;
    },
    goToNextPage: (state) => {
      state.page = state.page + 1;
    },
    goToPrevPage: (state) => {
      state.page = state.page - 1;
    },
    goToNPage: (state, action) => {
      state.page = action.payload;
    },

    // update search term
    updateSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },

    // add status
    addStatus: (state, action) => {
      state.status.push(action.payload);
    },

    // remove status
    removeStatus: (state, action) => {
      const filteredStatus = state.status.filter(
        (status) => status.value !== action.payload.value
      );
      state.status = filteredStatus;
    },

    // clear status
    clearStatus: (state) => {
      state.status = [];
    },

    // add brands
    addBrand: (state, action) => {
      state.brands.push(action.payload);
    },

    // remove brands
    removeBrand: (state, action) => {
      const filteredBrands = state.brands.filter(
        (brand) => brand.value !== action.payload.value
      );
      state.brands = filteredBrands;
    },

    // clear brands
    clearBrand: (state) => {
      state.brands = [];
    },
    // add category
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },

    // remove category
    removeCategory: (state, action) => {
      const filteredCategory = state.categories.filter(
        (category) => category.value !== action.payload.value
      );
      state.categories = filteredCategory;
    },

    // clear category
    clearCategories: (state) => {
      state.categories = [];
    },

    // add tag
    addTag: (state, action) => {
      state.tags.push(action.payload);
    },

    // remove tags
    removeTag: (state, action) => {
      const filteredTags = state.tags.filter(
        (tag) => tag.value !== action.payload.value
      );
      state.tags = filteredTags;
    },

    // clear tags
    clearTags: (state) => {
      state.tags = [];
    },

    //set filter by date
    setFilterByDate: (state, action) => {
      state.date = action.payload;
    },

    //reset filters
    resetFilters: (state) => {
      state.orderBy = "";
      state.sortBy = "";
      state.status = [];
      state.brands = [];
      state.categories = [];
      state.tags = [];
      state.searchTerm = "";
      state.limit = 10;
      state.page = 1;
      state.meta = null;
      state.date = null;
    },
  },
});

export default filterSlice.reducer;
export const {
  //sort
  setOrderBy,
  setSortBy,

  updateSearchTerm,
  // status
  addStatus,
  removeStatus,
  clearStatus,
  // brand
  addBrand,
  removeBrand,
  clearBrand,
  // category
  addCategory,
  removeCategory,
  clearCategories,

  //tags
  addTag,
  clearTags,
  removeTag,

  // pagination
  goToNextPage,
  goToPrevPage,
  goToNPage,
  setDataLimit,
  setMeta,
  setFilterByDate,
  resetFilters,
} = filterSlice.actions;

// selector
export const selectFilteredStatus = (state: RootState) => state.filter.status;
export const selectSearchTerm = (state: RootState) => state.filter.searchTerm;
export const selectFilteredBrands = (state: RootState) => state.filter.brands;
export const selectCategory = (state: RootState) => state.filter.categories;

export const selectTags = (state: RootState) => state.filter.tags;
export const selectPage = (state: RootState) => state.filter.page;
export const selectLimit = (state: RootState) => state.filter.limit;
export const selectMeta = (state: RootState) => state.filter.meta;
export const selectFilterByDate = (state: RootState) => state.filter.date;
export const selectSortBy = (state: RootState) => state.filter.sortBy;
export const selectOrderBy = (state: RootState) => state.filter.orderBy;
