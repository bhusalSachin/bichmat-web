import SubjectList from "@/components/SubjectList";
import { useMCQ } from "@/context/MCQProvider";
import axios from "axios";
import McqView from "@/components/McqView";
import NeonButton from "@/components/Button";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import Message from "@/components/Message";
import { AiFillEdit } from "react-icons/ai";
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import Sidebar from "@/components/Sidebar";

const CreateMCQ = (props) => {
  const router = useRouter();
  const { subjects, message, added } = props;
  const { selectedQuestions, setSelectedQuestions } = useMCQ();
  const [mcqImgurl, setMcqImgUrl] = useState(null);
  const [title, setTitle] = useState("Write Title Here");
  const titleRef = useRef();
  // console.log(subjects);
  const [showMessage, setShowMessage] = useState({
    isShow: false,
    status: false,
    message: "",
  });

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
          setMcqImgUrl(downloadURL);
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

  function removeImage(e, imgurl, imgid) {
    e.preventDefault();

    const storage = getStorage();
    const storageRef = ref(storage, imgurl);

    deleteObject(storageRef)
      .then(() => {
        console.log("Image removed successfully");
        document.getElementById(imgid).value = "";
        setMcqImgUrl(null);
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

  const onSubmitMcqHandler = async (e) => {
    e.preventDefault();

    if (selectedQuestions.length === 0) {
      setShowMessage((prev) => {
        return {
          ...prev,
          status: false,
          message: "You havn't selected any question yet.",
          isShow: true,
        };
      });
      return;
    }

    let totalmarks = selectedQuestions.reduce(
      (sum, quesiton) => sum + parseInt(quesiton.weightage),
      0
    );

    try {
      const mcqRes = await axios.post(process.env.CREATE_MCQ_URL, {
        title,
        questions: selectedQuestions,
        totalmarks: totalmarks.toString(),
        imgurl: mcqImgurl,
      });

      if (mcqRes.data.success) {
        router.push("/admin/viewmcqs");
      } else {
        setShowMessage((prev) => {
          return {
            ...prev,
            status: false,
            message: mcqRes.data.message,
            isShow: true,
          };
        });
      }
    } catch {
      console.log(error?.message || "Error while creating mcq.");
      setShowMessage((prev) => {
        return {
          ...prev,
          status: false,
          message: error?.message || "Failed creating MCQ!",
          isShow: true,
        };
      });
    }
  };

  const makeEditable = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const element = titleRef.current;

    element.contentEditable = true;
    element.focus();

    // Move cursor to the end of the text
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(element);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);

    element.addEventListener("keydown", (event) =>
      handleEditableKeyDown(event)
    );
    element.addEventListener("blur", (event) => handleEditableBlur(event));
  };

  const handleEditableBlur = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const element = e.target;
    element.contentEditable = false;
    element.removeEventListener("blur", handleEditableBlur);
    element.removeEventListener("keydown", handleEditableKeyDown);
    setTitle(element.innerText.trim());
    // console.group(title);
  };

  const handleEditableKeyDown = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const element = e.target;
      element.blur();
      element.contentEditable = false; // Disable editing

      element.removeEventListener("blur", handleEditableBlur);
      element.removeEventListener("keydown", handleEditableKeyDown);

      setTitle(element.innerText.trim());
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

  useEffect(() => {
    if (!added) {
      setSelectedQuestions([]);
    }
  }, []);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar section={"create mcq set"} />

      <div className="relative flex-1">
        <div className="bg-white p-4 w-3/4 m-auto rounded-lg shadow-md">
          <h2 className="text-2xl text-rose-950 text-center p-2 underline underline-offset-8">
            Add Questions From Subjects
          </h2>
          <div className="w-full flex items-center justify-center flex-col space-y-4 my-4">
            {subjects ? (
              <SubjectList subjects={subjects.subjects} />
            ) : (
              <div>{message}</div>
            )}
          </div>
        </div>
        {/* mcq set */}
        <div className="relative bg-white p-4 m-4 rounded-lg shadow-md">
          <h2 className=" p-2 underline underline-offset-8 flex items-center justify-center space-x-4">
            <span
              className="text-2xl text-rose-950"
              ref={(el) => (titleRef.current = el)}
            >
              {title}
            </span>
            <span
              className="hover:scale-125 hover:cursor-pointer transition-all duration-1000"
              onClick={(e) => makeEditable(e)}
            >
              <AiFillEdit size={24} color="green" />
            </span>
          </h2>

          {selectedQuestions.length === 0 ? (
            <div>
              You haven't selected any questions! Please select some from above
              listed subjects.
            </div>
          ) : (
            <McqView />
          )}
        </div>
        <div className="m-4">
          <input
            id="imageMcq"
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, "mcq")}
            placeholder="upload"
          />
          {mcqImgurl !== null && (
            <button
              className="p-1 border border-white bg-red-900 text-white rounded-md"
              onClick={(e) => removeImage(e, mcqImgurl, "imageMcq")}
            >
              Remove Image
            </button>
          )}
        </div>
        {mcqImgurl && (
          <div className="w-[200px] h-[200px] m-4">
            <img
              className="w-full h-full object-fit"
              src={mcqImgurl}
              alt="sorry"
            />
          </div>
        )}

        <div className="m-4" onClick={(e) => onSubmitMcqHandler(e)}>
          <NeonButton noColor={true} textColor="gray">
            Submit Mcq Set
          </NeonButton>
        </div>

        {showMessage.isShow && (
          <Message message={showMessage.message} status={showMessage.status} />
        )}
      </div>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const { added } = context.query;
  try {
    const subRes = await axios.post(process.env.GET_SUBNAME_URL, {});

    if (subRes.data.success) {
      return {
        props: {
          subjects: subRes.data.message || null,
          message: "Subject Fetched Successfull!" || null,
          added: added || null,
        },
      };
    } else {
      return {
        props: {
          message: "Error while fetching subjects! Please Reload." || null,
        },
      };
    }
  } catch (error) {
    console.log(error?.message || "Error while fetching subjects");
    return {
      props: {
        message:
          error?.message || "Error while fetching subjects! Please Reload.",
      },
    };
  }
};

export default CreateMCQ;
