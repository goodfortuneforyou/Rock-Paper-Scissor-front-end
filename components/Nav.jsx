"use client";
import { useState } from "react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import {
  setCurrentAccount,
  publicValue,
} from "@/context/slices/viewFunctions/viewSlice";
import {
  counterValue,
  decrement,
  increment,
} from "../context/slices/counter/counterSlice";
import { shortenAddress } from "@/utils/shortenAddress";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const currentAccount = useSelector(
  //   (state) => state.viewFunctions.currentAccount
  // );
  const currentAccount = useSelector(
    (state) => state.viewFunctions.currentAccount
  );
  console.log(currentAccount, publicValue, counterValue);
  const dispatch = useDispatch();
  return (
    <nav className=" text-black flex justify-between items-center  w-full h-10 xs:h-8 bg-gray-[#90c9bf] xs:border-b-black border-b sm:border-b-red-500 md:border-b-green-600 border-b-white px-5">
      <div className=" font-bold xs:text-base xs:w-4/5 sm:text-lg sm:w-4/5 md:w-1/3">
        RPS: A Rock Paper Scissor Game
      </div>

      <div className="flex flex-initial flex-row h-full xs:w-1/5 sm:w-1/5  justify-end items-center">
        <div className="sm:hidden flex text-base">
          <div>Create a Game</div>
          <div>My Dashboard</div>
          <div>{currentAccount ? "DisConnect" : "Connect"}</div>
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
            <div className=" flex flex-col space-y-1 justify-center z-10 items-center fixed top-10  right-0 h-[200px] w-[250px] xs:top-8 xs:h-[170px] xs:w-[220px] xs:text-sm sm:text-base bg-cyan-200 rounded-lg text-black font-bold">
              <div>{shortenAddress(currentAccount)}</div>
              <div className=" hover:text-white hover:bg-cyan-600 px-2 rounded-lg cursor-pointer">
                {currentAccount ? "DisConnect" : "Connect"}
              </div>
              <div className=" hover:text-white hover:bg-cyan-600 px-2 rounded-lg cursor-pointer">
                Create a Game
              </div>
              <div className=" hover:text-white hover:bg-cyan-600 px-2 rounded-lg cursor-pointer">
                My Dashboard
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
