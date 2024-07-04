import baseApi from "../api/baseApi";

export const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create new project
    createBlog: builder.mutation({
      query: (data) => ({
        url: "/blogs/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Blog", "Blogs"],
    }),

    // get all project
    getAllBlog: builder.query({
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      query: (_query) => ({
        url: `/blogs/all`,
        method: "GET",
      }),
      providesTags: ["Blog", "Blogs"],
    }),
  }),
});

export const { useCreateBlogMutation, useGetAllBlogQuery } = blogApi;
