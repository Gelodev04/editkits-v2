/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "editkits-p-dev.s3.ap-south-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: 'editkits-thumbnails-dev.s3.ap-south-1.amazonaws.com',
      },
      {
        protocol: "https",
        hostname: 'editkits-temp-files-dev.s3.ap-south-1.amazonaws.com',
      }
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true
      }
    ]
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com;",
          },

          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload", // 1-year max age
          },
        ],
      },
    ];
  },
  swcMinify: true,
  productionBrowserSourceMaps: true
};

export default nextConfig;