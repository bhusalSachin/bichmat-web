import NeonButton from "@/components/Button";
import Sidebar from "@/components/Sidebar";
import { SUBJECT_LIST } from "@/constants";
import { AiFillPlusCircle } from "react-icons/ai";
import AdminCard from "@/components/AdminCard";
import { useEffect, useState } from "react";
import AddForm from "@/components/AddForm";
import axios from "axios";

const Subject = (props) => {
  const [showAddSubject, setShowAddSubject] = useState(false);

  const toggleFormHandler = (e) => {
    e.preventDefault();

    setShowAddSubject(true);
    document.body.classList.add("overflow-hidden");
  };

  const addSubjectHandler = async (formData, setError) => {
    try {
      const addSubRes = await axios.post(
        process.env.CREATE_SUBJECT_URL,
        formData
      );
      if (addSubRes.data.success) {
        setShowAddSubject(false);
        window.location.reload();
      } else {
        setError(addSubRes.data.message);
      }
    } catch (error) {
      console.log(error?.message);
      setError(error?.message || "Error while adding subject! Please Retry");
    }
  };

  return (
    <div
      className={`flex bg-slate-300 min-h-screen ${
        showAddSubject &&
        "after:opacity-5 after:z-10 after:absolute after:w-full after:h-screen after:top-0 after:left-0 after:overflow-hidden"
      }`}
    >
      <Sidebar section="subject" />

      <div className="flex-1 relative">
        {/* header*/}
        <div className="w-full text-center my-4 pointer-events-none">
          <h1 className="text-3xl text-fuchsia-800 underline-offset-8 underline">
            SUBJECTS
          </h1>
        </div>

        {/* add subject button */}
        {!showAddSubject && (
          <div
            className="flex justify-end p-2 mr-2"
            onClick={(e) => toggleFormHandler(e)}
          >
            <NeonButton>
              <span className="flex">
                Add Subject
                <AiFillPlusCircle size={24} color="white" className="ml-2" />
              </span>
            </NeonButton>
          </div>
        )}

        {/* add subject */}
        {showAddSubject && (
          <div className="absolute top-1/4 left-1/3 transform -translate-x-1/3 -translate-y-1/4 w-1/2 opacity-100 z-50">
            <AddForm
              initForm={{
                title: "Add Subject",
                name: "new subject name here",
                setShowAddForm: setShowAddSubject,
                addOnClickHandler: addSubjectHandler,
              }}
            />
          </div>
        )}

        <div className="w-full flex flex-col justify-center items-center space-y-6">
          {props?.isData ? (
            props?.message.map((subject, index) => (
              <AdminCard
                key={subject.name + index}
                text={subject.name}
                internalList={subject.chapters}
                subId={subject._id}
              />
            ))
          ) : (
            <div>{props.message}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  try {
    const allSubjsRes = await axios.post(process.env.GET_SUBJECTS_URL, {});
    // console.log("allSubRes = ", allSubjsRes.data);
    return {
      props: {
        isData: allSubjsRes.data.success || null,
        message: allSubjsRes.data.message.subjects || null,
      },
    };
  } catch (error) {
    console.log(error.message);
    return {
      props: {
        isData: false || null,
        message:
          error?.message || "Error while retreiving the subjects!" || null,
      },
    };
  }
};

export default Subject;
