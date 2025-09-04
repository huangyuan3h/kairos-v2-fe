import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const target =
      process.env.API_PROXY_TARGET || "https://api.kairos-2.it-t.xyz";
    return [
      {
        source: "/api/proxy/:path*",
        destination: `${target}/:path*`,
      },
    ];
  },
};

export default nextConfig;
