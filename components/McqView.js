import { useMCQ } from "@/context/MCQProvider";
import { useState } from "react";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import NeonButton from "./Button";

const McqView = ({ setIsUpdated }) => {
  const { selectedQuestions, setSelectedQuestions } = useMCQ();
  const [draggedQuestionIndex, setDraggedQuestionIndex] = useState(null);
  const [isReorder, setIsReorder] = useState(false);

  const handleDragStart = (index) => {
    setDraggedQuestionIndex(index);
  };

  const handleDragOver = (event, index) => {
    event.preventDefault();
    if (
      !isReorder ||
      draggedQuestionIndex === null ||
      index === draggedQuestionIndex
    ) {
      return;
    }

    const updatedQuestions = [...selectedQuestions];
    const draggedQuestion = updatedQuestions[draggedQuestionIndex];
    updatedQuestions.splice(draggedQuestionIndex, 1);
    updatedQuestions.splice(index, 0, draggedQuestion);

    setSelectedQuestions(updatedQuestions);
    setDraggedQuestionIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedQuestionIndex(null);
  };

  const onRemoveQuestionHandler = (e, queId) => {
    e.preventDefault();

    const updatedQuestions = selectedQuestions.filter(
      (quesiton) => quesiton._id !== queId
    );

    setSelectedQuestions(updatedQuestions);
    if (setIsUpdated) {
      setIsUpdated(true);
    }
  };

  return (
    <>
      <div
        className="absolute top-2 right-2"
        onClick={(e) => {
          e.preventDefault();

          setIsReorder((prev) => !prev);
        }}
      >
        <NeonButton isSmall={true} noColor={true} textColor="gray">
          {!isReorder ? "Reorder Questions" : "Done Ordering?"}
        </NeonButton>
      </div>
      <ul
        className={`m-4 text-lg ${isReorder && "p-2 border-2 border-pink-900"}`}
      >
        {selectedQuestions.map((question, index) => (
          <li
            key={question.question + index}
            className={`relative bg-slate-100 shadow-md my-8 p-2 flex flex-col space-y-2 hover:cursor-pointer`}
            draggable={isReorder}
            onDragStart={() => handleDragStart(index)}
            onDragOver={(event) => handleDragOver(event, index)}
            onDragEnd={handleDragEnd}
          >
            <div className="flex justify-between items-center bg-white p-2 rounded-md">
              <div className="flex items-center spcae-x-8 flex-1">
                <span>{index + 1}. </span>
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
                        dangerouslySetInnerHTML={{
                          __html: option.option,
                        }}
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
                  </div>
                );
              })}
            </div>

            <div
              className="p-2 w-fit"
              onClick={(e) => onRemoveQuestionHandler(e, question._id)}
            >
              <NeonButton noColor={true} isSmall={true} textColor="red">
                Remove Question
              </NeonButton>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default McqView;
