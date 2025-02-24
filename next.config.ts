import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  env: {
    BASE_URL: "http://localhost:3000/api/",
  },
};

export default nextConfig;
