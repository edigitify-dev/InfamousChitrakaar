import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // three.js ships ES modules that need transpiling for the R3F studio scene
  transpilePackages: ["three"],
};

export default nextConfig;
