import { shortenAddress } from "@/utils/shortenAddress";
import { ethers } from "ethers";
import React from "react";
import { writeFunctions } from "@/context/blockchain/writeFunctions";
const Card = ({ game }) => {
  const { joinGame } = writeFunctions();
  return (
    <div className=" flex justify-center items-center bg-cyan-200 xs:w-48 xs:h-48 sm:w-52 sm:h-52 md:w-56 md:h-56 xm:w-60 xm:h-60 lg:w-64 lg:h-64 minmd:w-72 minmd:h-72 rounded-xl minmd:rounded-2xl xs:m-3 sm:m-4 md:m-6 xm:m-7 lg:m-8 minmd:m-10 minlg:m-12 xs:text-sm sm:text-base md:text-lg xm:text-lg lg:text-xl text-black font-semibold cursor-pointer">
      <div className="flex flex-col justify-evenly items-center bg-fuchsia-400 hover:bg-fuchsia-500 xs:h-44 xs:w-44 sm:h-48 sm:w-48 md:w-52 md:h-52 xm:w-56 xm:h-56 lg:w-60 lg:h-60 minmd:w-[268px] minmd:h-[268px] rounded-xl">
        <div>Game Id No : {game.id}</div>
        <div>Staked : {ethers.formatEther(game.stakeAmount)} RPS</div>
        <div>Creator : {shortenAddress(game.players[0])}</div>
        <div>
          Current Status:{" "}
          {game.state == "0"
            ? "Created"
            : game.state == "1"
            ? "Joined"
            : game.state == "2"
            ? "Commited"
            : game.state == "3"
            ? "Revealed"
            : "Unknown"}
        </div>
        <div
          className=" bg-fuchsia-600 hover:bg-fuchsia-700 xs:px-2 rounded-lg"
          onClick={() => joinGame(game.id, game.stakeAmount)}
        >
          {game.state == "0"
            ? "Join Game"
            : game.state == "1"
            ? "Commit Move"
            : game.state == "2"
            ? "Reveal Move"
            : game.state == "3"
            ? "Game Ended"
            : "Unknown"}
        </div>
      </div>
    </div>
  );
};

export default Card;
