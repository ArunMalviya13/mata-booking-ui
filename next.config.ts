import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fixed hydration mismatch from Grammarly extension attributes (data-gr-*).
  // Primary fix: suppressHydrationWarning prop on <body> in layout.tsx
  // Next.js config option doesn't exist; error resolved.
};

export default nextConfig;
