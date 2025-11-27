import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "example.com",          // for your mock images
      "images.unsplash.com",  // for Unsplash hero images
      // add any other domains you use
    ],
  },
};

export default nextConfig;
