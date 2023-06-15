import ChapterList from "@/components/ChapterList";
import { MCQProvider, useMCQ } from "@/context/MCQProvider";
import axios from "axios";
import { useRouter } from "next/router";
import { AiOutlineLogout } from "react-icons/ai";

const SelectFromSubject = (props) => {
  const router = useRouter();
  const { subData, message } = props;
  const { selectedQuestions } = useMCQ();
  // console.log(selectedQuestions);

  if (!subData) {
    return <div>{message}</div>;
  }

  // console.log(subData.chapters);

  return (
    <div className="relative">
      <h2 className="text-2xl text-rose-950 text-center p-2 underline underline-offset-8">
        {subData.name}
      </h2>
      {/* go back button */}
      <div
        className="absolute left-5 top-5 transform rotate-180 hover:scale-105 hover:cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          router.back();
        }}
      >
        <AiOutlineLogout size={32} color="green" />
      </div>

      <div className="flex flex-col space-y-4 items-center justify-center my-4">
        <ChapterList
          chapters={subData.chapters}
          subname={subData.name}
          subId={subData._id}
        />
      </div>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const { subId, subject } = context.query;

  if (!subId || typeof subId === "undefined") {
    return {
      redirect: {
        destination: "/sorry",
        permanent: false,
      },
    };
  }

  try {
    const subRes = await axios.post(process.env.GET_ONE_SUB_URL, { subId });

    // console.log("subRes = ", subRes.data);

    if (subRes.data.success) {
      return {
        props: {
          message: "Subject fetched successfully!",
          subData: subRes.data.message,
        },
      };
    } else {
      return {
        props: {
          message: "Subject fetched failed! Please Reload.",
        },
      };
    }
  } catch (error) {
    return {
      props: {
        message: error?.message || "Error while fetching the subject contents!",
      },
    };
  }
};

export default SelectFromSubject;
