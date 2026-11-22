import type { NextConfig } from "next";

// `npm run build:static` sets STATIC_EXPORT=1 to produce a plain HTML export.
const isStatic = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = isStatic ? { output: "export", images: { unoptimized: true } } : {};

export default nextConfig;
