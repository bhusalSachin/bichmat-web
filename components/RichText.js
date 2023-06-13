import React, { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import NeonButton from "./Button";
import ReviewQuestion from "./ReviewQuestion";

import { initializeApp } from "firebase/app";
// import { ref } from "firebase/storage";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const QuillNoSSRWrapper = dynamic(() => import("react-quill"), { ssr: false });

const RichText = () => {
  const [question, setQuestion] = useState({ question: "", weightage: "" });
  const [option1, setOption1] = useState({
    text: "",
    isCorrect: false,
  });
  const [option2, setOption2] = useState({
    text: "",
    isCorrect: false,
  });
  const [option3, setOption3] = useState({
    text: "",
    isCorrect: false,
  });
  const [option4, setOption4] = useState({
    text: "",
    isCorrect: false,
  });
  const [imageUrl, setImageUrl] = useState({
    question: null,
    option1: null,
    option2: null,
    option3: null,
    option4: null,
  });
  const [showReview, setShowReview] = useState(false);

  const reviewQuestionHandler = (e) => {
    e.preventDefault();
    setShowReview((prev) => !prev);
  };

  const submitQuestionHandler = async () => {
    return;
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "link",
    "code-block",
    "formula",
    "list",
    "bullet",
  ];

  const firebaseConfig = {
    apiKey: "AIzaSyA-C31UXl6v2cKALcyIUjvpZdRPnBe3Gig",

    authDomain: "bichmat.firebaseapp.com",

    projectId: "bichmat",

    storageBucket: "bichmat.appspot.com",

    messagingSenderId: "137774502468",

    appId: "1:137774502468:web:4c00673b56f859c8ffa211",

    measurementId: "G-823NQKPQF8",
  };

  initializeApp(firebaseConfig);

  const handleImageUpload = (event, action) => {
    const file = event.target.files[0]; // Get the selected file from the input element
    const storage = getStorage();
    const storageRef = ref(
      storage,
      `images/${action}-${Date.now()}` + file.name
    );

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error.message || "Image upload failed!");
      },
      () => {
        // Handle successful uploads on complete
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          // setImageUrl(downloadURL);
          setImageUrl((prevImg) => {
            return { ...prevImg, [action]: downloadURL };
          });
        });
      }
    );
  };

  function removeImage(e, imgurl, imgid, action) {
    e.preventDefault();

    document.getElementById(imgid).value = "";
    const storage = getStorage();
    const storageRef = ref(storage, imgurl);

    deleteObject(storageRef)
      .then(() => {
        console.log("Image removed successfully");
        // Perform any additional actions after deletion if needed
        setImageUrl((prevImg) => {
          return { ...prevImg, [action]: null };
        });
      })
      .catch((error) => {
        console.log("Error deleting image:", error.message);
      });
  }

  const handleIsCorrect = (e, action) => {
    e.preventDefault();

    switch (action) {
      case "option1":
        setOption1((opt1) => {
          return { ...opt1, isCorrect: !opt1.isCorrect };
        });
        setOption2((opt2) => {
          return { ...opt2, isCorrect: false };
        });
        setOption3((opt3) => {
          return { ...opt3, isCorrect: false };
        });
        setOption4((opt4) => {
          return { ...opt4, isCorrect: false };
        });
        break;
      case "option2":
        setOption2((opt2) => {
          return { ...opt2, isCorrect: !opt2.isCorrect };
        });
        setOption1((opt1) => {
          return { ...opt1, isCorrect: false };
        });
        setOption3((opt3) => {
          return { ...opt3, isCorrect: false };
        });
        setOption4((opt4) => {
          return { ...opt4, isCorrect: false };
        });
        break;
      case "option3":
        setOption3((opt3) => {
          return { ...opt3, isCorrect: !opt3.isCorrect };
        });
        setOption2((opt2) => {
          return { ...opt2, isCorrect: false };
        });
        setOption1((opt1) => {
          return { ...opt1, isCorrect: false };
        });
        setOption4((opt4) => {
          return { ...opt4, isCorrect: false };
        });
        break;
      case "option4":
        setOption4((opt4) => {
          return { ...opt4, isCorrect: !opt4.isCorrect };
        });
        setOption3((opt3) => {
          return { ...opt3, isCorrect: false };
        });
        setOption2((opt2) => {
          return { ...opt2, isCorrect: false };
        });
        setOption1((opt1) => {
          return { ...opt1, isCorrect: false };
        });
        break;
    }
  };

  return (
    <>
      <div className="p-2">
        {typeof window !== "undefined" && (
          <QuillNoSSRWrapper
            value={question.question}
            onChange={(value) =>
              setQuestion((prev) => {
                return { ...prev, question: value };
              })
            }
            modules={{
              toolbar: [
                [{ header: [1, 2, 3, false] }],
                ["bold", "italic", "underline"],
                ["link"],
                ["code-block", "formula"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["clean"],
              ],
            }}
            formats={formats}
            placeholder="Write the question..."
            theme="snow"
          />
        )}

        <input
          className="p-1 border active:border-slate-900 my-1"
          type="number"
          value={question.weightage}
          onChange={(e) => {
            console.log("weighatge = ", question);
            setQuestion((prev) => {
              return { ...prev, weightage: e.target.value };
            });
          }}
          min={0}
          max={10}
          placeholder="Give Question Weightage"
        />

        <input
          id="imageQuestion"
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(e, "question")}
          placeholder="upload"
        />
        {imageUrl.question !== null && (
          <button
            className="p-1 border border-white bg-red-900 text-white rounded-md"
            onClick={(e) =>
              removeImage(e, imageUrl.question, "imageQuestion", "question")
            }
          >
            Remove Image
          </button>
        )}
      </div>
      <div className="p-2">
        <QuillNoSSRWrapper
          value={option1.text}
          onChange={(value) =>
            setOption1((opt1) => {
              return { ...opt1, text: value };
            })
          }
          modules={{
            toolbar: [["bold", "italic"], ["link"], ["clean"]],
          }}
          formats={["bold", "italic", "link"]}
          placeholder="Option 1"
        />
        <button
          className={`p-1 border border-white ${
            option1.isCorrect ? "bg-blue-700" : "bg-slate-800"
          } text-white rounded-md mr-4`}
          onClick={(e) => handleIsCorrect(e, "option1")}
        >
          {!option1.isCorrect ? "Select As Correct" : "Set as Incorrect"}
        </button>
        <input
          id="imageOption1"
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(e, "option1")}
        />
        {imageUrl.option1 !== null && (
          <button
            className="p-1 border border-white bg-red-900 text-white rounded-md"
            onClick={(e) =>
              removeImage(e, imageUrl.option1, "imageOption1", "option1")
            }
          >
            Remove Image
          </button>
        )}
      </div>
      <div className="p-2">
        <QuillNoSSRWrapper
          value={option2.text}
          onChange={(value) =>
            setOption2((opt2) => {
              return { ...opt2, text: value };
            })
          }
          modules={{
            toolbar: [["bold", "italic"], ["link"], ["clean"]],
          }}
          formats={["bold", "italic", "link"]}
          placeholder="Option 2"
        />
        <button
          className={`p-1 border border-white ${
            option2.isCorrect ? "bg-blue-700" : "bg-slate-800"
          } text-white rounded-md mr-4`}
          onClick={(e) => handleIsCorrect(e, "option2")}
        >
          {!option2.isCorrect ? "Select As Correct" : "Set as Incorrect"}
        </button>
        <input
          id="imageOption2"
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(e, "option2")}
        />
        {imageUrl.option2 !== null && (
          <button
            className="p-1 border border-white bg-red-900 text-white rounded-md"
            onClick={(e) =>
              removeImage(e, imageUrl.option2, "imageOption2", "option2")
            }
          >
            Remove Image
          </button>
        )}
      </div>
      <div className="p-2">
        <QuillNoSSRWrapper
          value={option3.text}
          onChange={(value) =>
            setOption3((opt3) => {
              return { ...opt3, text: value };
            })
          }
          modules={{
            toolbar: [["bold", "italic"], ["link"], ["clean"]],
          }}
          formats={["bold", "italic", "link"]}
          placeholder="Option 3"
        />
        <button
          className={`p-1 border border-white ${
            option3.isCorrect ? "bg-blue-700" : "bg-slate-800"
          } text-white rounded-md mr-4`}
          onClick={(e) => handleIsCorrect(e, "option3")}
        >
          {!option3.isCorrect ? "Select As Correct" : "Set as Incorrect"}
        </button>
        <input
          id="imageOption3"
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(e, "option3")}
        />
        {imageUrl.option3 !== null && (
          <button
            className="p-1 border border-white bg-red-900 text-white rounded-md"
            onClick={(e) =>
              removeImage(e, imageUrl.option3, "imageOption3", "option3")
            }
          >
            Remove Image
          </button>
        )}
      </div>
      <div className="p-2">
        <QuillNoSSRWrapper
          value={option4.text}
          onChange={(value) =>
            setOption4((opt4) => {
              return { ...opt4, text: value };
            })
          }
          modules={{
            toolbar: [["bold", "italic"], ["link"], ["clean"]],
          }}
          formats={["bold", "italic", "link"]}
          placeholder="Option 4"
        />
        <button
          className={`p-1 border border-white ${
            option4.isCorrect ? "bg-blue-700" : "bg-slate-800"
          } text-white rounded-md mr-4`}
          onClick={(e) => handleIsCorrect(e, "option4")}
        >
          {!option4.isCorrect ? "Select As Correct" : "Set as Incorrect"}
        </button>
        <input
          id="imageOption4"
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(e, "option4")}
        />
        {imageUrl.option4 !== null && (
          <button
            className="p-1 border border-white bg-red-900 text-white rounded-md"
            onClick={(e) =>
              removeImage(e, imageUrl.option4, "imageOption4", "option4")
            }
          >
            Remove Image
          </button>
        )}
      </div>
      <div className="my-4 p-2" onClick={reviewQuestionHandler}>
        <NeonButton noColor={true} textColor="blue">
          Review Question
        </NeonButton>
      </div>
      {showReview && (
        <ReviewQuestion
          question={{
            que: question.text,
            opt1: option1.text,
            opt2: option2.text,
            opt3: option3.text,
            opt4: option4.text,
          }}
          imageUrl={{ ...imageUrl }}
        />
      )}

      {showReview && (
        <div className="my-4 p-2" onClick={submitQuestionHandler}>
          <NeonButton noColor={true} textColor="slate">
            Submit Question
          </NeonButton>
        </div>
      )}
    </>
  );
};

export default RichText;
