/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow local public images and any external domains added later
    remotePatterns: [],
  },
  // Ensure server-only modules don't leak into the client bundle
  serverExternalPackages: ['bcryptjs', 'stripe'],
}

export default nextConfig
