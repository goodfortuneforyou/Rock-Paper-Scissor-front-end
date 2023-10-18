import { shortenAddress } from "@/utils/shortenAddress";
import { ethers } from "ethers";
import React from "react";

const Card = ({ game }) => {
  return (
    <div className=" flex justify-center items-center bg-cyan-200 xs:w-48 xs:h-48 rounded-xl my-3 mx-2 xs:text-sm text-black font-semibold cursor-pointer">
      <div className="flex flex-col justify-evenly items-center bg-fuchsia-400 hover:bg-fuchsia-500 xs:h-44 xs:w-44 rounded-xl">
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
        <div className=" bg-fuchsia-600 hover:bg-fuchsia-700 xs:px-2 rounded-lg">
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
