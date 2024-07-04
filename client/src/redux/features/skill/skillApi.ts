import baseApi from "../api/baseApi";

export const skillApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create new skill
    createSkill: builder.mutation({
      query: (data) => ({
        url: "/skills/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Skill", "Skills"],
    }),

    // get all skill
    getAllSkill: builder.query({
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      query: (_query) => ({
        url: `/skills/get-all`,
        method: "GET",
      }),
      providesTags: ["Skill", "Skills"],
    }),
  }),
});

export const { useGetAllSkillQuery, useCreateSkillMutation } = skillApi;
