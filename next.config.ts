import type { NextConfig } from "next";

// This is a user site (dheerajreddybhumanapalli.github.io), served from the
// domain root, so no basePath is needed. (basePath is only for project sites
// like <user>.github.io/<repo>.)
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: "",
  },
};

export default nextConfig;
