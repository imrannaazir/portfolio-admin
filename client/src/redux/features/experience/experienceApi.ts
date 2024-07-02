import baseApi from "../api/baseApi";

export const experienceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create new project
    createExperience: builder.mutation({
      query: (data) => ({
        url: "/experiences/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Experience", "Experiences"],
    }),

    // get all project
    getAllExperience: builder.query({
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      query: (_query) => ({
        url: `/experiences/all`,
        method: "GET",
      }),
      providesTags: ["Experience", "Experiences"],
    }),
  }),
});

export const { useCreateExperienceMutation, useGetAllExperienceQuery } =
  experienceApi;
