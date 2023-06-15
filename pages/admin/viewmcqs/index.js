import axios from "axios";
import NeonButton from "@/components/Button";
import { useRouter } from "next/router";
import Sidebar from "@/components/Sidebar";

const ViewMCQs = (props) => {
  const { mcqs, message } = props;
  const router = useRouter();

  //   console.log(mcqs);

  const onViewMcqHanler = (e, mcqId) => {
    e.preventDefault();

    router.push(`/admin/viewmcqs/mcq?mcqId=${mcqId}`);
  };

  if (!mcqs) {
    return <div>{message}</div>;
  }
  return (
    <div className="relative flex min-h-screen bg-slate-200">
      <Sidebar section={"view mcqs"} />
      <div className="flex-1 relative">
        <h2 className="w-full text-center text-2xl text-slate-800 underline underline-offset-8 p-4">
          All MCQ Sets
        </h2>
        <div className="flex flex-wrap mx-4 my-8 p-2 hover:cursor-pointer">
          {mcqs.map((mcq, index) => {
            return (
              <div
                key={mcq.title + index}
                className="w-1/3 h-[25em] m-4 relative shadow-md bg-white rounded-lg shadow-white flex flex-col border items-center justify-center"
              >
                <span className="text-xl text-slate-700 font-bold">
                  {mcq.title}
                </span>
                {mcq.imgurl !== null && (
                  <img
                    src={mcq.imgurl}
                    alt="Sorry"
                    className="w-full h-full object-fill z-0 p-2"
                  />
                )}
                <div
                  className="m-4"
                  onClick={(e) => onViewMcqHanler(e, mcq._id)}
                >
                  <NeonButton noColor={true} textColor="gray" isSmall={true}>
                    View or Edit MCQ Set
                  </NeonButton>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  try {
    const mcqRes = await axios.post(process.env.GET_MCQ_TITLE_URL, {});

    if (mcqRes.data.success) {
      return {
        props: {
          message: "MCQs fetched successfully!" || null,
          mcqs: mcqRes.data.message || null,
        },
      };
    } else {
      return { props: { message: mcqRes.data.message || null } };
    }
  } catch (error) {
    return {
      props: { message: error?.message || "MCQs fetched failed!" || null },
    };
  }
};

export default ViewMCQs;
