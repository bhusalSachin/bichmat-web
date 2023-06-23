/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // LOGIN_ADMIN_URL: "http://localhost:8000/admin/login",
    LOGIN_ADMIN_URL: "https://bichmat-server.vercel.app/admin/login",
    // ADMIN_ENTER_URL: "http://localhost:8000/admin/enter",
    ADMIN_ENTER_URL: "https://bichmat-server.vercel.app/admin/enter",
    CREATE_SUBJECT_URL:
      "https://bichmat-server.vercel.app/admin/subject/create",
    // CREATE_SUBJECT_URL: "http://localhost:8000/admin/subject/create",
    // GET_SUBJECTS_URL: "http://localhost:8000/admin/subject/getall",
    GET_SUBJECTS_URL: "https://bichmat-server.vercel.app/admin/subject/getall",
    // GET_SUBNAME_URL: "http://localhost:8000/admin/subject/getallsubname",
    GET_SUBNAME_URL:
      "https://bichmat-server.vercel.app/admin/subject/getallsubname",
    // GET_ONE_SUB_URL: "http://localhost:8000/admin/subject/getone",
    GET_ONE_SUB_URL: "https://bichmat-server.vercel.app/admin/subject/getone",
    // EDIT_SUBJECT_URL: "http://localhost:8000/admin/subject/update",
    EDIT_SUBJECT_URL: "https://bichmat-server.vercel.app/admin/subject/update",
    // DELETE_SUBJECT_URL: "http://localhost:8000/admin/subject/delete",
    DELETE_SUBJECT_URL:
      "https://bichmat-server.vercel.app/admin/subject/delete",
    // ADD_CHAPTER_URL: "http://localhost:8000/admin/subject/chapter/create",
    ADD_CHAPTER_URL:
      "https://bichmat-server.vercel.app/admin/subject/chapter/create",
    // EDIT_CHAPTER_URL: "http://localhost:8000/admin/subject/chapter/update",
    EDIT_CHAPTER_URL:
      "https://bichmat-server.vercel.app/admin/subject/chapter/update",
    // DELETE_CHAPTER_URL: "http://localhost:8000/admin/subject/chapter/delete",
    DELETE_CHAPTER_URL:
      "https://bichmat-server.vercel.app/admin/subject/chapter/delete",
    // GET_TOPICS_URL: "http://localhost:8000/admin/subject/chapter/topic/getall",
    GET_TOPICS_URL:
      "https://bichmat-server.vercel.app/admin/subject/chapter/topic/getall",
    // ADD_TOPIC_URL: "http://localhost:8000/admin/subject/chapter/topic/create",
    ADD_TOPIC_URL:
      "https://bichmat-server.vercel.app/admin/subject/chapter/topic/create",
    // DELETE_TOPIC_URL:
    // "http://localhost:8000/admin/subject/chapter/topic/delete",
    DELETE_TOPIC_URL:
      "https://bichmat-server.vercel.app/admin/subject/chapter/topic/delete",
    // EDIT_TOPIC_URL: "http://localhost:8000/admin/subject/chapter/topic/update",
    EDIT_TOPIC_URL:
      "https://bichmat-server.vercel.app/admin/subject/chapter/topic/update",
    // ADD_QUE_URL:
    // "http://localhost:8000/admin/subject/chapter/topic/question/create",
    ADD_QUE_URL:
      "https://bichmat-server.vercel.app/admin/subject/chapter/topic/question/create",
    // GET_QUE_URL:
    // "http://localhost:8000/admin/subject/chapter/topic/question/getall",
    GET_QUE_URL:
      "https://bichmat-server.vercel.app/admin/subject/chapter/topic/question/getall",
    // EDIT_QUE_URL:
    // "http://localhost:8000/admin/subject/chapter/topic/question/update",
    EDIT_QUE_URL:
      "https://bichmat-server.vercel.app/admin/subject/chapter/topic/question/update",
    // ADD_OPT_URL:
    // "http://localhost:8000/admin/subject/chapter/topic/question/option/create",
    ADD_OPT_URL:
      "https://bichmat-server.vercel.app/admin/subject/chapter/topic/question/option/create",
    // DEL_QUE_URL:
    // "http://localhost:8000/admin/subject/chapter/topic/question/delete",
    DEL_QUE_URL:
      "https://bichmat-server.vercel.app/admin/subject/chapter/topic/question/delete",
    // DEL_OPT_URL:
    // "http://localhost:8000/admin/subject/chapter/topic/question/option/delete",
    DEL_OPT_URL:
      "https://bichmat-server.vercel.app/admin/subject/chapter/topic/question/option/delete",
    // EDIT_OPT_URL:
    // "http://localhost:8000/admin/subject/chapter/topic/question/option/update",
    EDIT_OPT_URL:
      "https://bichmat-server.vercel.app/admin/subject/chapter/topic/question/option/update",
    // GET_SOL_URL:
    // "http://localhost:8000/admin/subject/chapter/topic/question/solution/get",
    GET_SOL_URL:
      "https://bichmat-server.vercel.app/admin/subject/chapter/topic/question/solution/get",
    // ADD_SOL_URL:
    // "http://localhost:8000/admin/subject/chapter/topic/question/solution/create",
    ADD_SOL_URL:
      "https://bichmat-server.vercel.app/admin/subject/chapter/topic/question/solution/create",
    // EDIT_SOL_URL:
    // "http://localhost:8000/admin/subject/chapter/topic/question/solution/update",
    EDIT_SOL_URL:
      "https://bichmat-server.vercel.app/admin/subject/chapter/topic/question/solution/update",
    // DEL_SOL_URL:
    // "http://localhost:8000/admin/subject/chapter/topic/question/solution/delete",
    DEL_SOL_URL:
      "https://bichmat-server.vercel.app/admin/subject/chapter/topic/question/solution/delete",
    CREATE_MCQ_URL: "http://localhost:8000/admin/mcq/create",
    CREATE_MCQ_URL: "https://bichmat-server.vercel.app/admin/mcq/create",
    // GET_MCQ_TITLE_URL: "http://localhost:8000/admin/mcq/getallnames",
    GET_MCQ_TITLE_URL:
      "https://bichmat-server.vercel.app/admin/mcq/getallnames",
    // DELETE_MCQ_URL: "http://localhost:8000/admin/mcq/delete",
    DELETE_MCQ_URL: "https://bichmat-server.vercel.app/admin/mcq/delete",
    // EDIT_MCQ_URL: "http://localhost:8000/admin/mcq/update",
    EDIT_MCQ_URL: "https://bichmat-server.vercel.app/admin/mcq/update",
    // GET_ONE_MCQ_URL: "http://localhost:8000/admin/mcq/getone",
    GET_ONE_MCQ_URL: "https://bichmat-server.vercel.app/admin/mcq/getone",
    GET_CONTENT_URL:
      "https://bichmat-server.vercel.app/admin/subject/chapter/topic/content/get",
    // GET_CONTENT_URL:
    // "http://localhost:8000/admin/subject/chapter/topic/content/get",
    EDIT_CONTENT_URL:
      "https://bichmat-server.vercel.app/admin/subject/chapter/topic/content/update",
    // EDIT_CONTENT_URL:
    // "http://localhost:8000/admin/subject/chapter/topic/content/update",
    ADD_CONTENT_URL:
      "https://bichmat-server.vercel.app/admin/subject/chapter/topic/content/create",
    // ADD_CONTENT_URL:
    // "http://localhost:8000/admin/subject/chapter/topic/content/create",
  },
};

module.exports = nextConfig;
