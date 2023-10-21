"use client";
import { shortenAddress } from "@/utils/shortenAddress";
import { ethers } from "ethers";
import { useState } from "react";
import { writeFunctions } from "@/context/blockchain/writeFunctions";
import { toast } from "react-toastify";
const Card = ({ game }) => {
  const { joinGame, commitGame, revealGame } = writeFunctions();
  const [move, setMove] = useState("");
  const [salt, setSalt] = useState("");
  const errorNotification = (msg) => toast(msg);
  return (
    <div className=" flex justify-center items-center bg-cyan-200 xs:w-52 xs:h-56 sm:w-56 sm:h-60 md:w-60 md:h-64 xm:w-64 xm:h-[272px] lg:w-[272px] lg:h-[288px] minmd:w-[320px] minmd:h-[336px] minlg:w-[380px] minlg:h-[396px] rounded-xl minmd:rounded-2xl xs:m-3 sm:m-4 md:m-6 xm:m-7 lg:m-8 minmd:m-10 minlg:m-12 xs:text-sm sm:text-base md:text-lg xm:text-lg lg:text-xl minmd:text-2xl minlg:text-3xl text-black font-semibold cursor-pointer">
      <div className="flex flex-col justify-evenly items-center bg-fuchsia-400 hover:bg-fuchsia-500 xs:h-52 xs:w-48 sm:h-56 sm:w-52 md:w-56 md:h-60 xm:w-60 xm:h-64 lg:w-64 lg:h-[272px] minmd:w-[296px] minmd:h-[312px] minlg:w-[356px] minlg:h-[372px] rounded-xl">
        <div>Game Id No : {game.id}</div>
        <div>Staked : {ethers.formatEther(game.stakeAmount)} RPS</div>
        <div>Creator : {shortenAddress(game.players[0])}</div>
        {game.state != "0" && (
          <div>Player : {shortenAddress(game.players[1])}</div>
        )}
        {(game.state == "1" || game.state == "2") && (
          <>
            <input
              type="number"
              placeholder="Enter your Move"
              className=" w-9/12 rounded-xl text-center mb-1"
              onChange={(e) => setMove(e.target.value)}
            />
            <input
              type="number"
              placeholder="Enter the Salt"
              className=" w-9/12 rounded-xl text-center"
              onChange={(e) => setSalt(e.target.value)}
            />
          </>
        )}
        <div className=" minmd:text-xl minlg:text-2xl">
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
          className=" bg-fuchsia-600 hover:bg-fuchsia-700 xs:px-2 sm:px-3 md:px-4 xm:px-4 lg:px-5 minlg:px-6 minmd:px-5 md:py-1 xm:py-1 lg:py-2 minmd:py-2 rounded-lg minmd:rounded-xl"
          onClick={() => {
            game.state == "0"
              ? joinGame(game.id, game.stakeAmount)
              : game.state == "1"
              ? commitGame(game.id, move, salt)
              : game.state == "2"
              ? revealGame(game.id, move, salt)
              : errorNotification(
                  "Game is already ended, please chose another game"
                );
          }}
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
