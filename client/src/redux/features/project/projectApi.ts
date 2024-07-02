import baseApi from "../api/baseApi";

export const projectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create new project
    createProject: builder.mutation({
      query: (data) => ({
        url: "/projects",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Projects", "Project"],
    }),

    // get all project
    getAllProjects: builder.query({
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      query: (_query) => ({
        url: `/projects`,
        method: "GET",
      }),
      providesTags: ["Projects"],
    }),

    // delete project by Id
    deleteProjectById: builder.mutation({
      query: (projectId) => ({
        url: `/projects/${projectId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Projects", "Project"],
    }),

    // get project by Id
    getProjectById: builder.query({
      query: (projectId) => ({
        url: `/projects/${projectId}`,
        method: "GET",
      }),
      providesTags: ["Project"],
    }),
  }),
});

export const {
  useCreateProjectMutation,
  useDeleteProjectByIdMutation,
  useGetAllProjectsQuery,
  useGetProjectByIdQuery,
} = projectApi;
