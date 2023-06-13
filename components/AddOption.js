import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import NeonButton from "@/components/Button";
import { initializeApp } from "firebase/app";
import Message from "./Message";
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

// another component to add an option to the question just added
const AddOption = ({ showAddOption, addprops }) => {
  const [optImgurl, setOptImgurl] = useState(null);
  const [option, setOption] = useState({
    option: "",
    isCorrect: false,
  });
  const [showMessageOption, setShowMessageOption] = useState({
    isShow: false,
    status: false,
    message: "",
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

  const handleImageUploadOption = (event, action) => {
    const file = event.target.files[0];
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
        setShowMessageOption((prev) => {
          return {
            ...prev,
            status: false,
            message: error?.message || "Image upload failed!",
            isShow: true,
          };
        });
      },
      () => {
        // Handle successful uploads on complete
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setOptImgurl(downloadURL);
          setShowMessageOption((prev) => {
            return {
              ...prev,
              status: true,
              message: "Image uplaoded successfully!",
              isShow: true,
            };
          });
        });
      }
    );
  };

  function removeImageOption(e, imgurl, imgid) {
    e.preventDefault();

    const storage = getStorage();
    const storageRef = ref(storage, imgurl);

    deleteObject(storageRef)
      .then(() => {
        console.log("Image removed successfully");
        document.getElementById(imgid).value = "";
        setOptImgurl(null);
        setShowMessageOption((prev) => {
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
        setShowMessageOption((prev) => {
          return {
            ...prev,
            status: false,
            message: error?.message || "Image deletion failed!",
            isShow: true,
          };
        });
      });
  }

  const handleIsCorrect = (e) => {
    e.preventDefault();

    setOption((prev) => {
      return { ...prev, isCorrect: !prev.isCorrect };
    });
  };

  const onSubmitOptionHandler = async (e) => {
    e.preventDefault();

    try {
      const addOptRes = await axios.post(process.env.ADD_OPT_URL, {
        subId: addprops.subId,
        chapId: addprops.chapId,
        topicId: addprops.topicId,
        queId: showAddOption.id,
        ...option,
        optImgurl,
      });

      if (addOptRes.data.success) {
        console.log("option added to the question successfully!");
        setShowMessageOption((prev) => {
          return {
            ...prev,
            status: true,
            message: "Option added to the question successfully!",
            isShow: true,
          };
        });
      } else {
        console.log(addOptRes.data.message);
        setShowMessageOption((prev) => {
          return {
            ...prev,
            status: false,
            message: addOptRes.data.message,
            isShow: true,
          };
        });
      }
    } catch (error) {
      console.log(
        error?.message || "Error while adding option to the question"
      );
      setShowMessageOption((prev) => {
        return {
          ...prev,
          status: false,
          message: error?.message || "Option addition failed, retry!!",
          isShow: true,
        };
      });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessageOption((prev) => {
        return { ...prev, isShow: false };
      });
    }, 4000);

    return () => clearTimeout(timer);
  }, [showMessageOption.message]);

  return (
    <div className="p-2">
      <h2 className="text-xl text-center text-slate-800 p-2 m-4">
        Add Option One by One
      </h2>
      <QuillNoSSRWrapper
        value={option.option}
        onChange={(value) =>
          setOption((opt) => {
            return { ...opt, option: value };
          })
        }
        modules={{
          toolbar: [["bold", "italic"], ["link"], ["clean"]],
        }}
        formats={["bold", "italic", "link"]}
        placeholder="Type an option here"
      />
      <button
        className={`p-1 border border-white ${
          option.isCorrect ? "bg-blue-700" : "bg-slate-800"
        } text-white rounded-md mr-4`}
        onClick={(e) => handleIsCorrect(e)}
      >
        {!option.isCorrect ? "Select As Correct" : "Set as Incorrect"}
      </button>
      <input
        id="imageOption"
        type="file"
        accept="image/*"
        onChange={(e) => handleImageUploadOption(e, "option")}
        placeholder="upload"
      />
      {optImgurl !== null && (
        <button
          className="p-1 border border-white bg-red-900 text-white rounded-md"
          onClick={(e) =>
            removeImageOption(e, optImgurl, "imageOption", "option")
          }
        >
          Remove Image
        </button>
      )}
      {/* submit button */}

      <div className="p-2 my-4" onClick={(e) => onSubmitOptionHandler(e)}>
        <NeonButton noColor={true} textColor="blue" isSmall={true}>
          Submit Option
        </NeonButton>
      </div>

      {showMessageOption.isShow && (
        <Message
          message={showMessageOption.message}
          status={showMessageOption.status}
        />
      )}
    </div>
  );
};

export default AddOption;
