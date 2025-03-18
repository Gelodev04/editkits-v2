import { api } from './index';
import { getAccessToken } from './index';

export const jobApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: () => {
        const access_token = getAccessToken();
        return {
          url: '/jobs?offset=0&limit=12',
          method: 'GET',
          headers: { Authorization: `Bearer ${access_token}` },
        };
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
