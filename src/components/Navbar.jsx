import React from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";

import logo from "../../images/DriverLogo1.png";

const NavBarItem = ({ title, classprops }) => (
  <li className={`mx-4 cursor-pointer ${classprops}`}>{title}</li>
);

const Navbar = ({ user, setLogin, setUser, setIsAdmin }) => {
  const [toggleMenu, setToggleMenu] = React.useState(false);

  const onClick = () => {
    setLogin(false);
    setIsAdmin(false);
    setUser("");
  }

  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <img src={logo} alt="logo" className="w-32 cursor-pointer" />
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {["Truffle", "Ganache", "React JS", "About"].map((item, index) => (
          <NavBarItem key={item + index} title={item} />
        ))}
        <div className="flex items-center justify-end w-40">
          <FaUserCircle fontSize={28}/>
          <span className=" py-2 mx-2 cursor-pointer underline ">
            {user}
          </span>
        </div>
        <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]" onClick={onClick}>
          Logout
        </li>

      </ul>
        <div className="flex items-center justify-end not-hidden text-white ml-28">
          <FaUserCircle  className="not-hidden"/>
          <span className=" py-2 mx-2 cursor-pointer underline not-hidden small">
            {user}
          </span>
        </div>
        <span className="bg-[#2952e3] py-1 px-4 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd] not-hidden small" onClick={onClick}>
          Logout
        </span>
      <div className="flex relative">
        {!toggleMenu && (
          <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />
        )}
        {toggleMenu && (
          <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} />
        )}
        {toggleMenu && (
          <ul
            className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
          >
            <li className="text-xl w-full my-2"><AiOutlineClose onClick={() => setToggleMenu(false)} /></li>
            {["Market", "Exchange", "Tutorials", "Wallets"].map(
              (item, index) => <NavBarItem key={item + index} title={item} classprops="my-2 text-lg" />,
            )}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
