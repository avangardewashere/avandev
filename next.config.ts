import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Pin workspace root to this project so Turbopack ignores the unrelated
    // package-lock.json found in C:\Users\USER above this directory.
    root: process.cwd(),
  },
};

export default nextConfig;
