import React from "react";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";

const Message = ({ message, status }) => {
  return (
    <div className="fixed top-0 left-[25%] w-1/2 h-[2em] border border-pink-900 bg-gradient-to-r from-slate-700 to-pink-700 z-50 rounded-b-md flex items-center justify-center">
      <span className="absolute top-0 left-0 w-full h-full mix-blend-multiply opacity-50" />
      <span className="relative z-10 text-white">{message}</span>
      {status ? (
        <AiFillCheckCircle size={24} color="green" />
      ) : (
        <AiFillCloseCircle size={24} color="red" />
      )}
    </div>
  );
};

export default Message;
