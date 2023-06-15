import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const TopicList = ({ topics, subname, subId, chapId, wide, mcqId }) => {
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

  const onClickTopicHandler = (e, topicId, topicname) => {
    e.preventDefault();

    if (mcqId) {
      router.push(
        `/admin/viewmcqs/select?subId=${subId}&chapId=${chapId}&topicId=${topicId}&mcqId=${mcqId}`
      );
      return;
    }
    router.push(
      `/admin/createmcqset/${subname}/${topicname}?subId=${subId}&chapId=${chapId}&topicId=${topicId}`
    );
  };

  return (
    <>
      {topics?.map((topic, index) => {
        const backgroundColor = backgroundColors[randomPick[index]];
        return (
          <div
            key={topic.name + index}
            className={`${
              wide ? "w-3/4" : "w-1/2"
            } p-2 shadow-md ${backgroundColor} text-white text-lg rounded-md hover:cursor-pointer flex justify-between`}
            onClick={(e) => onClickTopicHandler(e, topic._id, topic.name)}
          >
            {topic.name}
          </div>
        );
      })}
    </>
  );
};

export default TopicList;
