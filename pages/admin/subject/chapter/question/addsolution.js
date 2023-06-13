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
import { AiOutlineLogout } from "react-icons/ai";
import { useRouter } from "next/router";

const QuillNoSSRWrapper = dynamic(() => import("react-quill"), {
  ssr: false,
});

// another component to add an option to the question just added
const AddSolution = (props) => {
  const router = useRouter();
  const [solImgUrl, setSolImgUrl] = useState(null);
  const [option, setOption] = useState({
    option: "",
    isCorrect: false,
  });
  const [solution, setSolution] = useState("");
  const [showMessageSolution, setShowMessageSolution] = useState({
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
        setShowMessageSolution((prev) => {
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
          //   console.log("File available at", downloadURL);
          setSolImgUrl(downloadURL);
          setShowMessageSolution((prev) => {
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
        setSolImgUrl(null);
        setShowMessageSolution((prev) => {
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
        setShowMessageSolution((prev) => {
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
      const addSolRes = await axios.post(process.env.ADD_SOL_URL, {
        queId: props.queId,
        solution,
        imgurl: solImgUrl,
      });

      if (addSolRes.data.success) {
        // console.log("Solution added to the question successfully!");
        setShowMessageSolution((prev) => {
          return {
            ...prev,
            status: true,
            message: "Solutoin added to the question successfully!",
            isShow: true,
          };
        });
      } else {
        console.log(addSolRes.data.message);
        setShowMessageSolution((prev) => {
          return {
            ...prev,
            status: false,
            message: addSolRes.data.message,
            isShow: true,
          };
        });
      }
    } catch (error) {
      console.log(
        error?.message || "Error while adding solution to the question"
      );
      setShowMessageSolution((prev) => {
        return {
          ...prev,
          status: false,
          message: error?.message || "Solution addition failed, retry!!",
          isShow: true,
        };
      });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessageSolution((prev) => {
        return { ...prev, isShow: false };
      });
    }, 4000);

    return () => clearTimeout(timer);
  }, [showMessageSolution.message]);

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
        Write Solution Here
      </h2>
      <QuillNoSSRWrapper
        value={solution}
        onChange={(value) => setSolution(value)}
        modules={{
          toolbar: [["bold", "italic"], ["link"], ["clean"]],
        }}
        formats={["bold", "italic", "link"]}
        placeholder="Start typing solution.."
      />
      <input
        id="imageSolution"
        type="file"
        accept="image/*"
        onChange={(e) => handleImageUploadOption(e, "solution")}
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

      {showMessageSolution.isShow && (
        <Message
          message={showMessageSolution.message}
          status={showMessageSolution.status}
        />
      )}
    </div>
  );
};

export const getServerSideProps = (context) => {
  const { queId } = context.query;

  if (!queId || typeof queId === "undefined") {
    return { destination: "/sorry", permanent: false };
  }

  return { props: { queId } };
};

export default AddSolution;
