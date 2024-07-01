import { TResponseRedux } from "@/types";
import baseApi from "../api/baseApi";
import { TCollection } from "@/types";

const collectionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCollection: builder.mutation({
      query: (data) => ({
        url: "/collections",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Collections"],
    }),
    // get all collections
    getAllCollections: builder.query({
      query: (params) => ({
        url: `/collections`,
        method: "GET",
        params: params,
      }),
      providesTags: ["Collections"],
      transformResponse: (response: TResponseRedux<TCollection[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),

    // delete single collections
    deleteSingleCollection: builder.mutation({
      query: (id: string) => ({
        url: `/collections/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Collections", "Collection"],
    }),

    // delete many collections
    deleteManyCollections: builder.mutation({
      query: (data: { ids: string[] }) => ({
        url: `/collections`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["Collection", "Collections"],
    }),
  }),
});

export const {
  useCreateCollectionMutation,
  useGetAllCollectionsQuery,
  useDeleteManyCollectionsMutation,
  useDeleteSingleCollectionMutation,
} = collectionApi;
