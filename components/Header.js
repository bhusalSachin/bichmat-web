import Link from "next/link";
import NeonButton from "./Button";
import { MdAndroid } from "react-icons/md";
import { AiFillAndroid } from "react-icons/ai";

const Header = () => {
  return (
    <>
      <header
        className={`px-2 sm:px-0 sm:py-4 w-full sm:border-b border-b-red-200 sm:shadow-lg rounded-b-lg transition-top duration-200 ease-in-out`}
      >
        <nav className="container mx-auto flex justify-between items-center">
          <Link href="/" className="font-bold text-xl">
            BICHMAT
          </Link>
          <ul className="hidden sm:flex sm:space-x-6 md:space-x-24 items-center">
            <li>
              <Link
                href="/about"
                className="sm:text-lg md:text-xl hover:text-red-400"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="sm:text-lg md:text-xl hover:text-red-400"
              >
                Contact
              </Link>
            </li>
            <li>
              <NeonButton>
                <span className="flex">
                  Get App
                  <AiFillAndroid size={24} color="white" />
                </span>
              </NeonButton>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
