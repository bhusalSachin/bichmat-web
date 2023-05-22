import React from "react";

const NeonButton = ({ children }) => {
  return (
    <button className="relative inline-block px-3 py-2 font-semibold text-white transition-all duration-300 ease-in-out bg-gradient-to-l from-green-400 to-pink-400 border-2 border-green-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 hover:scale-105 hover:shadow-lg">
      <span
        className="absolute top-0 left-0 w-full h-full mix-blend-multiply opacity-50"
        style={{
          backgroundImage: "linear-gradient(to right, #00ff00, #007f00)",
        }}
      />
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default NeonButton;
