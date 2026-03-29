/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@simulapi/db", "@simulapi/openapi", "@simulapi/mock-engine", "@simulapi/auth"],
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;