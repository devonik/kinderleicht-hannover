import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Kurs-Titelbilder werden über die Sanity Asset-CDN ausgeliefert.
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
};

export default nextConfig;
