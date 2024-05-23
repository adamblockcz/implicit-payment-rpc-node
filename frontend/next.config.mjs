/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@mui/x-charts'],
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
