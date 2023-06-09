// import Latex from "react-latex-next";
import LatexText from "./LatexText";

const ReviewQuestion = ({ question }) => {
  return (
    <div className="border border-pink-600 bg-slate-700 text-white p-2 flex flex-col space-y-4 items-center justify-center">
      {/* <div className="">{question.que}</div>
      <div>{question.opt1}</div>
      <div>{question.opt1}</div>
      <div>{question.opt2}</div> */}
      <span className="underline underline-offset-2">Question</span>
      {/* <div dangerouslySetInnerHTML={{ __html: question.que }}></div> */}
      <LatexText text={question.que || ""} />
      {console.log("question review = ", question.que)}
      {/* <div>{question.que}</div> */}
      <div className="flex flex-col space-y-2">
        <div className="flex space-x-4">
          <span>a.</span>
          {/* <div dangerouslySetInnerHTML={{ __html: question.opt1 }}></div> */}
          <LatexText text={question.opt1 || ""} />
        </div>
        <div className="flex space-x-4">
          <span>b.</span>
          {/* <div dangerouslySetInnerHTML={{ __html: question.opt2 }}></div> */}
          <LatexText text={question.opt2 || ""} />
        </div>

        <div className="flex space-x-4">
          <span>c.</span>
          {/* <div dangerouslySetInnerHTML={{ __html: question.opt3 }}></div> */}
          <LatexText text={question.opt3 || ""} />
        </div>

        <div className="flex space-x-4">
          <span>d.</span>
          {/* <div dangerouslySetInnerHTML={{ __html: question.opt4 }}></div> */}
          <LatexText text={question.opt4 || ""} />
        </div>
      </div>
    </div>
  );
};

export default ReviewQuestion;
