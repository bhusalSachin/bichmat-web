import { BsDot } from "react-icons/bs";
import NeonButton from "./Button";
import Card from "./Card";
import { PROMO_LANDING } from "@/constants";
import { AiFillAndroid } from "react-icons/ai";

const Introduction = () => {
  return (
    <div className="w-full h-full  mx-auto my-auto container flex flex-col space-y-24 items-center justify-center">
      {/* top part */}
      <div className="flex space-x-4 justify-between items-center">
        {/* left side, includes text onyl */}

        {/* read, practice, solve, repeat */}
        <div className="flex flex-col space-y-4">
          <div className="flex">
            <div className="flex items-center">
              <BsDot size={32} color="green" />
              <span className="text-xl">Learn</span>
            </div>
            <div className="flex items-center">
              <BsDot size={32} color="red" />
              <span className="text-xl ">Practise</span>
            </div>
            <div className="flex items-center">
              <BsDot size={32} color="green" />
              <span className="text-xl text-pink-600">Solve</span>
            </div>
            <div className="flex items-center">
              <BsDot size={32} color="red" />
              <span className="text-xl">Repeat</span>
            </div>
          </div>
          {/* Practice 10k+ Question on your phone */}
          <div className="flex flex-col space-y-5">
            <span className="text-6xl ">Practise</span>
            <span className="text-7xl text-pink-600 font-bold">
              10K+ Questions
            </span>
            <div className="text-6xl">
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
            <p className="font-italic text-lg">
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
        <div className="w-full">
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
      <div className="relative flex space-x-12 z-10 container mx-auto items-center justify-center after:w-full after:h-2 after:bg-green-600 after:absolute after:top-[50%] after:-z-10">
        {PROMO_LANDING.map((promo) => (
          <Card key={promo.text} text={promo.text} maintext={promo.maintext} />
        ))}
      </div>
    </div>
  );
};

export default Introduction;
