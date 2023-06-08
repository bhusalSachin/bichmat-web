import RichText from "@/components/RichText";
import axios from "axios";

const QuestionsHome = () => {
  return (
    <div>
      <span>All the questions@!</span>
      <div>
        <RichText />
      </div>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const { subId, chapId, topicId } = context.query;
  try {
    const allQueRes = await axios.post(process.env.GET_TOPICS_URL, {
      subId,
      chapId,
    });
    // console.log("allSubRes = ", allQueRes.data);
    return {
      props: {
        subId,
        chapId,
        isData: allQueRes.data.success || null,
        questions: allQueRes.data.message.topics || null,
      },
    };
  } catch (error) {
    console.log(error.message);
    return {
      props: {
        isData: false || null,
        message: error?.message || "Error while retreiving questions!" || null,
      },
    };
  }
};

export default QuestionsHome;