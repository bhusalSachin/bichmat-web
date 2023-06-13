import axios from "axios";
import Message from "./Message";
import { useState, useEffect } from "react";
import NeonButton from "./Button";
import { useRouter } from "next/router";

const Solution = ({ solution }) => {
  const router = useRouter();
  const [showMessage, setShowMessage] = useState({
    isShow: false,
    status: false,
    message: "",
  });
  const onDeleteSolutionHandler = async (e) => {
    e.preventDefault();

    try {
      const delSolRes = await axios.post(process.env.DEL_SOL_URL, {
        queId: solution.id,
      });

      if (delSolRes.data.success) {
        window.location.reload();
      } else {
        console.log("error while deleting solution");
        setShowMessage((prev) => {
          return {
            ...prev,
            status: false,
            message: delSolRes.data.message,
            isShow: true,
          };
        });
      }
    } catch (error) {
      console.log(error?.message);
      setShowMessage((prev) => {
        return {
          ...prev,
          status: false,
          message: error?.message || "Error while fetching the solution",
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
  });

  return (
    <div className="w-full bg-white p-2 rounded-md shadow-md border border-amber-950">
      <h3 className="text-xl font-bold text-teal-900 underline underline-offset-4 ">
        Solution
      </h3>
      {/* <div className=" text-slate-800">{solution.solution}</div> */}
      <div
        className="m-4"
        dangerouslySetInnerHTML={{ __html: solution.solution }}
      ></div>
      {solution.imgurl !== null && (
        <img
          src={solution.imgurl}
          alt="sorry!"
          className="w-[200px] h-[200px] object-contain m-4"
        />
      )}

      <div className="w-full flex justify-between items-center">
        <div onClick={(e) => onDeleteSolutionHandler(e)}>
          <NeonButton noColor={true} isSmall={true} textColor="red">
            Delete Solution
          </NeonButton>
        </div>
        <div
          onClick={(e) => {
            e.preventDefault();

            router.push(
              {
                pathname: "/admin/subject/chapter/question/editsolution",
                query: {
                  queId: solution.id,
                  solution: JSON.stringify({
                    solution: solution.solution,
                    imgurl: solution.imgurl,
                  }),
                },
              },
              undefined,
              { shallow: true }
            );
          }}
        >
          <NeonButton noColor={true} isSmall={true} textColor="gray">
            Edit Solution
          </NeonButton>
        </div>
      </div>

      {showMessage.isShow && (
        <Message message={showMessage.message} status={showMessage.status} />
      )}
    </div>
  );
};

export default Solution;
