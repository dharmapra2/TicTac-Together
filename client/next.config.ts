import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: new URL(process.env.NEXT_PUBLIC_CONVEX_URL!).hostname,
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
