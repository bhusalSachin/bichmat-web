import { useState } from "react";
import NeonButton from "./Button";
import { AiFillCloseCircle } from "react-icons/ai";

const DeleteDialog = ({ initDialog }) => {
  const [error, setError] = useState(null);
  const [userText, setUserText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userText === `delete/${initDialog.deleteName}`) {
      if (typeof initDialog.id === "undefined") {
        initDialog.deleteOnClickHandler(setError);
      } else {
        initDialog.deleteOnClickHandler(setError, initDialog.id);
      }
    } else {
      setError(`Please re-type "delete/${initDialog.deleteName}"`);
    }
  };

  const onCloseHandler = (e) => {
    e.preventDefault();
    // e.stopPropagation();
    initDialog.setShowDeleteDialog({ state: false, action: "null" });
    document.body.classList.remove("overflow-hidden");
  };
  return (
    <form
      className="bg-white p-6 rounded-lg shadow-md"
      onSubmit={(e) => handleSubmit(e)}
    >
      <h2 className="text-xl font-medium mb-4 text-center text-pink-600 underline underline-offset-8">
        Delete Confirmation Dialog Box
      </h2>

      {/* close button */}
      <div
        className="absolute top-3 right-3 hover:cursor-pointer hover:scale-105"
        onClick={(e) => onCloseHandler(e)}
      >
        <AiFillCloseCircle size={32} color="red" />
      </div>
      <div className="mb-4">
        <label className="block text-red-700 font-medium mb-2">
          {`Please type "delete/${initDialog.deleteName}" for the confirmation!`}
        </label>
        <input
          className="border border-gray-400 p-2 rounded-lg w-full"
          type="text"
          value={userText}
          onChange={(e) => {
            //   console.log(newForm);
            setUserText(e.target.value);
          }}
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button className="bg-red-800 text-white p-2 rounded-lg hover:bg-green-500">
        Delete
      </button>
    </form>
  );
};

export default DeleteDialog;
