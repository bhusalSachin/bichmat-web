import { useState } from "react";
import NeonButton from "./Button";
import { AiFillCloseCircle } from "react-icons/ai";

const AddForm = ({ initForm }) => {
  const [error, setError] = useState(null);
  const { title, setShowAddForm, addOnClickHandler, ...formData } = initForm;
  const [newForm, setNewForm] = useState(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();

    addOnClickHandler(newForm, setError);
  };

  const onCloseHandler = (e) => {
    e.preventDefault();
    initForm.setShowAddForm(false);
    document.body.classList.remove("overflow-hidden");
  };
  return (
    <form
      className="bg-white p-6 rounded-lg shadow-md"
      onSubmit={(e) => handleSubmit(e)}
    >
      <h2 className="text-xl font-medium mb-4 text-center text-pink-600 underline underline-offset-8">
        {initForm.title}
      </h2>

      {/* close button */}
      <div
        className="absolute top-3 right-3 hover:cursor-pointer hover:scale-105"
        onClick={(e) => onCloseHandler(e)}
      >
        <AiFillCloseCircle size={32} color="red" />
      </div>

      {Object.entries(initForm).map(([key, value]) => {
        // console.log(key, value, typeof value);
        if (
          key !== "title" &&
          typeof value !== "function" &&
          typeof value !== "object"
        ) {
          return (
            <div className="mb-4" key={key}>
              <label className="block text-gray-700 font-medium mb-2">
                {key.toUpperCase()}
              </label>
              <input
                className="border border-gray-400 p-2 rounded-lg w-full"
                type="text"
                value={newForm[key]}
                onChange={(e) => {
                  // console.log(newForm);
                  setNewForm((prev) => {
                    return { ...prev, [key]: e.target.value };
                  });
                }}
              />
            </div>
          );
        }
      })}
      {error && <p className="text-red-500">{error}</p>}
      <button className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-500">
        Add
      </button>
    </form>
  );
};

export default AddForm;
