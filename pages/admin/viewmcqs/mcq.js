import { useMCQ } from "@/context/MCQProvider";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import McqView from "@/components/McqView";
import { AiFillEdit, AiOutlineLogout } from "react-icons/ai";
import NeonButton from "@/components/Button";
import { useRouter } from "next/router";
import Message from "@/components/Message";
import DeleteDialog from "@/components/DeleteConfirmation";
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const MCQ = (props) => {
  const router = useRouter();
  const { mcq, message, edited, mcqId } = props;
  const { selectedQuestions, setSelectedQuestions } = useMCQ();
  const [title, setTitle] = useState(mcq && mcq.title);
  const [mcqImgurl, setMcqImgUrl] = useState(mcq && mcq.imgurl);
  const [isUpdated, setIsUpdated] = useState(false);
  const titleRef = useRef();
  const [showMessage, setShowMessage] = useState({
    isShow: false,
    status: false,
    message: "",
  });
  const [showDeleteDialog, setShowDeleteDialog] = useState({
    action: "null",
    state: false,
  });

  if (!mcq && !edited) {
    return <div>{message}</div>;
  }

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
          setIsUpdated(true);
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

    console.log("remove image = ", imgurl);

    if (imgurl === null || !imgurl || typeof imgurl === "undefined") {
      setShowMessage((prev) => {
        return {
          ...prev,
          status: false,
          message: "No image selected!",
          isShow: true,
        };
      });
      return;
    }

    const storage = getStorage();
    const storageRef = ref(storage, imgurl);

    deleteObject(storageRef)
      .then(() => {
        console.log("Image removed successfully");
        document.getElementById(imgid).value = "";
        setMcqImgUrl(null);
        setIsUpdated(true);
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
    setIsUpdated(true);
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
      setIsUpdated(true);
    }
  };

  const onClickAddHandler = (e) => {
    e.preventDefault();

    router.push(`/admin/viewmcqs/add?mcqId=${mcqId}`);
  };

  const onClickSubmitEditHandler = async (e) => {
    e.preventDefault();

    try {
      const editMcqRes = await axios.post(process.env.EDIT_MCQ_URL, {
        mcqId,
        newMcq: { question: selectedQuestions, title, imgurl: mcqImgurl },
      });

      setShowMessage((prev) => {
        return {
          ...prev,
          message: editMcqRes.data.message,
          isShow: true,
          status: editMcqRes.data.success,
        };
      });
      if (editMcqRes.data.success) {
        setIsUpdated(false);
      }
    } catch (error) {
      setShowMessage((prev) => {
        return {
          ...prev,
          status: false,
          message: error?.message || "Image upload failed",
          isShow: true,
        };
      });
    }
  };

  const onClickDeleteHandler = async (setError) => {
    document.body.classList.remove("overflow-hidden");
    try {
      const delMcqRes = await axios.post(process.env.DELETE_MCQ_URL, {
        mcqId,
      });
      if (delMcqRes.data.success) {
        setShowDeleteDialog((prev) => {
          return { ...prev, state: false };
        });

        router.push("/admin/viewmcqs");
      } else {
        setError(delMcqRes.data.message);
        setShowMessage((prev) => {
          return {
            ...prev,
            message: editMcqRes.data.message,
            isShow: true,
            status: false,
          };
        });
      }
    } catch (error) {
      console.log(error?.message);
      setError(error?.message || "Error while deleting subject! Please Retry");
      setShowMessage((prev) => {
        return {
          ...prev,
          message:
            error?.message || "Error while deleting subject! Please Retry",
          isShow: true,
          status: false,
        };
      });
    }
  };

  const toggleDialogHandler = (e) => {
    e.preventDefault();
    setShowDeleteDialog((prev) => {
      return { ...prev, state: true };
    });
    document.body.classList.add("overflow-hidden");
  };

  useEffect(() => {
    if (!edited) {
      setSelectedQuestions(mcq.question);
    } else {
      setIsUpdated(true);
    }
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage((prev) => {
        return { ...prev, isShow: false };
      });
    }, 4000);

    return () => clearTimeout(timer);
  }, [showMessage.message]);
  useEffect(() => {
    if (showDeleteDialog.state) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [showDeleteDialog]);

  return (
    <div className="relative bg-white p-4 m-4 rounded-lg shadow-md">
      {/* go back button */}
      {!edited && (
        <div
          className="absolute left-5 top-5 transform rotate-180 hover:scale-105 hover:cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            router.back();
          }}
        >
          <AiOutlineLogout size={32} color="green" />
        </div>
      )}
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

      <div className="w-full text-end" onClick={(e) => onClickAddHandler(e)}>
        <NeonButton isSmall={true} noColor={true} textColor="gray">
          Add Question to the Mcq
        </NeonButton>
      </div>
      <div
        className="w-full text-start"
        onClick={(e) => {
          e.preventDefault();

          router.push("/admin/viewmcqs");
        }}
      >
        <NeonButton isSmall={true} noColor={true} textColor="gray">
          View All MCQ SET
        </NeonButton>
      </div>

      {selectedQuestions.length === 0 ? (
        <div>This MCQ set is empty please add some questions!</div>
      ) : (
        <McqView setIsUpdated={setIsUpdated} />
      )}
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

      {isUpdated && (
        <div
          className="w-full text-end"
          onClick={(e) => onClickSubmitEditHandler(e)}
        >
          <NeonButton>Submit Edited MCQ set</NeonButton>
        </div>
      )}

      <div
        className="w-full text-start"
        onClick={(e) => toggleDialogHandler(e)}
      >
        <NeonButton noColor={true} textColor="red">
          DELETE THIS SET
        </NeonButton>
      </div>

      {/* confirm delete subject */}
      {showDeleteDialog.state && (
        <div className="absolute top-1/4 left-1/3 transform -translate-x-1/3 -translate-y-1/4 w-1/2 opacity-100 z-50">
          <DeleteDialog
            initDialog={{
              deleteName: title,
              deleteOnClickHandler: onClickDeleteHandler,
              setShowDeleteDialog: setShowDeleteDialog,
            }}
          />
        </div>
      )}

      {showMessage.isShow && (
        <Message message={showMessage.message} status={showMessage.status} />
      )}
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const { mcqId, edited } = context.query;

  if (edited) {
    return {
      props: { edited: true, mcqId },
    };
  }

  if (!mcqId || typeof mcqId === "undefined") {
    return {
      redirect: {
        destination: "/sorry",
        permanent: false,
      },
    };
  }

  try {
    const mcqRes = await axios.post(process.env.GET_ONE_MCQ_URL, { mcqId });

    if (mcqRes.data.success) {
      return {
        props: {
          message: "MCQs fetched successfully!",
          mcq: mcqRes.data.message,
          mcqId,
        },
      };
    } else {
      return { props: { message: mcqRes.data.message } };
    }
  } catch (error) {
    return { props: { message: error?.message || "MCQ fetched failed!" } };
  }
};

export default MCQ;
