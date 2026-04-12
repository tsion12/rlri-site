import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/photos/**",
      },
      {
        protocol: "https",
        hostname: "cms-programs.reallifeinstitute.or",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "cms-programs.reallifeinstitute.org",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "reallifeinstitute.org",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "secure.gravatar.com",
        pathname: "/avatar/**",
      },
    ],
  },
};

export default nextConfig;
