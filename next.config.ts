/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Configure TypeScript compiler options
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: false,
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  output: 'standalone', // Enable standalone output for Docker
};

module.exports = nextConfig;
