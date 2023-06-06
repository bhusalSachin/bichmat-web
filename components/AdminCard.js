import NeonButton from "./Button";
import {
  AiOutlineForward,
  AiOutlineDownCircle,
  AiFillEdit,
} from "react-icons/ai";
import EditForm from "./EditForm";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import DeleteDialog from "./DeleteConfirmation";
import AddForm from "./AddForm";
import Message from "./Message";
import { useRouter } from "next/router";

const AdminCard = ({ text, internalList, subId }) => {
  const [showEditSubject, setShowEditSubject] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState({
    action: "subject",
    state: false,
  });
  const [showAddChapter, setShowAddChapter] = useState(false);
  const [openChapter, setOpenChapter] = useState({ state: false, index: 0 });
  const [resMsg, setResMsg] = useState({ message: "", status: false });
  const [showMessage, setShowMessage] = useState(false);
  const topicRef = useRef([]);

  const router = useRouter();
  const editSubjectHandler = async (formData, setError) => {
    try {
      const editSubRes = await axios.post(process.env.EDIT_SUBJECT_URL, {
        subId,
        newSubject: formData,
      });
      if (editSubRes.data.success) {
        setShowEditSubject(false);
        window.location.reload();
      } else {
        setError(editSubRes.data.message);
      }
    } catch (error) {
      console.log(error?.message);
      setError(error?.message || "Error while updating subject! Please Retry");
    }
  };

  const toggleFormHandler = (e, action) => {
    e.preventDefault();

    if (action === "edit") {
      setShowEditSubject(true);
    }
    if (action === "add") {
      setShowAddChapter(true);
    }

    document.body.classList.add("overflow-hidden");
  };

  const toggleDialogHandler = (e, action) => {
    e.preventDefault();
    setShowDeleteDialog({ action, state: true });

    document.body.classList.add("overflow-hidden");
  };

  const onDeleteSubjectHandler = async (setError) => {
    try {
      const delSubRes = await axios.post(process.env.DELETE_SUBJECT_URL, {
        subId,
      });
      if (delSubRes.data.success) {
        setShowDeleteDialog({ state: false, action: "null" });
        window.location.reload();
      } else {
        setError(delSubRes.data.message);
      }
    } catch (error) {
      console.log(error?.message);
      setError(error?.message || "Error while deleting subject! Please Retry");
    }
  };

  const addChapterHandler = async (formData, setError) => {
    try {
      console.log("sending request to create a chapter, ", {
        subId,
        ...formData,
      });
      const addChapRes = await axios.post(process.env.ADD_CHAPTER_URL, {
        subId,
        name: formData.name,
      });
      if (addChapRes.data.success) {
        setShowAddChapter(false);
        window.location.reload();
      } else {
        setError(addChapRes.data.message);
      }
    } catch (error) {
      console.log(error);
      setError(error?.message || "Error while adding subject! Please Retry");
    }
  };

  const goToChapter = async (e, chapId, chapterName) => {
    e.preventDefault();

    router.push(
      `/admin/subject/chapter?name=${chapterName}&subId=${subId}&chapId=${chapId}`
    );
  };

  const openChapterHandler = (e, idx) => {
    e.preventDefault();

    setOpenChapter((prev) => {
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

  const onDeleteChapterHandler = async (setError, chapId) => {
    try {
      // console.log("sending request to ", process.env.DELETE_CHAPTER_URL);
      const delChapRes = await axios.post(process.env.DELETE_CHAPTER_URL, {
        subId,
        chapId,
      });
      if (delChapRes.data.success) {
        setShowDeleteDialog({ state: false, action: "null" });
        window.location.reload();
      } else {
        setError(delChapRes.data.message);
      }
    } catch (error) {
      console.log(error?.message);
      setError(error?.message || "Error while deleting chapter! Please Retry");
    }
  };

  const makeEditable = (e, index, chapId) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("makeeditable = ", chapId);
    const element = topicRef.current[index];

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
      handleEditableKeyDown(event, chapId)
    );
  };

  const handleEditableKeyDown = async (e, chapId) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const element = e.target;
      const index = Array.from(topicRef.current).findIndex(
        (el) => el === element
      );

      element.blur();
      element.contentEditable = false; // Disable editing

      element.removeEventListener("keydown", handleEditableKeyDown);

      try {
        const editChapRes = await axios.post(process.env.EDIT_CHAPTER_URL, {
          subId,
          chapId,
          newChapter: { name: element.innerText.trim() },
        });
        if (editChapRes.data.success) {
          // setShowEditSubject(false);
          window.location.reload();
          setResMsg({
            message: editChapRes.data.message,
            status: true,
          });
        } else {
          element.innerText = initialValue;
          setResMsg({
            message: editChapRes.data.message,
            status: false,
          });
        }
      } catch (error) {
        console.log(error?.message);
        setResMsg({
          message:
            error?.message || "Error while updating chapter! Please Retry",
          status: false,
        });
      }
    }
  };

  useEffect(() => {
    if (showEditSubject || showDeleteDialog.state || showAddChapter) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [showEditSubject, showDeleteDialog, showAddChapter]);

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
    <div className="w-1/2 border flex flex-col items-center justify-between p-4 my-4 shadow-lg bg-slate-200 rounded-lg">
      <span className="text-2xl text-teal-800 underline underline-offset-8">
        {text}
      </span>

      {/* add chapter */}
      {showAddChapter && (
        <div className="absolute top-1/4 left-1/3 transform -translate-x-1/3 -translate-y-1/4 w-1/2 opacity-100 z-50">
          <AddForm
            initForm={{
              title: `Add Chapter To ${text}`,
              name: "new chapter name here",
              setShowAddForm: setShowAddChapter,
              addOnClickHandler: addChapterHandler,
            }}
          />
        </div>
      )}

      {/* edit subject */}
      {showEditSubject && (
        <div className="absolute top-1/4 left-1/3 transform -translate-x-1/3 -translate-y-1/4 w-1/2 opacity-100 z-50">
          <EditForm
            initForm={{
              title: "Edit Subject",
              name: text,
              setShowEditForm: setShowEditSubject,
              editOnClickHandler: editSubjectHandler,
            }}
          />
        </div>
      )}

      {/* confirm delete subject */}
      {showDeleteDialog.state && showDeleteDialog.action === "subject" && (
        <div className="absolute top-1/4 left-1/3 transform -translate-x-1/3 -translate-y-1/4 w-1/2 opacity-100 z-50">
          <DeleteDialog
            initDialog={{
              deleteName: text,
              deleteOnClickHandler: onDeleteSubjectHandler,
              setShowDeleteDialog: setShowDeleteDialog,
            }}
          />
        </div>
      )}

      <div className="flex flex-col space-y-2 w-full items-center justify-center p-2 my-4">
        {internalList.map((chapter, index) => (
          <div
            key={chapter.name + index}
            className={`w-3/4 border-2 border-green-900 p-1 rounded-md ${
              !showDeleteDialog.state &&
              showDeleteDialog.action !== "chapter" &&
              "hover:cursor-pointer hover:scale-105 transition-all duration-700"
            } `}
          >
            <div
              className="flex justify-between items-center "
              onClick={(e) => openChapterHandler(e, index)}
            >
              <div className="flex space-x-4 items-center justify-center">
                <span
                  ref={(el) => (topicRef.current[index] = el)}
                  // contentEditable={true}
                  className="active:outline-none active:border-b-rose-700"
                >
                  {chapter.name}
                </span>
                <div
                  className="hover:scale-125"
                  onClick={(e) => makeEditable(e, index, chapter._id)}
                >
                  <AiFillEdit size={24} color="blue" />
                </div>
              </div>
              {!openChapter.state ||
              (openChapter.state && openChapter.index !== index) ? (
                <AiOutlineDownCircle size={24} className="text-slate-800" />
              ) : (
                <AiOutlineForward size={24} className="text-slate-800" />
              )}
            </div>
            {openChapter.state && openChapter.index === index && (
              <div className="border-black flex w-full justify-between my-2">
                <div onClick={(e) => goToChapter(e, chapter._id, chapter.name)}>
                  <NeonButton noColor={true} textColor="blue" isSmall={true}>
                    View all Topics
                  </NeonButton>
                </div>
                <div onClick={(e) => toggleDialogHandler(e, "chapter")}>
                  <NeonButton noColor={true} textColor="red" isSmall={true}>
                    Delete this chapter
                  </NeonButton>
                </div>
              </div>
            )}

            {/* confirm chapter subject */}
            {showDeleteDialog.state &&
              showDeleteDialog.action === "chapter" && (
                <div className="absolute top-1/4 left-1/3 transform -translate-x-1/3 -translate-y-1/4 w-1/2 opacity-100 z-50">
                  <DeleteDialog
                    initDialog={{
                      deleteName: chapter.name,
                      id: chapter._id,
                      deleteOnClickHandler: onDeleteChapterHandler,
                      setShowDeleteDialog: setShowDeleteDialog,
                    }}
                  />
                </div>
              )}
          </div>
        ))}
      </div>
      <div className="w-3/4 flex justify-between items-center">
        <div onClick={(e) => toggleFormHandler(e, "edit")}>
          <NeonButton noColor={true} textColor="blue" isSmall={true}>
            Edit Subject
          </NeonButton>
        </div>
        <div onClick={(e) => toggleFormHandler(e, "add")}>
          <NeonButton noColor={true} textColor="gray" isSmall={true}>
            Add Chapter
          </NeonButton>
        </div>
        <div onClick={(e) => toggleDialogHandler(e, "subject")}>
          <NeonButton noColor={true} textColor="red" isSmall={true}>
            Delete Subject
          </NeonButton>
        </div>
      </div>
      {showMessage && (
        <Message message={resMsg.message} status={resMsg.status} />
      )}
    </div>
  );
};

export default AdminCard;
