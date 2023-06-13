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
import { AiOutlineLogout } from "react-icons/ai";

const QuillNoSSRWrapper = dynamic(() => import("react-quill"), {
  ssr: false,
});

// another component to add an question to the question just added
const EditSolution = (props) => {
  const toBeEditedSolution = JSON.parse(props.solution);
  //   console.log(props.option);
  const [solImgUrl, setQueImgUrl] = useState(toBeEditedSolution.imgurl);
  const [solution, setSolution] = useState(toBeEditedSolution.solution);
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

  const handleImageUploadSolution = (event, action) => {
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
        setShowMessage((prev) => {
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
          setQueImgUrl(downloadURL);
          setShowMessage((prev) => {
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
            message: error?.message || "Image deletion failed!",
            isShow: true,
          };
        });
      });
  }

  const onSubmitSolutionHandler = async (e) => {
    e.preventDefault();

    try {
      const editSolRes = await axios.post(process.env.EDIT_SOL_URL, {
        queId: props.queId,
        newSolution: {
          solution,
          imgurl: solImgUrl,
        },
      });

      if (editSolRes.data.success) {
        console.log("Solution edited successfully!");
        setShowMessage((prev) => {
          return {
            ...prev,
            status: true,
            message: "Solution edited successfully!",
            isShow: true,
          };
        });
        router.back();
      } else {
        console.log(editSolRes.data.message);
        setShowMessage((prev) => {
          return {
            ...prev,
            status: false,
            message: editSolRes.data.message,
            isShow: true,
          };
        });
      }
    } catch (error) {
      console.log(
        error?.message || "Error while editing solution to the question"
      );
      setShowMessage((prev) => {
        return {
          ...prev,
          status: false,
          message: error?.message || "Solution edition failed, retry!!",
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
    <div className="p-2 relative">
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
        Edit Solution
      </h2>
      <QuillNoSSRWrapper
        value={solution}
        onChange={(value) => setSolution(value)}
        modules={{
          toolbar: [["bold", "italic"], ["link"], ["clean"]],
        }}
        formats={["bold", "italic", "link"]}
      />
      {solImgUrl !== null && (
        <img
          src={solImgUrl}
          alt=""
          className="w-[200px] h-[200px] object-contain"
        />
      )}
      <input
        id="imageSolution"
        type="file"
        accept="image/*"
        onChange={(e) => handleImageUploadSolution(e, "solution")}
        placeholder="upload"
      />
      {solImgUrl !== null && (
        <button
          className="p-1 border border-white bg-red-900 text-white rounded-md"
          onClick={(e) =>
            removeImageOption(e, solImgUrl, "imageSolution", "solution")
          }
        >
          Remove Image
        </button>
      )}
      {/* submit button */}

      <div className="p-2 my-4" onClick={(e) => onSubmitSolutionHandler(e)}>
        <NeonButton noColor={true} textColor="blue" isSmall={true}>
          Submit Solution
        </NeonButton>
      </div>

      {showMessage.isShow && (
        <Message message={showMessage.message} status={showMessage.status} />
      )}
    </div>
  );
};

export default EditSolution;

export const getServerSideProps = (context) => {
  const { queId, solution } = context.query;

  if (typeof queId === "undefined" || !queId) {
    return {
      redirect: {
        destination: "/sorry",
        permanent: false,
      },
    };
  }
  return {
    props: {
      queId,
      solution,
    },
  };
};
