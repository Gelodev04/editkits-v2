import { api, getAccessToken } from './index';

interface RecentFile {
  id: string;
  name: string;
  thumbnail_url: string;
  size_in_mb: number;
  type: string;
  created_at: number;
  expires_at: number;
}

interface RecentFilesResponse {
  files: RecentFile[];
  total: number;
}

export const fileApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getRecentFiles: builder.query<RecentFile[], { offset?: number; limit?: number }>({
      query: ({ offset = 0, limit }) => {
        const token = getAccessToken();
        return {
          url: `/files/recent?offset=${offset}&limit=${limit}`,
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        };
      },
    }),
    upload: builder.mutation({
      query: ({ file_name, mime_type, ext, content_length }) => {
        const access_token = getAccessToken();
        return {
          url: '/file/upload',
          method: 'POST',
          body: { file_name, mime_type, ext, content_length },
          headers: { Authorization: `Bearer ${access_token}` },
        };
      },
    }),
    status: builder.query({
      query: ({ fileId }) => {
        const access_token = getAccessToken();
        return {
          url: `/file/status?file_id=${fileId}`,
          method: 'GET',
          headers: { Authorization: `Bearer ${access_token}` },
        };
      },
    }),
    previewVideo: builder.query({
      query: ({ fileId }) => {
        const access_token = getAccessToken();
        return {
          url: `/file/preview?file_id=${fileId}`,
          method: 'GET',
          headers: { Authorization: `Bearer ${access_token}`}
        }
      },
      transformResponse: response => response
    })
  }),
});

export const { useUploadMutation, useStatusQuery, useGetRecentFilesQuery, usePreviewVideoQuery } = fileApi;
