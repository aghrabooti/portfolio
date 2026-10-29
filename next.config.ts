import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dev preview in sandboxes / custom hosts: allow any origin for the
  // compiled assets endpoint. Harmless in production (Vercel).
  allowedDevOrigins: ["*"],
};

export default nextConfig;
