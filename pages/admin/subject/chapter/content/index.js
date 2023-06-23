import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useRouter } from "next/router";
import NeonButton from "@/components/Button";
import { AiOutlineLogout, AiFillPlusCircle } from "react-icons/ai";
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import Message from "@/components/Message";

const QuillNoSSRWrapper = dynamic(() => import("react-quill"), {
  ssr: false,
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

const ViewContent = (props) => {
  const router = useRouter();
  const { content, message, subId, chapId, topicId } = props;
  const [cont, setCont] = useState({
    content: "",
    imgurl: null,
    videourl: null,
  });
  const [showMessage, setShowMessage] = useState({
    isShow: false,
    status: false,
    message: "",
  });
  const [isEditing, setIsEditing] = useState(false);

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
        setIsEditing(true);
        // Handle successful uploads on complete
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // console.log("File available at", downloadURL);
          setCont((prev) => {
            return { ...prev, imgurl: downloadURL };
          });
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
        setIsEditing(true);
        setCont((prev) => {
          return { ...prev, imgurl: null };
        });
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

  const onSubmitContentHandler = async () => {
    const apiurl =
      !content || typeof content === "undefined"
        ? process.env.ADD_CONTENT_URL
        : process.env.EDIT_CONTENT_URL;
    try {
      const subConRes = await axios.post(apiurl, {
        subId,
        chapId,
        topicId,
        newContent: cont,
      });

      if (subConRes.data.success) {
        window.location.reload();
      } else {
        console.log(
          subConRes.data.message ||
            "Error while adding new content. Please retry!"
        );
        setShowMessage((prev) => {
          return {
            ...prev,
            status: false,
            message:
              subConRes.data.message ||
              "Error while adding new content. Please retry!",
            isShow: true,
          };
        });
      }
    } catch (error) {
      console.log(
        error?.message || "Error while adding new content. Please retry!"
      );
      setShowMessage((prev) => {
        return {
          ...prev,
          status: false,
          message:
            error?.message || "Error while adding new content. Please retry!",
          isShow: true,
        };
      });
    }
  };

  useEffect(() => {
    console.log("content = ", content);
    if (content) {
      setCont((prev) => {
        return {
          ...prev,
          content: content.content,
          imgurl: content.imgurl,
          videourl: content.videourl,
        };
      });
    }
  }, [content]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage((prev) => {
        return { ...prev, isShow: false };
      });
    }, 4000);

    return () => clearTimeout(timer);
  }, [showMessage.message]);

  return (
    <div className="relative">
      <div
        className="absolute left-5 top-5 transform rotate-180 hover:scale-105 hover:cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          router.back();
        }}
      >
        <AiOutlineLogout size={32} color="green" />
      </div>
      <h2 className="text-2xl text-pink-900 p-2 m-4 font-bold text-center underline underline-offset-8">
        {`${props.topic}'s Uploaded Contents` || "Content"}
      </h2>
      <div className="p-2">
        {typeof window !== "undefined" && (
          <QuillNoSSRWrapper
            value={cont.content}
            onChange={(value) => {
              setIsEditing(true);
              setCont((prev) => {
                return { ...prev, content: value };
              });
            }}
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
            placeholder="Type written content here.."
          />
        )}

        <input
          type="text"
          value={cont.videourl || ""}
          onChange={(e) => {
            setIsEditing(true);
            setCont((prev) => ({ ...prev, videourl: e.target.value }));
          }}
          placeholder="Paste youtube video url"
          className="w-full border my-4 p-2 text-md rounded-md"
        />
        <input
          id="imageContent"
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(e, "content")}
          placeholder="upload"
        />
        {cont.imgurl !== null && (
          <button
            className="p-1 border border-white bg-red-900 text-white rounded-md"
            onClick={(e) =>
              removeImage(e, cont.imgurl, "imageContent", "content")
            }
          >
            Remove Image
          </button>
        )}
        {cont.imgurl !== null && (
          <img
            src={cont.imgurl}
            alt="Sorry!"
            className="w-[200px] h-[200px] object-contain "
          />
        )}
      </div>
      {isEditing && (
        <div className="p-2 my-4" onClick={(e) => onSubmitContentHandler(e)}>
          <NeonButton noColor={true} textColor="pink">
            Submit New Content
          </NeonButton>
        </div>
      )}
      {showMessage.isShow && (
        <Message message={showMessage.message} status={showMessage.status} />
      )}
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const { subId, chapId, topicId, topic } = context.query;

  try {
    const conRes = await axios.post(process.env.GET_CONTENT_URL, {
      subId,
      chapId,
      topicId,
    });
    // console.log("conRes = ", conRes.data);
    if (conRes.data.success) {
      return {
        props: {
          content: conRes.data.message || null,
          subId,
          chapId,
          topicId,
          topic,
        },
      };
    } else {
      return {
        props: {
          mesage:
            conRes.data.message || "Error while fetching content." || null,
          subId,
          chapId,
          topicId,
          topic,
        },
      };
    }
  } catch (error) {
    return {
      props: {
        mesage: error?.message || "Error while fetching content." || null,
        subId,
        chapId,
        topicId,
        topic,
      },
    };
  }
};

export default ViewContent;
