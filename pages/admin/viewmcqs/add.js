import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ChapterList from "@/components/ChapterList";
import axios from "axios";
import { AiOutlineDownCircle, AiOutlineForward } from "react-icons/ai";

const AddMCQ = (props) => {
  const { subjects, message, mcqId } = props;
  const [subList, setSubList] = useState([]);
  const router = useRouter();
  const [openChapter, setOpenChapter] = useState({ state: false, index: 0 });
  const backgroundColors = [
    "bg-teal-800",
    "bg-blue-800",
    "bg-yellow-800",
    "bg-pink-800",
    "bg-green-800",
    "bg-rose-800",
    "bg-black",
  ];

  const [randomPick, setRandomPick] = useState([]);

  const onClickSubjectHandler = (e, idx) => {
    e.preventDefault();
    setOpenChapter((prev) => {
      // return { index: idx, state: !prev.state };
      if (prev.state === false) {
        return { index: idx, state: true };
      } else {
        if (prev.index === idx) {
          return { index: idx, state: false };
        } else {
          return { index: idx, state: true };
        }
      }
    });
  };
  if (!subjects || subjects.length === 0) {
    return <div>{message}</div>;
  }

  useEffect(() => {
    console.log(subjects);
    setSubList(subjects);
    const generateRandomNumbers = () => {
      return Array.from({ length: backgroundColors.length }, () =>
        Math.floor(Math.random() * backgroundColors.length)
      );
    };

    setRandomPick(generateRandomNumbers());
  }, []);

  return (
    <div className="bg-white p-4 w-3/4 m-auto rounded-lg shadow-md">
      <h2 className="text-2xl text-rose-950 text-center p-2 underline underline-offset-8">
        Add Questions From Subjects
      </h2>
      <div className="w-full flex items-center justify-center flex-col space-y-4 my-4">
        {subList?.map((subject, index) => {
          const backgroundColor = backgroundColors[randomPick[index]];
          return (
            <div
              key={subject.name + index}
              className="flex flex-col w-full items-center justify-center"
            >
              <div
                className={`w-3/4 p-2 shadow-md ${backgroundColor} text-white text-lg rounded-md hover:cursor-pointer flex justify-between`}
                onClick={(e) => onClickSubjectHandler(e, index)}
              >
                <span>{subject.name}</span>
                {!openChapter.state ||
                (openChapter.state && openChapter.index !== index) ? (
                  <AiOutlineDownCircle size={24} color="white" />
                ) : (
                  <AiOutlineForward size={24} color="white" />
                )}
              </div>
              {openChapter.state && openChapter.index === index && (
                <div className="flex flex-col space-y-4 items-center justify-center my-4 w-3/4">
                  <ChapterList
                    chapters={subject.chapters}
                    subname={subject.name}
                    subId={subject._id}
                    wide
                    mcqId={mcqId}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const { mcqId } = context.query;

  if (!mcqId || typeof mcqId === "undefined") {
    return {
      redirect: {
        destination: "/sorry",
        permanent: false,
      },
    };
  }
  try {
    const subRes = await axios.post(process.env.GET_SUBNAME_URL, {});

    if (subRes.data.success) {
      return {
        props: {
          subjects: subRes.data.message.subjects || null,
          message: "Subject Fetched Successfull!",
          mcqId,
        },
      };
    } else {
      return {
        props: {
          message: "Error while fetching subjects! Please Reload.",
        },
      };
    }
  } catch (error) {
    console.log(error?.message || "Error while fetching subjects");
    return {
      props: {
        message:
          error?.message || "Error while fetching subjects! Please Reload.",
      },
    };
  }
};

export default AddMCQ;
