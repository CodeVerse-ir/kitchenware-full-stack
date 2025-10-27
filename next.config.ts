import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  env: {
    BASE_URL: process.env.API_URL,
    MONGODB_URI: process.env.MONGODB_URI,
  },
};

export default nextConfig;
