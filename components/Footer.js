import { BsFacebook, BsInstagram, BsTwitter, BsDiscord } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="w-full h-[15em] 2xl:h-[25em] bg-green-900 py-2 px-3 sm:px-0 sm:py-4">
      <div className="container h-full mx-auto flex flex-col space-y-4 sm:space-y-8 text-white relative mt-4">
        <span className="text-md sm:text-lg">
          BICHMAT | Revolutionizing The Way You Learn.
        </span>
        <div className="flex space-x-8">
          <span className="underline hover:cursor-pointer">About Us</span>
          <span className="underline hover:cursor-pointer">
            Download Our Application
          </span>
        </div>
        <div className="flex space-x-8">
          <BsFacebook
            size={24}
            color="white"
            className="hover:cursor-pointer"
          />
          <BsInstagram
            size={24}
            color="white"
            className="hover:cursor-pointer"
          />
          <BsTwitter size={24} color="white" className="hover:cursor-pointer" />
          <BsDiscord size={24} color="white" className="hover:cursor-pointer" />
        </div>
        <span className="text-white font-bold absolute bottom-4">
          &copy; 2023 BichMat. All rights reserved.
        </span>
      </div>
    </div>
  );
};

export default Footer;
