import { api } from './index';
import { getAccessToken } from './index';

export const jobApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query({
      queryFn: async (_, _api, _extraOptions, baseQuery) => {

        console.log("===== BASE QUERY =====", _)
        let token = getAccessToken();

        while (!token) {
          await new Promise((resolve) => setTimeout(resolve));
          token = getAccessToken();
        }

        return baseQuery({
          url: (_.from_ts && _.to_ts) ? `/jobs?offset=0&limit=12?from_ts=${_.from_ts}&to_ts=${_.to_ts}` : '/jobs?offset=0&limit=12',
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        });
      },
    }),
    initJob: builder.mutation({
      query: (body) => {
        const access_token = getAccessToken();
        return {
          url: '/job/init',
          method: 'POST',
          body,
          headers: { Authorization: `Bearer ${access_token}` },
        };
      },
    }),
    commitJob: builder.mutation({
      query: ({ job_id }) => {
        const access_token = getAccessToken();
        return {
          url: '/job/commit',
          method: 'POST',
          body: { job_id },
          headers: { Authorization: `Bearer ${access_token}` },
        };
      },
    }),
    jobStatus: builder.query({
      query: ({ job_id }) => {
        const access_token = getAccessToken();
        return {
          url: `/job/status?job_id=${job_id}`,
          method: 'GET',
          headers: { Authorization: `Bearer ${access_token}` },
        };
      },
    }),
  }),
});

export const { useGetJobsQuery, useInitJobMutation, useCommitJobMutation, useJobStatusQuery } = jobApi;
