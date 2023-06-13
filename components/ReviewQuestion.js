// import Latex from "react-latex-next";
import LatexText from "./LatexText";

const ReviewQuestion = ({ question, imageUrl }) => {
  // console.log(imageUrl);
  return (
    <div className="border border-pink-600 bg-slate-700 text-white p-2 flex flex-col space-y-4 items-center justify-center">
      {/* <div className="">{question.que}</div>
      <div>{question.opt1}</div>
      <div>{question.opt1}</div>
      <div>{question.opt2}</div> */}
      <span className="underline underline-offset-2">Question</span>
      {/* <div dangerouslySetInnerHTML={{ __html: question.que }}></div> */}
      <LatexText text={question.que || ""} />
      {/* {console.log("question review = ", question.que)} */}
      {/* <div>{question.que}</div> */}
      {imageUrl.question !== null && (
        <img
          className="w-[100px] h-[100px] object-contain"
          src={imageUrl.question}
          alt=""
        />
      )}
      <div className="flex flex-col space-y-2">
        <div className="flex space-x-4">
          <span>a.</span>
          {/* <div dangerouslySetInnerHTML={{ __html: question.opt1 }}></div> */}
          <LatexText text={question.opt1 || ""} />
        </div>
        {imageUrl.option1 !== null && (
          <img
            className="w-[100px] h-[100px] object-contain"
            src={imageUrl.option1}
            alt=""
          />
        )}
        <div className="flex space-x-4">
          <span>b.</span>
          {/* <div dangerouslySetInnerHTML={{ __html: question.opt2 }}></div> */}
          <LatexText text={question.opt2 || ""} />
        </div>
        {imageUrl.option2 !== null && (
          <img
            className="w-[100px] h-[100px] object-contain"
            src={imageUrl.option2}
            alt=""
          />
        )}

        <div className="flex space-x-4">
          <span>c.</span>
          {/* <div dangerouslySetInnerHTML={{ __html: question.opt3 }}></div> */}
          <LatexText text={question.opt3 || ""} />
        </div>
        {imageUrl.option3 !== null && (
          <img
            className="w-[100px] h-[100px] object-contain"
            src={imageUrl.option3}
            alt=""
          />
        )}

        <div className="flex space-x-4">
          <span>d.</span>
          {/* <div dangerouslySetInnerHTML={{ __html: question.opt4 }}></div> */}
          <LatexText text={question.opt4 || ""} />
        </div>
        {imageUrl.option4 !== null && (
          <img
            className="w-[100px] h-[100px] object-contain"
            src={imageUrl.option4}
            alt=""
          />
        )}
      </div>
    </div>
  );
};

export default ReviewQuestion;
