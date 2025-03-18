import { api } from "@/services/api/index";

export const jobApi = api.injectEndpoints({
  endpoints: (builder) => ({
    contactUsCommon: builder.mutation({
      query: (body) => ({
        url: '/contact/common',
        method: 'POST',
        body,
        headers: {
          "Content-Type": "application/json",
          Referer: "https://www.editkits.com/",
          Origin: "https://www.editkits.com/",
          "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36"
        }
      }),
      transformResponse: (response) => response,
    }),
    getBlogs: builder.query({
      query: () => ({
        url: '/blogs?limit=12&offset=0',
        method: 'GET',
      }),
      transformResponse: (response) => response,
    }),
    getPlans: builder.query({
      query: ({isYearly}) => ({
        url: `/subscription/plans?is_yearly=${isYearly}`,
        method: 'GET'
      }),
      transformResponse: (response) => response
    })
  }),
});

export const { useContactUsCommonMutation, useGetBlogsQuery, useGetPlansQuery } = jobApi;