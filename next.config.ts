import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/tongue-twistics",
  images: { unoptimized: true },
};

export default nextConfig;
