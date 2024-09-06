/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Add any additional configurations here
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/api/:path*',
      },
    ];
  },
};


export default nextConfig;
