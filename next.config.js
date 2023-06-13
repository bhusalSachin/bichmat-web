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
    EDIT_SUBJECT_URL: "http://localhost:8000/admin/subject/update",
    DELETE_SUBJECT_URL: "http://localhost:8000/admin/subject/delete",
    ADD_CHAPTER_URL: "http://localhost:8000/admin/subject/chapter/create",
    EDIT_CHAPTER_URL: "http://localhost:8000/admin/subject/chapter/update",
    DELETE_CHAPTER_URL: "http://localhost:8000/admin/subject/chapter/delete",
    GET_TOPICS_URL: "http://localhost:8000/admin/subject/chapter/topic/getall",
    ADD_TOPIC_URL: "http://localhost:8000/admin/subject/chapter/topic/create",
    DELETE_TOPIC_URL:
      "http://localhost:8000/admin/subject/chapter/topic/delete",
    EDIT_TOPIC_URL: "http://localhost:8000/admin/subject/chapter/topic/update",
    QUE_IMG_UPLOAD:
      "http://localhost:8000/admin/subject/chapter/topic/question/upload",
    ADD_QUE_URL:
      "http://localhost:8000/admin/subject/chapter/topic/question/create",
    GET_QUE_URL:
      "http://localhost:8000/admin/subject/chapter/topic/question/getall",
    EDIT_QUE_URL:
      "http://localhost:8000/admin/subject/chapter/topic/question/update",
    ADD_OPT_URL:
      "http://localhost:8000/admin/subject/chapter/topic/question/option/create",
    DEL_QUE_URL:
      "http://localhost:8000/admin/subject/chapter/topic/question/delete",
    DEL_OPT_URL:
      "http://localhost:8000/admin/subject/chapter/topic/question/option/delete",
    EDIT_OPT_URL:
      "http://localhost:8000/admin/subject/chapter/topic/question/option/update",
    GET_SOL_URL:
      "http://localhost:8000/admin/subject/chapter/topic/question/solution/get",
    ADD_SOL_URL:
      "http://localhost:8000/admin/subject/chapter/topic/question/solution/create",
    EDIT_SOL_URL:
      "http://localhost:8000/admin/subject/chapter/topic/question/solution/update",
    DEL_SOL_URL:
      "http://localhost:8000/admin/subject/chapter/topic/question/solution/delete",
  },
};

module.exports = nextConfig;
