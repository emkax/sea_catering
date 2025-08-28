// next.config.js or next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, // ✅ makes build behave like dev for TS
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ also ignore ESLint errors during build
  },
};

export default nextConfig;
