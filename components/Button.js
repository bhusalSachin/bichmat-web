import React from "react";

const NeonButton = ({
  children,
  noColor = false,
  textColor = "white",
  isSmall = false,
}) => {
  return (
    <button
      className={`relative inline-block ${
        !isSmall ? "px-3 py-2" : "p-1"
      } font-semibold transition-all duration-300 ease-in-out ${
        !noColor ? `bg-gradient-to-l` : ""
      } from-green-400 to-pink-400 border-2 border-green-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 hover:scale-105 hover:shadow-lg`}
    >
      {!noColor ? (
        <span
          className="absolute top-0 left-0 w-full h-full mix-blend-multiply opacity-50"
          style={{
            backgroundImage: "linear-gradient(to right, #00ff00, #007f00)",
          }}
        />
      ) : null}
      <span
        className={`relative z-10 ${
          textColor === "white"
            ? "text-white"
            : textColor === "blue"
            ? "text-blue-600"
            : textColor === "red"
            ? "text-red-600"
            : ""
        }`}
      >
        {children}
      </span>
    </button>
  );
};

export default NeonButton;
