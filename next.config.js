/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    qualities: [75, 95],
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
