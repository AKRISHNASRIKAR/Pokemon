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
    // 65 is the quality every image on the site actually requests — the
    // thumbnail-sized artwork and logo don't need 75's extra bytes.
    qualities: [65, 75],
  },
  // Ship debuggable stack traces for the large first-party chunks Lighthouse flagged.
  productionBrowserSourceMaps: true,
  experimental: {
    // Tailwind's per-page CSS is small, so inlining it in <head> removes the
    // render-blocking stylesheet request entirely for first-time visitors.
    inlineCss: true,
    // Only the icons/motion features actually imported get bundled, instead
    // of Next's default per-module chunking pulling in more of the package.
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
