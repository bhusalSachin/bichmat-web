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

const QuillNoSSRWrapper = dynamic(() => import("react-quill"), {
  ssr: false,
});

const AddQuestion = () => {
  const [question, setQuestion] = useState({ question: "", weightage: "" });

  const [option, setOption] = useState({
    text: "",
    isCorrect: false,
  });

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
    </>
  );
};
