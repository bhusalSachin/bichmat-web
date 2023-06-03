import NeonButton from "./Button";
import { AiOutlineFastForward } from "react-icons/ai";

const AdminCard = ({ text, internalList }) => {
  return (
    <div className="w-1/2 border flex flex-col items-center justify-between p-4 my-4 shadow-lg bg-slate-200 rounded-lg">
      <span className="text-2xl text-teal-800 underline underline-offset-8">
        {text}
      </span>

      <div className="flex flex-col space-y-2 w-full items-center justify-center p-2 my-4">
        {internalList.map((chapter, index) => (
          <div
            key={chapter.name + index}
            className="flex justify-between items-center w-3/4 border-2 border-green-900 p-1 rounded-md hover:cursor-pointer hover:scale-105 transition-all duration-700"
          >
            <span className="text-md ">{chapter.name}</span>
            <AiOutlineFastForward size={24} color="green" />
          </div>
        ))}
      </div>
      <div className="w-3/4 flex justify-between items-center">
        <NeonButton noColor={true} textColor="blue" isSmall={true}>
          Edit Subject
        </NeonButton>
        <NeonButton noColor={true} textColor="red" isSmall={true}>
          Delete Subject
        </NeonButton>
      </div>
    </div>
  );
};

export default AdminCard;
