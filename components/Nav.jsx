"use client";
import { useState } from "react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentAccount } from "@/context/slices/viewFunctions/viewSlice";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const currentAccount = useSelector(
    (state) => state.viewFunctions.currentAccount
  );
  console.log(currentAccount);
  const dispatch = useDispatch();
  return (
    <nav className=" text-white flex justify-between items-center  w-full h-10 xs:h-20 bg-gray-[#90c9bf] xs:border-black border-b border-b-white px-5">
      <div>RPS: A Rock Paper Scissor Game</div>

      <div className="flex flex-initial flex-row h-full justify-end items-center">
        <div className="sm:hidden flex">
          {currentAccount ? "DisConnect" : "Connect"}
        </div>
        <div className="hidden  sm:flex flex-col justify-center items-center">
          {isOpen ? (
            <Image
              src="/cross.png"
              objectFit="contain"
              width={20}
              height={20}
              alt="menu"
              onClick={() => setIsOpen(false)}
            />
          ) : (
            <Image
              src="/menu.png"
              objectFit="contain"
              width={20}
              height={20}
              alt="menu"
              onClick={() => setIsOpen(true)}
            />
          )}
          {isOpen && (
            <div className=" flex justify-center z-10 items-center fixed top-10 right-0 h-[200px] w-[250px] bg-green-500">
              <div>connect</div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
