import axios from "axios";
import NeonButton from "@/components/Button";
import {
  AiFillPlusCircle,
  AiFillCheckCircle,
  AiOutlineLogout,
} from "react-icons/ai";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Solution from "@/components/Solution";
import Message from "@/components/Message";

const QuestionsHome = (props) => {
  const router = useRouter();
  const [showSolution, setShowSolution] = useState({
    id: null,
    isSolution: true,
    status: true,
    solution: "",
    imgurl: null,
  });
  const [showMessage, setShowMessage] = useState({
    isShow: false,
    status: false,
    message: "",
  });

  // console.log(props.questions[0].questions);

  const gotoQuestionAddPage = (e) => {
    e.preventDefault();

    router.push(
      `/admin/subject/chapter/question/add?subId=${props.subId}&chapId=${props.chapId}&topicId=${props.topicId}`
    );
  };

  const onDeleteQuestionHandler = async (e, queId) => {
    e.preventDefault();

    try {
      const delQuesRes = await axios.post(process.env.DEL_QUE_URL, {
        subId: props.subId,
        chapId: props.chapId,
        topicId: props.topicId,
        queId,
      });

      if (delQuesRes.data.success) {
        console.log(delQuesRes.data.message);
        window.location.reload();
      } else {
        console.log(delQuesRes.data.message);
        setShowMessage((prev) => {
          return {
            ...prev,
            status: false,
            message: delQuesRes.data.message,
            isShow: true,
          };
        });
      }
    } catch (error) {
      console.log(error.message || "Error while deleting question");
      setShowMessage((prev) => {
        return {
          ...prev,
          status: false,
          message: error?.message || "Error while deleting question",
          isShow: true,
        };
      });
    }
  };

  const onDeleteOptionHandler = async (e, queId, optId) => {
    e.preventDefault();

    try {
      const delOptRes = await axios.post(process.env.DEL_OPT_URL, {
        subId: props.subId,
        chapId: props.chapId,
        topicId: props.topicId,
        queId,
        optId,
      });

      if (delOptRes.data.success) {
        console.log(delOptRes.data.message);
        window.location.reload();
      } else {
        console.log(delOptRes.data.message);
        setShowMessage((prev) => {
          return {
            ...prev,
            status: false,
            message: delOptRes.data.message,
            isShow: true,
          };
        });
      }
    } catch (error) {
      console.log(error.message || "Error while deleting option");
      setShowMessage((prev) => {
        return {
          ...prev,
          status: false,
          message: error?.message || "Error while deleting option",
          isShow: true,
        };
      });
    }
  };

  const onAddOptionHandler = (e, queId) => {
    e.preventDefault();

    router.push(
      {
        pathname: `/admin/subject/chapter/question/addoption`,
        query: {
          subId: props.subId,
          chapId: props.chapId,
          topicId: props.topicId,
          queId,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  const onShowSolutionHandler = async (e, queId) => {
    e.preventDefault();

    if (showSolution.status && showSolution.id === queId) {
      setShowSolution((prev) => {
        return { ...prev, status: false };
      });
      return;
    }

    try {
      const getSolRes = await axios.post(process.env.GET_SOL_URL, { queId });

      if (getSolRes.data.success) {
        if (getSolRes.data.message.length === 0) {
          setShowMessage((prev) => {
            return {
              ...prev,
              status: false,
              message: "Solution doesn't exist for the question, please add!",
              isShow: true,
            };
          });
          setShowSolution((prev) => {
            return {
              ...prev,
              id: queId,
              isSolution: false,
              status: true,
            };
          });
          return;
        }
        setShowSolution((prev) => {
          return {
            ...prev,
            id: queId,
            isSolution: getSolRes.data.message.length !== 0,
            status: true,
            solution: getSolRes.data.message[0].solution,
            imgurl: getSolRes.data.message[0].imgurl,
          };
        });
      } else {
        setShowMessage((prev) => {
          return {
            ...prev,
            status: false,
            message: getSolRes.data.message,
            isShow: true,
          };
        });
      }
    } catch (error) {
      console.log(error?.message || "Error while fetching solution");
      setShowSolution((prev) => {
        return {
          ...prev,
          id: queId,
          status: false,
          solution: "",
          imgurl: null,
        };
      });
      setShowMessage((prev) => {
        return {
          ...prev,
          status: false,
          message: error?.message || "Error while fetching the solution",
          isShow: true,
        };
      });
    }
  };

  const onAddSolutionHandler = (e, queId) => {
    e.preventDefault();

    router.push(`/admin/subject/chapter/question/addsolution?queId=${queId}`);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage((prev) => {
        return { ...prev, isShow: false };
      });
    }, 4000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="relative">
      <div
        className="absolute left-5 top-5 transform rotate-180 hover:scale-105 hover:cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          router.back();
        }}
      >
        <AiOutlineLogout size={32} color="green" />
      </div>
      <h2 className="text-2xl text-pink-900 p-2 m-4 font-bold text-center underline underline-offset-8">
        {`${props.topic}'s Questions` || "All Questions"}
      </h2>
      <div
        className="flex justify-end p-2 mr-2"
        onClick={(e) => gotoQuestionAddPage(e)}
      >
        <NeonButton>
          <span className="flex">
            Add Question
            <AiFillPlusCircle size={24} color="white" className="ml-2" />
          </span>
        </NeonButton>
      </div>
      <ul className="m-4 text-lg">
        {props.isData &&
          props.questions[0].questions.map((question, index) => (
            <li
              key={question.question + index}
              className="bg-slate-100 shadow-md my-8 p-2 flex flex-col space-y-2"
            >
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
                        {option.isCorrect && (
                          <AiFillCheckCircle color="green" size={32} />
                        )}
                      </div>
                      {option.imgurl !== null && (
                        <img
                          src={option.imgurl}
                          alt=""
                          className="w-[150px] h-[150px] object-contain mx-4"
                        />
                      )}
                      <div className="w-full flex justify-between items-center">
                        <div
                          onClick={(e) =>
                            onDeleteOptionHandler(e, question._id, option._id)
                          }
                        >
                          <NeonButton
                            noColor={true}
                            isSmall={true}
                            textColor="red"
                          >
                            Delete Option
                          </NeonButton>
                        </div>
                        <div
                          onClick={(e) => {
                            e.preventDefault();

                            router.push(
                              {
                                pathname: `/admin/subject/chapter/question/editoption`,
                                query: {
                                  subId: props.subId,
                                  chapId: props.chapId,
                                  topicId: props.topicId,
                                  queId: question._id,
                                  optId: option._id,
                                  option: JSON.stringify(option),
                                },
                              },
                              undefined,
                              { shallow: true }
                            );
                          }}
                        >
                          <NeonButton
                            noColor={true}
                            isSmall={true}
                            textColor="gray"
                          >
                            Edit Option
                          </NeonButton>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="w-full flex justify-between items-center">
                <div onClick={(e) => onDeleteQuestionHandler(e, question._id)}>
                  <NeonButton noColor={true} isSmall={true} textColor="red">
                    Delete Question
                  </NeonButton>
                </div>
                <div onClick={(e) => onAddOptionHandler(e, question._id)}>
                  <NeonButton noColor={true} isSmall={true} textColor="gray">
                    Add Option
                  </NeonButton>
                </div>

                <div
                  onClick={(e) => {
                    e.preventDefault();

                    router.push(
                      {
                        pathname: `/admin/subject/chapter/question/edit`,
                        query: {
                          subId: props.subId,
                          chapId: props.chapId,
                          topicId: props.topicId,
                          queId: question._id,
                          question: JSON.stringify(question),
                        },
                      },
                      undefined,
                      { shallow: true }
                    );
                  }}
                >
                  <NeonButton noColor={true} isSmall={true} textColor="blue">
                    Edit Question
                  </NeonButton>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-8">
                <div
                  onClick={(e) => onShowSolutionHandler(e, question._id)}
                  className="text-center p-2 mx-4"
                >
                  <NeonButton noColor={true} isSmall={true} textColor="gray">
                    {!showSolution.isSolution &&
                    showSolution.status &&
                    showSolution.id === question._id
                      ? "Hide Solution"
                      : "View solution"}
                  </NeonButton>
                </div>
                {!showSolution.isSolution &&
                  showSolution.status &&
                  showSolution.id === question._id && (
                    <div
                      onClick={(e) => onAddSolutionHandler(e, question._id)}
                      className="text-center p-2 mx-4"
                    >
                      <NeonButton
                        noColor={true}
                        isSmall={true}
                        textColor="gray"
                      >
                        Add Solution
                      </NeonButton>
                    </div>
                  )}
              </div>

              {/* {solution for for the question} */}
              {showSolution.status &&
                showSolution.isSolution &&
                showSolution.id === question._id && (
                  <div>
                    <Solution solution={showSolution} />
                  </div>
                )}
            </li>
          ))}
      </ul>
      {showMessage.isShow && (
        <Message message={showMessage.message} status={showMessage.status} />
      )}
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const { subId, chapId, topicId, topic } = context.query;
  if (
    typeof subId === "undefined" ||
    !subId ||
    typeof chapId === "undefined" ||
    !chapId ||
    typeof topicId === "undefined" ||
    !topicId ||
    typeof topic === "undefined" ||
    !topic
  ) {
    return {
      redirect: {
        destination: "/sorry",
        permanent: false,
      },
    };
  }
  try {
    const allQueRes = await axios.post(process.env.GET_QUE_URL, {
      subId,
      chapId,
      topicId,
    });
    // console.log("allSubRes = ", allQueRes.data);
    return {
      props: {
        topic,
        subId,
        chapId,
        topicId,
        isData: allQueRes.data.success || null,
        questions: allQueRes.data.message || null,
      },
    };
  } catch (error) {
    console.log(error.message);
    return {
      props: {
        isData: false || null,
        message: error?.message || "Error while retreiving questions!" || null,
      },
    };
  }
};

export default QuestionsHome;
