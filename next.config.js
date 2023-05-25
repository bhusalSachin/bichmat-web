/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    LOGIN_ADMIN_URL: "http://localhost:8000/admin/login",
    ADMIN_ENTER_URL: "http://localhost:8000/admin/enter",
  },
};

module.exports = nextConfig;
