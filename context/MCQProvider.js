import React, { useContext, useState, useEffect } from "react";
const MCQContext = React.createContext();

export const useMCQ = () => {
  return useContext(MCQContext);
};

export const MCQProvider = ({ children }) => {
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  return (
    <MCQContext.Provider value={{ selectedQuestions, setSelectedQuestions }}>
      {children}
    </MCQContext.Provider>
  );
};
