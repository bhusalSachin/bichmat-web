/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // LOGIN_ADMIN_URL: "http://localhost:8000/admin/login",
    LOGIN_ADMIN_URL: "https://bichmat-server.vercel.app/admin/login",
    // ADMIN_ENTER_URL: "http://localhost:8000/admin/enter",
    ADMIN_ENTER_URL: "https://bichmat-server.vercel.app/admin/enter",
    // CREATE_SUBJECT_URL:
    //   "https://bichmat-server.vercel.app/admin/subject/create",
    CREATE_SUBJECT_URL: "http://localhost:8000/admin/subject/create",
    GET_SUBJECTS_URL: "http://localhost:8000/admin/subject/getall",
  },
};

module.exports = nextConfig;
