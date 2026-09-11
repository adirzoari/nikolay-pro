// next/image loader for the static export. Turbopack aliases this file over
// next/dist/shared/lib/image-loader, so it is bundled into the client: keep it a pure
// function with no node builtins. Variants come from scripts/generate-images.mjs.
import manifest from './image-manifest';

export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }): string {
  const entry = manifest[src];
  // A miss means the path never reached the generator. Fall back to the original so the
  // page still renders; scripts/validate-site.cjs fails the build on any such URL.
  if (!entry) return src;
  const [stem, widths] = entry;
  // Smallest variant that covers the request, clamped to the largest we generated —
  // this is what keeps the loader from ever asking for an upscale.
  return `${stem}.${widths.find(candidate => candidate >= width) ?? widths[widths.length - 1]}.webp`;
}
