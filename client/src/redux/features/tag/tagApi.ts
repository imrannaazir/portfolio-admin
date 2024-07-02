import { TTag } from "@/types/project.type";
import baseApi from "../api/baseApi";
import { TResponseRedux } from "@/types";

const tagApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTag: builder.query({
      query: () => ({
        url: "/tags",
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<TTag[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
      providesTags: ["Tags"],
    }),

    // create new brand
    createTag: builder.mutation({
      query: (data) => ({
        url: "/tags",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Tags"],
    }),
  }),
});

export const { useCreateTagMutation, useGetAllTagQuery } = tagApi;
