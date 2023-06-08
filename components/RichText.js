import React, { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { AiFillCloseCircle } from "react-icons/ai";
import Message from "@/components/Message";
import { useEffect } from "react";

const QuillNoSSRWrapper = dynamic(() => import("react-quill"), { ssr: false });

const RichText = () => {
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [error, setError] = useState(null);

  const handleImageChange = (field, value) => {
    const hasImage = value.includes("<img");
    if (hasImage) {
      // Get the uploaded image tags
      const imageTags = value.match(/<img[^>]+>/g);
      if (imageTags) {
        // Iterate through each image tag
        let modifiedValue = value;
        // let error = false;
        imageTags.forEach((tag) => {
          // Get the image URL from the tag
          const urlMatch = tag.match(/src="([^"]+)"/);
          if (urlMatch) {
            const imageUrl = urlMatch[1];
            // Create an image element to check the size
            const img = new Image();
            img.src = imageUrl;
            img.onload = () => {
              // Check the image size
              const maxWidth = 800; // Set your maximum width here
              const maxHeight = 800; // Set your maximum height here
              if (img.width > maxWidth || img.height > maxHeight) {
                // Handle the case of an image exceeding the maximum size
                // Display an error message to the user
                console.log("Image size exceeds the allowed maximum.");
                // error = true;
                setError("Image size exceeds the allowed maximum.");
                // Clear the content or take appropriate action
                modifiedValue = modifiedValue.replace(tag, "");
              } else {
                // Resize the image
                const resizedTag = tag.replace(
                  ">",
                  ' style="max-width: 100%; height: auto;">'
                );
                modifiedValue = modifiedValue.replace(tag, resizedTag);
              }
              // Update the state variable
              if (field === "question") {
                setQuestion(error ? "" : modifiedValue);
              } else {
                modifiedValue = "";
                switch (field) {
                  case "option1":
                    setOption1(modifiedValue);
                    break;
                  case "option2":
                    setOption2(modifiedValue);
                    break;
                  case "option3":
                    setOption3(modifiedValue);
                    break;
                  case "option4":
                    setOption4(modifiedValue);
                    break;
                  default:
                    break;
                }
              }
            };
          }
        });
      }
    } else {
      switch (field) {
        case "question":
          setQuestion(value);
          break;
        case "option1":
          setOption1(value);
          break;
        case "option2":
          setOption2(value);
          break;
        case "option3":
          setOption3(value);
          break;
        case "option4":
          setOption4(value);
          break;
        default:
          break;
      }
    }
  };
  useEffect(() => {
    if (error !== null) {
      // Hide the message after 5 seconds
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <>
      <div>
        {typeof window !== "undefined" && (
          <QuillNoSSRWrapper
            value={question}
            onChange={(value) => handleImageChange("question", value)}
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
          />
        )}
      </div>
      <div>
        {typeof window !== "undefined" && (
          <QuillNoSSRWrapper
            value={option1}
            onChange={(value) => handleImageChange("option1", value)}
            modules={{
              toolbar: [["bold", "italic"], ["link", "image"], ["clean"]],
            }}
            formats={["bold", "italic", "link", "image"]}
            placeholder="Option 1"
          />
        )}
      </div>
      <div>
        {typeof window !== "undefined" && (
          <QuillNoSSRWrapper
            value={option2}
            onChange={(value) => handleImageChange("option2", value)}
            modules={{
              toolbar: [["bold", "italic"], ["link", "image"], ["clean"]],
            }}
            formats={["bold", "italic", "link", "image"]}
            placeholder="Option 2"
          />
        )}
      </div>
      <div>
        {typeof window !== "undefined" && (
          <QuillNoSSRWrapper
            value={option3}
            onChange={(value) => handleImageChange("option3", value)}
            modules={{
              toolbar: [["bold", "italic"], ["link", "image"], ["clean"]],
            }}
            formats={["bold", "italic", "link", "image"]}
            placeholder="Option 3"
          />
        )}
      </div>
      <div>
        {typeof window !== "undefined" && (
          <QuillNoSSRWrapper
            value={option4}
            onChange={(value) => handleImageChange("option4", value)}
            modules={{
              toolbar: [["bold", "italic"], ["link", "image"], ["clean"]],
            }}
            formats={["bold", "italic", "link", "image"]}
            placeholder="Option 4"
          />
        )}
      </div>
      <div>The written question = </div>
      <div dangerouslySetInnerHTML={{ __html: question }} />
      <div>The options are:</div>
      <div dangerouslySetInnerHTML={{ __html: option1 }} />
      <div dangerouslySetInnerHTML={{ __html: option2 }} />
      <div dangerouslySetInnerHTML={{ __html: option3 }} />
      <div dangerouslySetInnerHTML={{ __html: option4 }} />
      {error && <Message message={error} status={false} />}
    </>
  );
};

export default RichText;
