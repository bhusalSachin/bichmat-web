import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import NeonButton from "@/components/Button";
import { initializeApp } from "firebase/app";
import Message from "@/components/Message";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { useRouter } from "next/router";

const QuillNoSSRWrapper = dynamic(() => import("react-quill"), {
  ssr: false,
});

// another component to add an option to the question just added
const EditOption = (props) => {
  const toBeEditedOption = JSON.parse(props.option);
  //   console.log(props.option);
  const [optImgurl, setOptImgurl] = useState(toBeEditedOption.imgurl);
  const [option, setOption] = useState({
    option: toBeEditedOption.option,
    isCorrect: toBeEditedOption.isCorrect,
  });
  const [showMessageOption, setShowMessageOption] = useState({
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
      const addOptRes = await axios.post(process.env.EDIT_OPT_URL, {
        subId: props.subId,
        chapId: props.chapId,
        topicId: props.topicId,
        queId: props.queId,
        optId: props.optId,
        newOption: {
          ...option,
          imgurl: optImgurl,
        },
      });

      if (addOptRes.data.success) {
        console.log("option edited successfully!");
        setShowMessageOption((prev) => {
          return {
            ...prev,
            status: true,
            message: "Option edited successfully!",
            isShow: true,
          };
        });
        router.back();
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
        error?.message || "Error while editing option to the question"
      );
      setShowMessageOption((prev) => {
        return {
          ...prev,
          status: false,
          message: error?.message || "Option edition failed, retry!!",
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
        Edit Option
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
      {optImgurl !== null && (
        <img
          src={optImgurl}
          alt=""
          className="w-[200px] h-[200px] object-contain"
        />
      )}
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

export default EditOption;

export const getServerSideProps = (context) => {
  const { subId, chapId, topicId, queId, optId, option } = context.query;

  if (
    typeof subId === "undefined" ||
    !subId ||
    typeof chapId === "undefined" ||
    !chapId ||
    typeof topicId === "undefined" ||
    !topicId ||
    typeof queId === "undefined" ||
    !queId ||
    typeof optId === "undefined" ||
    !optId
  ) {
    return {
      redirect: {
        destination: "/sorry",
        permanent: false,
      },
    };
  }
  return {
    props: {
      subId,
      chapId,
      topicId,
      queId,
      optId,
      option,
    },
  };
};
