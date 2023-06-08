import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import LatexText from "./LatexText";
import NeonButton from "./Button";
import ReviewQuestion from "./ReviewQuestion";

const QuillNoSSRWrapper = dynamic(() => import("react-quill"), { ssr: false });

const RichText = () => {
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [showReview, setShowReview] = useState(false);

  const reviewQuestionHanlder = (e) => {
    e.preventDefault();

    setShowReview((prev) => !prev);
  };

  return (
    <>
      <div className="p-2">
        {typeof window !== "undefined" && (
          <QuillNoSSRWrapper
            value={question}
            onChange={setQuestion}
            modules={{
              toolbar: [
                [{ header: [1, 2, 3, false] }],
                ["bold", "italic", "underline"],
                ["link", "image", "video"],
                ["code-block", "formula"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["clean"],
              ],
            }}
            formats={[
              "header",
              "bold",
              "italic",
              "underline",
              "link",
              "image",
              "video",
              "code-block",
              "formula",
              "list",
              "bullet",
            ]}
            placeholder="Write the question..."
            theme="snow"
          />
        )}
      </div>
      <div className="p-2">
        <QuillNoSSRWrapper
          value={option1}
          onChange={setOption1}
          modules={{
            toolbar: [["bold", "italic"], ["link", "image"], ["clean"]],
          }}
          formats={["bold", "italic", "link", "image"]}
          placeholder="Option 1"
        />
      </div>
      <div className="p-2">
        <QuillNoSSRWrapper
          value={option2}
          onChange={setOption2}
          modules={{
            toolbar: [["bold", "italic"], ["link", "image"], ["clean"]],
          }}
          formats={["bold", "italic", "link", "image"]}
          placeholder="Option 2"
        />
      </div>
      <div className="p-2">
        <QuillNoSSRWrapper
          value={option3}
          onChange={setOption3}
          modules={{
            toolbar: [["bold", "italic"], ["link", "image"], ["clean"]],
          }}
          formats={["bold", "italic", "link", "image"]}
          placeholder="Option 3"
        />
      </div>
      <div className="p-2">
        <QuillNoSSRWrapper
          value={option4}
          onChange={setOption4}
          modules={{
            toolbar: [["bold", "italic"], ["link", "image"], ["clean"]],
          }}
          formats={["bold", "italic", "link", "image"]}
          placeholder="Option 4"
        />
      </div>
      <div className="my-4 p-2" onClick={(e) => reviewQuestionHanlder(e)}>
        <NeonButton noColor={true} textColor="blue">
          Review Question
        </NeonButton>
      </div>
      {showReview && (
        <ReviewQuestion
          question={{
            que: question,
            opt1: option1,
            opt2: option2,
            opt3: option3,
            opt4: option4,
          }}
        />
      )}

      {showReview && (
        <div className="my-4 p-2" onClick={(e) => submitQuestionhandler(e)}>
          <NeonButton noColor={true} textColor="slate">
            Submit Question
          </NeonButton>
        </div>
      )}
    </>
  );
};

export default RichText;
