import NeonButton from "@/components/Button";
import Sidebar from "@/components/Sidebar";
import {
  AiOutlineForward,
  AiOutlineDownCircle,
  AiFillPlusCircle,
  AiFillEdit,
  AiOutlineLogout,
} from "react-icons/ai";
import { useEffect, useRef, useState } from "react";
import AddForm from "@/components/AddForm";
import axios from "axios";
import DeleteDialog from "@/components/DeleteConfirmation";
import Message from "@/components/Message";
import { useRouter } from "next/router";

const Chapter = (props) => {
  const [showAddTopic, setShowAddTopic] = useState(false);
  const [openTopic, setOpenTopic] = useState({ state: false, index: 0 });
  const [showDeleteDialog, setShowDeleteDialog] = useState({
    action: "subject",
    state: false,
  });
  const [resMsg, setResMsg] = useState({ message: "", status: false });
  const [showMessage, setShowMessage] = useState(false);
  const topicRef = useRef([]);

  const router = useRouter();

  const toggleFormHandler = (e, index) => {
    e.preventDefault();

    setShowAddTopic(true);
    document.body.classList.add("overflow-hidden");
  };

  const addTopicHandler = async (formData, setError) => {
    try {
      const addSubRes = await axios.post(process.env.ADD_TOPIC_URL, {
        subId: props.subId,
        chapId: props.chapId,
        ...formData,
      });
      if (addSubRes.data.success) {
        setShowAddTopic(false);
        window.location.reload();
      } else {
        setError(addSubRes.data.message);
      }
    } catch (error) {
      console.log(error?.message);
      setError(error?.message || "Error while adding subject! Please Retry");
    }
  };

  const openTopicHandler = (e, idx) => {
    e.preventDefault();

    setOpenTopic((prev) => {
      // return { index: idx, state: !prev.state };
      if (prev.state === false) {
        return { index: idx, state: true };
      } else {
        if (prev.index === idx) {
          return { index: idx, state: false };
        } else {
          return { index: idx, state: true };
        }
      }
    });
  };

  const toggleDialogHandler = (e) => {
    e.preventDefault();
    setShowDeleteDialog({ state: true, action: "null" });

    document.body.classList.add("overflow-hidden");
  };

  const onDeleteTopicHandler = async (setError, topicId) => {
    try {
      // console.log("sending request to ", process.env.DELETE_CHAPTER_URL);
      const delTopicRes = await axios.post(process.env.DELETE_TOPIC_URL, {
        subId: props.subId,
        chapId: props.chapId,
        topicId,
      });
      if (delTopicRes.data.success) {
        setShowDeleteDialog({ state: false, action: "null" });
        window.location.reload();
      } else {
        setError(delTopicRes.data.message);
      }
    } catch (error) {
      console.log(error?.message);
      setError(error?.message || "Error while deleting topic! Please Retry");
    }
  };

  const makeEditable = (e, index, topicId) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("makeeditable = ", topicId);
    const element = topicRef.current[index];
    const initialValue = element.innerText.trim();

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
      handleEditableKeyDown(event, topicId)
    );
    element.addEventListener("blur", (event) =>
      handleEditableBlur(event, topicId)
    );
  };

  const handleEditableBlur = async (e, topicId) => {
    e.preventDefault();

    const element = e.target;
    const index = Array.from(topicRef.current).findIndex(
      (el) => el === element
    );

    element.contentEditable = false; // Disable editing

    element.removeEventListener("blur", handleEditableBlur);
    element.removeEventListener("keydown", handleEditableKeyDown);

    try {
      const editTopicRes = await axios.post(process.env.EDIT_TOPIC_URL, {
        subId: props.subId,
        chapId: props.chapId,
        topicId,
        newTopic: { name: element.innerText.trim() },
      });
      if (editTopicRes.data.success) {
        // setShowEditSubject(false);
        window.location.reload();
        setResMsg({
          message: editTopicRes.data.message,
          status: true,
        });
      } else {
        element.innerText = initialValue;
        setResMsg({
          message: editTopicRes.data.message,
          status: false,
        });
      }
    } catch (error) {
      console.log(error?.message);
      setResMsg({
        message: error?.message || "Error while updating topic! Please Retry",
        status: false,
      });
    }
  };

  const handleEditableKeyDown = async (e, topicId) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const element = e.target;
      const index = Array.from(topicRef.current).findIndex(
        (el) => el === element
      );

      element.blur();
      element.contentEditable = false; // Disable editing

      element.removeEventListener("blur", handleEditableBlur);
      element.removeEventListener("keydown", handleEditableKeyDown);

      try {
        const editTopicRes = await axios.post(process.env.EDIT_TOPIC_URL, {
          subId: props.subId,
          chapId: props.chapId,
          topicId,
          newTopic: { name: element.innerText.trim() },
        });
        if (editTopicRes.data.success) {
          // setShowEditSubject(false);
          window.location.reload();
          setResMsg({
            message: editTopicRes.data.message,
            status: true,
          });
        } else {
          element.innerText = initialValue;
          setResMsg({
            message: editTopicRes.data.message,
            status: false,
          });
        }
      } catch (error) {
        console.log(error?.message);
        setResMsg({
          message: error?.message || "Error while updating topic! Please Retry",
          status: false,
        });
      }
    }
  };

  const goBackToSubject = (e) => {
    e.preventDefault();

    // router.push("/admin/subject");
    router.back();
  };

  const gotoQuestionOfTopic = (e, topicId, topicname) => {
    e.preventDefault();

    router.push(
      `/admin/subject/chapter/question?subId=${props.subId}&chapId=${props.chapId}&topicId=${topicId}&topic=${topicname}`
    );
  };
  const gotoContentOfTopic = (e, topicId, topicname) => {
    e.preventDefault();

    router.push(
      `/admin/subject/chapter/content?subId=${props.subId}&chapId=${props.chapId}&topicId=${topicId}&topic=${topicname}`
    );
  };

  useEffect(() => {
    if (showAddTopic || showDeleteDialog.state) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [showAddTopic, showDeleteDialog]);

  useEffect(() => {
    if (resMsg.message.length !== 0) {
      setShowMessage(true);

      // Hide the message after 5 seconds
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [resMsg]);

  return (
    <div
      className={`flex bg-slate-300 min-h-screen ${
        showAddTopic &&
        "after:opacity-5 after:z-10 after:absolute after:w-full after:h-screen after:top-0 after:left-0 after:overflow-hidden"
      }`}
    >
      <Sidebar section="subject" />

      <div className="flex-1 relative">
        {/* go back button */}
        <div
          className="absolute left-5 top-5 transform rotate-180 hover:scale-105 hover:cursor-pointer"
          onClick={(e) => goBackToSubject(e)}
        >
          <AiOutlineLogout size={32} color="green" />
        </div>
        {/* header*/}
        <div className="w-full text-center my-4 pointer-events-none">
          <h1 className="text-3xl text-fuchsia-800 underline-offset-8 underline">
            {`${
              typeof props.name !== "undefined"
                ? `${props.name.toUpperCase()}'s TOPICS`
                : "Couldn't load the data!"
            }`}
          </h1>
        </div>

        {/* add subject button */}
        {!showAddTopic && (
          <div
            className="flex justify-end p-2 mr-2"
            onClick={(e) => toggleFormHandler(e)}
          >
            <NeonButton>
              <span className="flex">
                Add Topic
                <AiFillPlusCircle size={24} color="white" className="ml-2" />
              </span>
            </NeonButton>
          </div>
        )}

        {/* add subject */}
        {showAddTopic && (
          <div className="absolute top-1/4 left-1/3 transform -translate-x-1/3 -translate-y-1/4 w-1/2 opacity-100 z-50">
            <AddForm
              initForm={{
                title: "Add Topic",
                name: "new topic name here",
                setShowAddForm: setShowAddTopic,
                addOnClickHandler: addTopicHandler,
              }}
            />
          </div>
        )}

        <div className="w-full flex flex-col justify-center items-center space-y-6">
          {props?.isData ? (
            props?.message.map((topic, index) => (
              <div
                key={topic.name + index}
                className={`w-1/2 border border-pink-700 shadow-md p-2 rounded-md text-lg ${
                  !showDeleteDialog.state &&
                  "hover:cursor-pointer hover:scale-105 hover:text-slate-800 transition-all duration-1000"
                } `}
              >
                <div
                  className="w-full border-b border-slate-700 flex justify-between"
                  onClick={(e) => openTopicHandler(e, index)}
                >
                  <div className="flex space-x-4 items-center justify-center">
                    <span
                      ref={(el) => (topicRef.current[index] = el)}
                      // contentEditable={true}
                      className="active:outline-none active:border-b-rose-700"
                    >
                      {topic.name}
                    </span>
                    <div
                      className="hover:scale-125"
                      onClick={(e) => makeEditable(e, index, topic._id)}
                    >
                      <AiFillEdit size={24} color="blue" />
                    </div>
                  </div>

                  {!openTopic.state ||
                  (openTopic.state && openTopic.index !== index) ? (
                    <AiOutlineDownCircle size={24} className="text-slate-800" />
                  ) : (
                    <AiOutlineForward size={24} className="text-slate-800" />
                  )}
                </div>
                {openTopic.state && openTopic.index === index && (
                  <div className="border-black flex w-full justify-between my-2">
                    <div
                      onClick={(e) =>
                        gotoQuestionOfTopic(e, topic._id, topic.name)
                      }
                    >
                      <NeonButton
                        noColor={true}
                        textColor="blue"
                        isSmall={true}
                      >
                        View all Questions
                      </NeonButton>
                    </div>
                    <div
                      onClick={(e) =>
                        gotoContentOfTopic(e, topic._id, topic.name)
                      }
                    >
                      <NeonButton
                        noColor={true}
                        textColor="blue"
                        isSmall={true}
                      >
                        View Content
                      </NeonButton>
                    </div>
                    <div onClick={(e) => toggleDialogHandler(e)}>
                      <NeonButton noColor={true} textColor="red" isSmall={true}>
                        Delete this topic
                      </NeonButton>
                    </div>
                  </div>
                )}

                {/* confirm delete subject */}
                {showDeleteDialog.state && (
                  <div className="absolute top-1/4 left-1/3 transform -translate-x-1/3 -translate-y-1/4 w-1/2 opacity-100 z-50">
                    <DeleteDialog
                      initDialog={{
                        id: topic._id,
                        deleteName: topic.name,
                        deleteOnClickHandler: onDeleteTopicHandler,
                        setShowDeleteDialog: setShowDeleteDialog,
                      }}
                    />
                  </div>
                )}
              </div>
            ))
          ) : (
            <div>{props?.message}</div>
          )}
        </div>
      </div>

      {showMessage && (
        <Message message={resMsg.message} status={resMsg.status} />
      )}
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const { subId, chapId, name } = context.query;
  try {
    const alltopicsRes = await axios.post(process.env.GET_TOPICS_URL, {
      subId,
      chapId,
    });
    // console.log("allSubRes = ", alltopicsRes.data);
    return {
      props: {
        subId,
        chapId,
        name,
        isData: alltopicsRes.data.success || null,
        message: alltopicsRes.data.message.topics || null,
      },
    };
  } catch (error) {
    console.log(error.message);
    return {
      props: {
        isData: false || null,
        message: error?.message || "Error while retreiving the topics!" || null,
      },
    };
  }
};

export default Chapter;
