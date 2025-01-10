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
  }
};

export default nextConfig;
