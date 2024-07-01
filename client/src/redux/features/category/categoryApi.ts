import { TResponseRedux } from "@/types";
import baseApi from "../api/baseApi";
import { TCategory } from "@/types/contents.type";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //get all category
    getAllCategories: builder.query({
      query: (params) => ({
        url: "/categories",
        method: "GET",
        params: params,
      }),
      transformResponse: (response: TResponseRedux<TCategory[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
      providesTags: ["Categories"],
    }),

    // create new category
    createCategory: builder.mutation({
      query: (data) => ({
        url: "/categories",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Categories"],
    }),

    // delete single category
    deleteSingleCategory: builder.mutation({
      query: (id: string) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),

    //delete many category
    deleteManyCategories: builder.mutation({
      query: (data: { ids: string[] }) => ({
        url: `/categories`,
        body: data,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetAllCategoriesQuery,
  useDeleteManyCategoriesMutation,
  useDeleteSingleCategoryMutation,
} = categoryApi;
