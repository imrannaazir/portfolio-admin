import { TResponseRedux } from "@/types/global.types";
import baseApi from "../api/baseApi";
import { TImage } from "@/types/contents.type";

const imageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get all images
    getAllImages: builder.query({
      query: (args) => ({
        url: `/images?${args}`,
        method: "GET",
      }),
      providesTags: [],
      transformResponse: (response: TResponseRedux<TImage>) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),

    // upload image
    uploadSingleImage: builder.mutation({
      query: (data) => {
        return {
          url: `/images/single`,
          method: "POST",
          body: data,
        };
      },

      invalidatesTags: [],
    }),

    // delete images
    deleteManyImages: builder.mutation({
      query: (data: { ids: string[] }) => ({
        url: "/images",
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: [],
    }),
  }),
});

export const {
  useGetAllImagesQuery,
  useUploadSingleImageMutation,
  useDeleteManyImagesMutation,
} = imageApi;
