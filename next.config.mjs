/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true
      }
    ]
  },
  experimental: {
    appDir: false
  },
  images: {
    unoptimized: true
  },
  distDir: 'build'
};

export default nextConfig;
