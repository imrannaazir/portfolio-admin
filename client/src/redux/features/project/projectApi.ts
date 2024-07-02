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
      query: (query) => ({
        url: `/projects?${query}`,
        method: "GET",
      }),
      providesTags: ["Projects"],
    }),

    // delete project by Id
    deleteProjectById: builder.mutation({
      query: (projectId) => ({
        url: `/products/${projectId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Projects", "Project"],
    }),

    // get project by Id
    getProjectById: builder.query({
      query: (projectId) => ({
        url: `/products/${projectId}`,
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
