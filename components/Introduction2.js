import { BsDot } from "react-icons/bs";
import NeonButton from "./Button";
import { AiFillAndroid } from "react-icons/ai";
import Footer from "./Footer";

const Introduction2 = () => {
  return (
    <div className="w-full h-full flex space-x-12 mx-auto my-auto container items-center relative">
      {/* left side */}
      {/* includes cool picture */}
      <div className="w-full">
        <div className="w-full h-[150%]">
          <img
            className="w-full h-full object-cover"
            src="/images/online_test.svg"
            alt="loading.."
          />
        </div>
      </div>

      {/* roght side, includes text onyl */}

      {/* Practice makes us perfect */}
      <div className="flex flex-col space-y-4 font-sans">
        <div className="flex items-center">
          <BsDot size={32} color="red" />
          <span className="text-xl">Practice Makes Us Perfect</span>
        </div>

        {/* Live Classes, Progress Report, Competitive Learning all in one */}
        <div className="flex flex-col space-y-5 font-sans">
          <span className="text-6xl ">Live Classes</span>
          <span className="text-7xl text-pink-600 font-bold">
            Competitive Learning
          </span>
          <span className="text-6xl">Progress Report </span>
          <span className="text-pink-600 text-6xl">All in One</span>

          <div className="w-1/2">
            <NeonButton>
              <span className="flex">
                Bichmat App
                <AiFillAndroid size={24} color="white" />
              </span>
            </NeonButton>
          </div>
        </div>
        {/* introductory text */}
        <div className="p-2 font-sans text-lg">
          {/* <p>
            At Bichmat, we are committed to revolutionizing the way medical
            aspirants prepare for their entrance exams. Our comprehensive
            platform combines live classes, personalized progress tracking, and
            competitive practice sets to ensure your success.
          </p> */}
          <p>
            With our live classes, you can learn directly from expert
            instructors who have years of experience in the medical field.
            Engage in interactive sessions, ask questions, and gain in-depth
            knowledge that will help you excel in your exams.
          </p>
          <p>
            Track your learning progress with our intuitive progress graph.
            Visualize your strengths and areas for improvement, allowing you to
            focus on specific topics and optimize your study plan.
          </p>
          <p>
            In addition, we provide a wide range of competitive practice sets
            designed to simulate real exam scenarios. Practice with diverse
            question types, time constraints, and difficulty levels, preparing
            yourself to confidently tackle the entrance exams.
          </p>
          <p>
            Join thousands of successful medical professionals who have trusted
            Bichmat to guide them on their journey. Let us help you crack your
            entrance exams and achieve your dream of becoming a healthcare
            leader.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Introduction2;
