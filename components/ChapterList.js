import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiOutlineDownCircle, AiOutlineForward } from "react-icons/ai";
import TopicList from "./TopicList";

const ChapterList = ({ chapters, subname, subId, wide, mcqId }) => {
  const router = useRouter();
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
  const [openChapter, setOpenChapter] = useState({ state: false, index: 0 });

  useEffect(() => {
    // console.log("chapters = ", chapters);
    const generateRandomNumbers = () => {
      return Array.from({ length: backgroundColors.length }, () =>
        Math.floor(Math.random() * backgroundColors.length)
      );
    };

    setRandomPick(generateRandomNumbers());
  }, []);

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

  return (
    <>
      {chapters?.map((chapter, index) => {
        const backgroundColor = backgroundColors[randomPick[index]];
        return (
          <div
            key={chapter.name + index}
            className="w-full flex flex-col items-center justify-center"
          >
            <div
              className={`${
                wide ? "w-3/4" : "w-1/2"
              } p-2 shadow-md ${backgroundColor} text-white text-lg rounded-md hover:cursor-pointer flex justify-between`}
              onClick={(e) => onClickSubjectHandler(e, index)}
            >
              <span>{chapter.name}</span>

              {!openChapter.state ||
              (openChapter.state && openChapter.index !== index) ? (
                <AiOutlineDownCircle size={24} color="white" />
              ) : (
                <AiOutlineForward size={24} color="white" />
              )}
            </div>
            {openChapter.state && openChapter.index === index && (
              <div className="flex flex-col space-y-4 items-center justify-center my-4 w-3/4">
                <TopicList
                  topics={chapter.topics}
                  subname={subname}
                  subId={subId}
                  chapId={chapter._id}
                  wide
                  mcqId={mcqId}
                />
              </div>
            )}
          </div>
        );
      })}
    </>
  );
};

export default ChapterList;
