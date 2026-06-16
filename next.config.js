/** @type {import('next').NextConfig} */

const path = require("path");

const nextConfig = {
  outputFileTracingRoot: path.join(__dirname),
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

module.exports = nextConfig;
