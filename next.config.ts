import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "abhi-lms-demo.t3.storage.dev",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
