/** @type {import('next').NextConfig} */
const nextConfig = {
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
  output: 'export'
};

export default nextConfig;
