import { useMCQ } from "@/context/MCQProvider";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const SubjectList = ({ subjects }) => {
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

  useEffect(() => {
    const generateRandomNumbers = () => {
      return Array.from({ length: backgroundColors.length }, () =>
        Math.floor(Math.random() * backgroundColors.length)
      );
    };

    setRandomPick(generateRandomNumbers());
  }, []);

  const onClickSubjectHandler = (e, subId, subname) => {
    e.preventDefault();

    router.push(`/admin/createmcqset/${subname}?subId=${subId}`);
  };

  return (
    <>
      {subjects?.map((subject, index) => {
        const backgroundColor = backgroundColors[randomPick[index]];
        return (
          <div
            key={subject.name + index}
            className={`w-1/2 p-2 shadow-md ${backgroundColor} text-white text-lg rounded-md hover:cursor-pointer flex justify-between`}
            onClick={(e) => onClickSubjectHandler(e, subject._id, subject.name)}
          >
            {subject.name}
          </div>
        );
      })}
    </>
  );
};

export default SubjectList;
