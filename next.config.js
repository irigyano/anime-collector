/** @type {import('next').NextConfig} */
const nextConfig = {
  // logging: {
  //   fetches: {
  //     fullUrl: true,
  //   },
  // },
  images: {
    remotePatterns: [{ hostname: "**" }],
    unoptimized: true,
  },
};

module.exports = nextConfig;
