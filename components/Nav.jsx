"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { viewFunctions } from "@/context/blockchain/viewFunctions";
import { shortenAddress } from "@/utils/shortenAddress";
const Navbar = () => {
  const { connectWallet, currentAccount, checkIfWalletIsConnected } =
    viewFunctions();
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <nav className=" text-black flex justify-between items-center  w-full h-10 xs:h-8 bg-gray-[#90c9bf] xs:border-b-black border-b sm:border-b-red-500 md:border-b-green-600 xm:border-b-blue-600 lg:border-b-purple-700 minmd:border-black minlg:border-orange-600 px-5 py-2 xm:py-4 lg:py-5 minmd:py-6 minlg:py-8">
      <Link href="/">
        <div className=" font-bold xs:text-sm xs:w-[230px] sm:text-base xm:text-xl lg:text-2xl minmd:text-3xl minlg:text-4xl sm:w-[260px] md:w-[320px]">
          RPS: A Rock Paper Scissor Game
        </div>
      </Link>

      <div className="flex justify-end md:justify-center items-center  h-full">
        <div className="sm:hidden w-full text-center flex justify-evenly items-center  text-base  xm:text-lg lg:text-xl minmd:text-2xl minlg:text-3xl font-bold">
          <Link href="/create-game">
            <div className=" hover:text-white hover:bg-cyan-600 px-2 rounded-lg cursor-pointer">
              Create a Game
            </div>
          </Link>
          <Link href="/dashboard">
            <div className=" hover:text-white hover:bg-cyan-600 px-2 rounded-lg cursor-pointer">
              My Dashboard
            </div>
          </Link>
          <div
            className=" hover:text-white hover:bg-cyan-600 px-2 rounded-lg cursor-pointer xm:space-x-1 lg:space-x-2 minmd:space-x-3 minlg:space-x-4"
            onClick={() => connectWallet()}
          >
            <span>{currentAccount ? "DisConnect" : "Connect Wallet"}</span>
            {currentAccount && (
              <span className="md:hidden border border-purple-600 px-2 rounded-xl">
                {shortenAddress(currentAccount)}
              </span>
            )}
          </div>
        </div>
        <div className="hidden  sm:flex flex-col justify-end items-center">
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
            <div className=" flex flex-col space-y-1 justify-center z-10 items-center fixed top-10  right-0 h-[200px] w-[250px] xs:top-9 xss:h-[170px] xs:w-[220px] xs:text-sm sms:text-base bg-cyan-200 rounded-lg text-black font-bold">
              <div>{shortenAddress(currentAccount)}</div>
              <div
                className=" hover:text-white hover:bg-cyan-600 px-2 rounded-lg cursor-pointer"
                onClick={() => connectWallet()}
              >
                {currentAccount ? "DisConnect" : "Connect Wallet"}
              </div>
              <Link href="/create-game">
                <div className=" hover:text-white hover:bg-cyan-600 px-2 rounded-lg cursor-pointer">
                  Create a Game
                </div>
              </Link>
              <Link href="/dashboard">
                <div className=" hover:text-white hover:bg-cyan-600 px-2 rounded-lg cursor-pointer">
                  My Dashboard
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
