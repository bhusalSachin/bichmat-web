import { BsDot } from "react-icons/bs";
import NeonButton from "./Button";
import Card from "./Card";
import { PROMO_LANDING } from "@/constants";
import { AiFillAndroid } from "react-icons/ai";

const Introduction = () => {
  return (
    <div className="w-full h-full mx-auto my-auto container flex flex-col space-y-8 md:space-y-24 items-center justify-center">
      {/* top part */}
      <div className="flex flex-col xl:flex-row space-y-4 xl:space-y-0 2xl:space-x-4 justify-between items-center p-2 2xl:p-0">
        {/* left side, includes text onyl */}

        {/* read, practice, solve, repeat */}
        <div className="flex flex-col space-y-4">
          <div className="flex">
            <div className="flex items-center">
              <BsDot size={32} color="green" />
              <span className="text-md sm:text-lg md:text-xl">Learn</span>
            </div>
            <div className="flex items-center">
              <BsDot size={32} color="red" />
              <span className="text-md sm:text-lg md:text-xl ">Practise</span>
            </div>
            <div className="flex items-center">
              <BsDot size={32} color="green" />
              <span className="text-md sm:text-lg md:text-xl text-pink-600">
                Solve
              </span>
            </div>
            <div className="flex items-center">
              <BsDot size={32} color="red" />
              <span className="text-md sm:text-lg md:text-xl">Repeat</span>
            </div>
          </div>
          {/* Practice 10k+ Question on your phone */}
          <div className="flex flex-col space-y-2 sm:space-y-5">
            <span className="text-4xl sm:text-5xl md:text-6xl ">Practise</span>
            <span className="text-5xl sm:text-6xl md:text-7xl text-pink-600 font-bold">
              10K+ Questions
            </span>
            <div className="text-4xl sm:text-5xl md:text-6xl">
              <span>On Your </span>
              <span className="text-pink-600 ">Phone</span>
            </div>
            <div className="w-1/2">
              <NeonButton>
                <span className="flex">
                  Get Our App Now
                  <AiFillAndroid size={24} color="white" />
                </span>
              </NeonButton>
            </div>
          </div>
          {/* introductory text */}
          <div className="p-2">
            <p className="font-italic text-md sm:text-lg font-sans">
              Welcome to Bichmat, where we provide free and paid practice
              questions tailored for medical aspirants in Nepal. Our
              comprehensive collection of practice questions is designed to help
              you excel in your medical journey. Boost your knowledge, sharpen
              your skills, and achieve excellence with Bichmat. Join us today
              and unlock your potential for success in the medical field.
            </p>
          </div>
        </div>

        {/* right side */}
        {/* includes cool picture */}
        <div className="w-full hidden xl:flex">
          <div className="w-[120%] h-[150%]">
            <img
              className="w-full h-full object-cover"
              src="/images/processing_thoughts.svg"
              alt="loading.."
            />
          </div>
        </div>
      </div>

      {/* bottom part */}
      {/* promo cards */}
      <div className="relative flex flex-wrap lg:flex-nowrap space-x-8 sm:space-x-12 space-y-2 z-10 container mx-auto items-center justify-center sm:after:py-1 md:after:py-0 sm:after:w-full sm:after:container sm:after:h-2 sm:after:bg-green-600 sm:after:absolute sm:after:top-[50%] sm:after:-z-10">
        {PROMO_LANDING.map((promo) => (
          <Card key={promo.text} text={promo.text} maintext={promo.maintext} />
        ))}
      </div>
    </div>
  );
};

export default Introduction;
