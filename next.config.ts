import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  poweredByHeader: false,
  output: "export",
  // Static export cannot run the default optimizer, so variants are built ahead of time
  // by scripts/generate-images.mjs and selected by image-loader.ts. These two lists must
  // stay in sync with LADDER in that script.
  images: { loader: "custom", loaderFile: "./image-loader.ts", deviceSizes: [640, 828, 1080, 1440, 1920], imageSizes: [96, 128, 256, 384] },
};
export default nextConfig;
