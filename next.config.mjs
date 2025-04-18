/** @type {import('next').NextConfig} */
import CompressionPlugin from 'compression-webpack-plugin';

const nextConfig = {
  webpack(config) {
    config.plugins.push(new CompressionPlugin());
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
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