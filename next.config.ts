import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/PokeAPI/sprites/**",
      },
    ],
  },
  // Ship debuggable stack traces for the large first-party chunks Lighthouse flagged.
  productionBrowserSourceMaps: true,
  experimental: {
    // Tailwind's per-page CSS is small, so inlining it in <head> removes the
    // render-blocking stylesheet request entirely for first-time visitors.
    inlineCss: true,
  },
};

export default nextConfig;
