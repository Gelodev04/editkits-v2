import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { api, getAccessToken } from './index';

interface CreditBalanceResponse {
  available: number;
  in_use: number;
  used: number;
}

interface JobStatusCountResponse {
  in_progress: number;
  completed: number;
  failed: number;
}

export interface JobStats {
  credits: {
    available: number;
    inUse: number;
    used: number;
  };
  jobStatus: {
    inProgress: number;
    success: number;
    failed: number;
  };
}

export const statsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getStats: builder.query<JobStats, void>({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        try {
          const creditsResponse = await fetchWithBQ({
            url: '/credit/balance',
            method: 'GET',
            headers: { Authorization: `Bearer ${getAccessToken()}` },
          });

          const jobStatusResponse = await fetchWithBQ({
            url: '/jobs/status/count',
            method: 'GET',
            headers: { Authorization: `Bearer ${getAccessToken()}` },
          });

          if (creditsResponse.error) {
            return { error: creditsResponse.error as FetchBaseQueryError };
          }

          if (jobStatusResponse.error) {
            return { error: jobStatusResponse.error as FetchBaseQueryError };
          }

          const credits = creditsResponse.data as CreditBalanceResponse;
          const jobStatus = jobStatusResponse.data as JobStatusCountResponse;

          return {
            data: {
              credits: {
                available: credits.available || 0,
                inUse: credits.in_use || 0,
                used: credits.used || 0,
              },
              jobStatus: {
                inProgress: jobStatus.in_progress || 0,
                success: jobStatus.completed || 0,
                failed: jobStatus.failed || 0,
              }
            }
          };
        } catch (error) {
          return {
            error: {
              status: 500,
              data: error
            } as FetchBaseQueryError
          };
        }
      },
      providesTags: [{ type: 'Stats' as const, id: 'LIST' }],
    }),
  }),
});

export const { useGetStatsQuery } = statsApi; 