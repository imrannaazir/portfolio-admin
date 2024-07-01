import { TBrand, TResponseRedux } from "@/types";
import baseApi from "../api/baseApi";

const brandApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBrands: builder.query({
      query: (params) => ({
        url: "/brands",
        method: "GET",
        params: params,
      }),
      transformResponse: (response: TResponseRedux<TBrand[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
      providesTags: ["Brands"],
    }),

    // create new brand
    createBrand: builder.mutation({
      query: (data) => ({
        url: "/brands",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Brands"],
    }),

    // delete single brand
    deleteSingleBrand: builder.mutation({
      query: (id: string) => ({
        url: `/brands/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Brands"],
    }),

    //delete many brands
    deleteManyBrands: builder.mutation({
      query: (data: { ids: string[] }) => ({
        url: "/brands",
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["Brands"],
    }),
  }),
});

export const {
  useGetAllBrandsQuery,
  useCreateBrandMutation,
  useDeleteManyBrandsMutation,
  useDeleteSingleBrandMutation,
} = brandApi;
