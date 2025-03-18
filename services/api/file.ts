import { api } from './index';
import { getAccessToken } from './index';

export const fileApi = api.injectEndpoints({
  endpoints: (builder) => ({
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

export const { useUploadMutation, useStatusQuery } = fileApi;
