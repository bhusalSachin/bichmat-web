import AddOption from "@/components/AddOption";
import { useRouter } from "next/router";
import { AiOutlineLogout } from "react-icons/ai";

const OptionAddOfQue = (props) => {
  const { subId, chapId, topicId, queId } = props;
  const router = useRouter();
  return (
    <>
      {/* go back button */}
      <div
        className="absolute left-5 top-5 transform rotate-180 hover:scale-105 hover:cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          router.back();
        }}
      >
        <AiOutlineLogout size={32} color="green" />
      </div>
      <h2 className="text-xl text-center text-slate-800 p-2 m-4">
        Add New Option
      </h2>
      <AddOption
        addprops={{ subId, chapId, topicId }}
        showAddOption={{ id: queId, stattus: false }}
      />
    </>
  );
};

export default OptionAddOfQue;

export const getServerSideProps = (context) => {
  const { subId, chapId, topicId, queId } = context.query;
  if (
    typeof subId === "undefined" ||
    !subId ||
    typeof chapId === "undefined" ||
    !chapId ||
    typeof topicId === "undefined" ||
    !topicId ||
    typeof queId === "undefined" ||
    !queId
  ) {
    return {
      redirect: {
        destination: "/sorry",
        permanent: false,
      },
    };
  }

  return {
    props: {
      subId,
      chapId,
      topicId,
      queId,
    },
  };
};
