/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['editkits-thumbnails-dev.s3.ap-south-1.amazonaws.com']
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true
      }
    ]
  }
};

export default nextConfig;