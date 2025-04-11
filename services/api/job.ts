import { api, getAccessToken } from './index';

// Definido en el swagger como JobsApiResponse
interface Job {
  id: string;                  // ID of the job
  thumbnail_url: string;       // Thumbnail URL of the job
  is_multi_input: boolean;     // Whether the job has multiple input files
  input_file_id: string;       // ID of the input file
  input_file_name: string;     // Name of the input file
  progress: number;            // Progress of the job
  credits: number;             // Credits used for the job
  tools_used: string[];       // Tools used in the job
  status: string;             // Status of the job
  is_multi_output: boolean;    // Whether the job has multiple output files
  output_file_id: string;      // ID of the output files
  created_at: number;          // Created at
  finished_at: number;         // Finished at
}

// La respuesta del endpoint /jobs devuelve un array de Job
interface JobsResponse {
  items: Job[];
  total: number;
}

export const jobApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query<Job[], { 
      offset?: number; 
      limit?: number;
      from_ts?: number;
      to_ts?: number;
      status?: string;
    }>({
      query: ({ offset = 0, limit = 10, from_ts, to_ts, status }) => {
        const token = getAccessToken();
        const params = new URLSearchParams();
        
        params.append('offset', offset.toString());
        params.append('limit', limit.toString());
        
        if (from_ts) params.append('from_ts', from_ts.toString());
        if (to_ts) params.append('to_ts', to_ts.toString());
        if (status) params.append('status', status);

        return {
          url: `/jobs?${params.toString()}`,
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
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
