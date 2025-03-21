import { api } from './index';
import { getAccessToken } from './index';

export const fileApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getRecentFiles: builder.query({
      queryFn: async (_, _api, _extraOptions, baseQuery) => {
        let token = getAccessToken();

        while (!token) {
          await new Promise((resolve) => setTimeout(resolve));
          token = getAccessToken();
        }

        return baseQuery({
          url: '/files/recent?offset=0&limit=12',
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        });
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
  }),
});

export const { useUploadMutation, useStatusQuery, useGetRecentFilesQuery } = fileApi;
