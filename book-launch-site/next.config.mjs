/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
  reactStrictMode: true,
  // Nodemailer relies on Node built-ins; keep it out of the server bundle.
  serverExternalPackages: ["nodemailer"],
};

export default nextConfig;
