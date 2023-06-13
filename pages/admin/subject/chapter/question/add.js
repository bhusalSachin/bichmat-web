import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import NeonButton from "@/components/Button";
import { initializeApp } from "firebase/app";
import AddOption from "@/components/AddOption";
import { AiOutlineLogout } from "react-icons/ai";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import Message from "@/components/Message";
import { useRouter } from "next/router";

const QuillNoSSRWrapper = dynamic(() => import("react-quill"), {
  ssr: false,
});

const AddQuestion = (props) => {
  const [question, setQuestion] = useState({ question: "", weightage: "" });
  const [queImgurl, setQueImgUrl] = useState(null);
  // const [optImgurl, setOptImgurl] = useState(null);
  const [showAddOption, setShowAddOption] = useState({
    status: false,
    id: null,
  });
  const [showMessage, setShowMessage] = useState({
    isShow: false,
    status: false,
    message: "",
  });

  const router = useRouter();

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
        setShowMessage((prev) => {
          return {
            ...prev,
            status: false,
            message: error?.message || "Image upload failed",
            isShow: true,
          };
        });
      },
      () => {
        // Handle successful uploads on complete
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setQueImgUrl(downloadURL);
          setShowMessage((prev) => {
            return {
              ...prev,
              status: true,
              message: "Image uploaded successfully!",
              isShow: true,
            };
          });
        });
      }
    );
  };

  function removeImage(e, imgurl, imgid, action) {
    e.preventDefault();

    const storage = getStorage();
    const storageRef = ref(storage, imgurl);

    deleteObject(storageRef)
      .then(() => {
        console.log("Image removed successfully");
        document.getElementById(imgid).value = "";
        setQueImgUrl(null);
        setShowMessage((prev) => {
          return {
            ...prev,
            status: true,
            message: "Image deleted successfully!",
            isShow: true,
          };
        });
      })
      .catch((error) => {
        console.log("Error deleting image:", error.message);
        setShowMessage((prev) => {
          return {
            ...prev,
            status: false,
            message: error?.message || "Image deletion failed",
            isShow: true,
          };
        });
      });
  }

  const onSubmitQuestionHandler = async (e) => {
    e.preventDefault();

    try {
      const addQueRes = await axios.post(process.env.ADD_QUE_URL, {
        ...question,
        imgurl: queImgurl,
        subId: props.subId,
        chapId: props.chapId,
        topicId: props.topicId,
      });

      console.log("addQueRes = ", addQueRes);

      if (addQueRes.data.success) {
        console.log("question added successfully!", addQueRes.data.message);
        setShowAddOption((prev) => {
          return {
            ...prev,
            status: true,
            id: addQueRes.data.message.question._id,
          };
        });
        setShowMessage((prev) => {
          return {
            ...prev,
            status: true,
            message: "Question added successfully!",
            isShow: true,
          };
        });
      } else {
        console.log(addQueRes.data.message || "Error while adding question!");
        setShowAddOption((prev) => {
          return { ...prev, status: false };
        });
        setShowMessage((prev) => {
          return {
            ...prev,
            status: false,
            message: addQueRes.data.message.msg || "Question addition failed!",
            isShow: true,
          };
        });
      }
    } catch (error) {
      console.log(error?.message || "Error while adding question.");
      setShowMessage((prev) => {
        return {
          ...prev,
          status: false,
          message: error?.message || "Question addition failed!",
          isShow: true,
        };
      });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage((prev) => {
        return { ...prev, isShow: false };
      });
    }, 4000);

    return () => clearTimeout(timer);
  }, [showMessage.message]);

  return (
    <>
      {/* go back button */}
      <div
        className="absolute left-5 top-5 transform rotate-180 hover:scale-105 hover:cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          router.back();
        }}
      >
        <AiOutlineLogout size={32} color="green" />
      </div>
      <h2 className="text-xl text-center text-slate-800 p-2 m-4">
        Type a New Question
      </h2>
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
          className="p-1 border active:border-slate-900 my-1 mr-4"
          type="number"
          value={question.weightage}
          onChange={(e) => {
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
        {queImgurl !== null && (
          <button
            className="p-1 border border-white bg-red-900 text-white rounded-md"
            onClick={(e) =>
              removeImage(e, queImgurl, "imageQuestion", "question")
            }
          >
            Remove Image
          </button>
        )}
      </div>
      {/* submit button */}
      {!showAddOption.status && (
        <div className="p-2 my-4" onClick={(e) => onSubmitQuestionHandler(e)}>
          <NeonButton noColor={true} textColor="blue" isSmall={true}>
            Submit Question
          </NeonButton>
        </div>
      )}

      {showAddOption.status && (
        <AddOption addprops={props} showAddOption={showAddOption} />
      )}
      {showMessage.isShow && (
        <Message message={showMessage.message} status={showMessage.status} />
      )}
    </>
  );
};

export const getServerSideProps = (context) => {
  const { subId, chapId, topicId } = context.query;
  if (
    typeof subId === "undefined" ||
    !subId ||
    typeof chapId === "undefined" ||
    !chapId ||
    typeof topicId === "undefined" ||
    !topicId
  ) {
    return {
      redirect: {
        destination: "/sorry",
        permanent: false,
      },
    };
  }

  return { props: { subId, chapId, topicId } };
};

export default AddQuestion;
