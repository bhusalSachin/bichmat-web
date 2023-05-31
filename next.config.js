/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    LOGIN_ADMIN_URL: "https://bichmat-server.vercel.app/admin/login",
    ADMIN_ENTER_URL: "https://bichmat-server.vercel.app/admin/enter",
  },
};

module.exports = nextConfig;
