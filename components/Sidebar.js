import React, { useState } from "react";
import { ADMIN_SIDEBAR_MENU } from "@/constants";
import { MdMenu } from "react-icons/md";
import { useRouter } from "next/router";

const Sidebar = ({ section }) => {
  const [toggle, setToggle] = useState(true);
  const [active, setActive] = useState(section);

  const router = useRouter();

  const toggleSidebar = (e) => {
    e.preventDefault();

    setToggle((prev) => !prev);
  };

  const navigateToSection = (e, tabtext) => {
    e.preventDefault();

    // setActive(tabtext);

    const concatUrlString = tabtext === "Home" ? "" : tabtext.toLowerCase();

    router.push(`/admin/${concatUrlString}`);
  };

  return (
    <div
      className={`${
        !toggle ? "w-fit" : "w-1/5"
      } bg-slate-900 rounded-r-lg transition-all duration-1000`}
    >
      <div className="p-2" onClick={(e) => toggleSidebar(e)}>
        <MdMenu size={32} color="white" className="hover:cursor-pointer" />
      </div>
      <ul
        className={`${
          toggle ? "flex" : "hidden"
        } flex-col space-y-4 items-center justify-center`}
      >
        <div className="overflow-hidden rounded-full w-[8em] h-[8em]">
          <img
            src="/images/logo.png"
            alt="Couldn't load!"
            className="w-full h-full object-cover rounded-full scale-150"
          />
        </div>
        {ADMIN_SIDEBAR_MENU.map((tabtext) => (
          <li
            key={tabtext}
            className="text-white text-xl hover:underline hover:cursor-pointer w-3/4 p-1 rounded-md bg-gradient-to-r from-green-800 to-pink-800 flex justify-center space-x-4 items-center"
            onClick={(e) => navigateToSection(e, tabtext)}
          >
            <span
              className={`${
                section === tabtext.toLowerCase() ? "underline" : null
              }`}
            >
              {tabtext}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
