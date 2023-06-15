import axios from "axios";
import { AiFillCheckCircle } from "react-icons/ai";
import { useMCQ } from "@/context/MCQProvider";
import NeonButton from "@/components/Button";
import { useRouter } from "next/router";

const Select = (props) => {
  const router = useRouter();
  const { queData, message, mcqId } = props;
  // const [selectedQuestions, setSelectedQuestions] = useState([]);
  const { selectedQuestions, setSelectedQuestions } = useMCQ();

  // console.log(queData);

  if (!queData) {
    return <div>{message}</div>;
  }

  // console.log(queData.chapters);

  const handleQuestionSelect = (e, question) => {
    e.preventDefault();
    e.stopPropagation();
    const index = selectedQuestions.findIndex((q) => q._id === question._id);

    if (index === -1) {
      // Question not selected, add it to the selected questions list
      setSelectedQuestions([...selectedQuestions, question]);
    } else {
      // Question already selected, remove it from the selected questions list
      const updatedQuestions = [...selectedQuestions];
      updatedQuestions.splice(index, 1);
      setSelectedQuestions(updatedQuestions);
    }
  };

  return (
    <div className="">
      <h2 className="text-2xl text-rose-950 text-center p-2 underline underline-offset-8">
        Select Questions
      </h2>

      <div
        className="m-4"
        onClick={(e) => {
          e.preventDefault();

          router.push(`/admin/viewmcqs/mcq?mcqId=${mcqId}&edited=${true}`);
        }}
      >
        <NeonButton noColor={true} isSmall={true} textColor="gray">
          View MCQ Set
        </NeonButton>
      </div>
      <div
        className="m-4"
        onClick={(e) => {
          e.preventDefault();

          router.back();
        }}
      >
        <NeonButton noColor={true} isSmall={true} textColor="gray">
          Choose from different topic
        </NeonButton>
      </div>

      {/* Questions list */}
      <ul className="m-8 text-lg p-4">
        {queData.map((question, index) => (
          <li
            key={question.question + index}
            className={`bg-slate-100 shadow-md my-8 p-2 flex flex-col space-y-2 hover:cursor-pointer ${
              selectedQuestions.some((q) => q._id === question._id) &&
              "bg-rose-200"
            }`}
            onClick={(e) => handleQuestionSelect(e, question)}
          >
            {selectedQuestions?.some((q) => q._id === question._id) && (
              <AiFillCheckCircle color="green" size={32} />
            )}
            <div className="flex justify-between items-center bg-white p-2 rounded-md">
              <div className="flex items-center spcae-x-8 flex-1">
                <span>{index + 1}. </span>
                {/* <div className="mx-4">{question.question}</div> */}
                <div
                  className="mx-4"
                  dangerouslySetInnerHTML={{ __html: question.question }}
                ></div>
              </div>

              <span className="mx-4 border text-white bg-slate-800 p-2 rounded-md">
                {question.weightage}
              </span>
            </div>
            {question.imgurl !== null && (
              <img
                src={question.imgurl}
                alt=""
                className="w-[150px] h-[150px] object-contain border"
              />
            )}

            <div className="flex flex-wrap justify-around">
              {question.options.map((option, index) => {
                return (
                  <div
                    key={option.option + index}
                    className="flex flex-col space-y-2 w-[46%] bg-white text-slate-900 m-4 rounded-md p-2"
                  >
                    <div
                      className={`flex space-x-4 ${
                        option.isCorrect && "text-green-900 font-bold"
                      } `}
                    >
                      <span>
                        {String.fromCharCode("a".charCodeAt(0) + index)}.
                      </span>
                      <div
                        className="mx-4 flex-1"
                        dangerouslySetInnerHTML={{ __html: option.option }}
                      ></div>
                    </div>
                    {option.imgurl !== null && (
                      <img
                        src={option.imgurl}
                        alt=""
                        className="w-[150px] h-[150px] object-contain mx-4"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const { subId, chapId, topicId, mcqId } = context.query;

  // console.log("props quesitons = ", subId, chapId, topicId);

  if (
    !subId ||
    typeof subId === "undefined" ||
    !chapId ||
    typeof chapId === "undefined" ||
    !topicId ||
    typeof topicId === "undefined" ||
    !mcqId ||
    typeof mcqId === "undefined"
  ) {
    return {
      redirect: {
        destination: "/sorry",
        permanent: false,
      },
    };
  }

  try {
    const topQueRes = await axios.post(process.env.GET_QUE_URL, {
      subId,
      chapId,
      topicId,
    });

    // console.log("topQueRes = ", topQueRes.data);

    if (topQueRes.data.success) {
      return {
        props: {
          message: "Question fetched successfully!",
          queData: topQueRes.data.message[0].questions,
          mcqId,
        },
      };
    } else {
      return {
        props: {
          message: "Questions fetched failed! Please Reload.",
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

export default Select;
