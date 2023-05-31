/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // LOGIN_ADMIN_URL: "http://localhost:8000/admin/login",
    LOGIN_ADMIN_URL: "https://bichmat-server.vercel.app/admin/login",
    // ADMIN_ENTER_URL: "http://localhost:8000/admin/enter",
    ADMIN_ENTER_URL: "https://bichmat-server.vercel.app/admin/enter",
  },
};

module.exports = nextConfig;
