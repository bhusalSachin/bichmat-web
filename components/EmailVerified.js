import React from "react";
import { AiFillCheckCircle } from "react-icons/ai";

const EmailVerifiedText = ({ children }) => {
  return (
    <div className="absolute top-0 left-[25%] w-1/2 h-[2em] border border-pink-900 bg-gradient-to-r from-slate-700 to-pink-700 z-50 rounded-b-md flex items-center justify-center">
      <span className="absolute top-0 left-0 w-full h-full mix-blend-multiply opacity-50" />
      <span className="relative z-10 text-white">{children}</span>
      <AiFillCheckCircle size={24} color="white" />
      <span className="hover:cursor-pointer text-white realtive underline z-50">
        Open App
      </span>
    </div>
  );
};

export default EmailVerifiedText;
