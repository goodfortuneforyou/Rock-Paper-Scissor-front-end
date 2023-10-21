"use client";
import React, { useState, useEffect } from "react";
import Card from "@/components/Card";
import { viewFunctions } from "@/context/blockchain/viewFunctions";
const Dashboard = () => {
  const {
    myCreatedGames,
    myJoinedGames,
    getMyCreatedGames,
    getMyJoinedGames,
    getMyComittedGames,
    myComittedGames,
  } = viewFunctions();
  const [hideCreatedGame, setHideCreatedGame] = useState(false);
  const [hideJoinedGame, setHideJoinedGame] = useState(false);
  const [hideComittedGame, setHideComittedGame] = useState(false);
  useEffect(() => {
    getMyCreatedGames();
    getMyJoinedGames();
    getMyComittedGames();
    console.log(myCreatedGames, myJoinedGames, myComittedGames);
  }, []);
  return (
    <div className="flex flex-col justify-start text-black mt-5 items-center min-h-screen">
      <div>
        <div className="flex border-b justify-center items-center border-b-white xs:space-x-1">
          <h1 className=" ">List of Your Created Game:</h1>
          <span
            className=" font-bold text-fuchsia-700 cursor-pointer hover:text-fuchsia-800"
            onClick={() => setHideCreatedGame(!hideCreatedGame)}
          >
            {hideCreatedGame == false ? "Hide List" : "Show List"}
          </span>
        </div>
        <div className="flex flex-wrap justify-center mt-5 items-center">
          {!hideCreatedGame &&
            myCreatedGames &&
            myCreatedGames.length > 0 &&
            myCreatedGames.map((game) => <Card key={game.id} game={game} />)}
        </div>
      </div>
      <div>
        <div className="flex border-b justify-center items-center border-b-white xs:space-x-1">
          <h1 className=" ">List of Your Joined Game:</h1>
          <span
            className=" font-bold text-fuchsia-700 cursor-pointer hover:text-fuchsia-800"
            onClick={() => setHideJoinedGame(!hideJoinedGame)}
          >
            {hideJoinedGame == false ? "Hide List" : "Show List"}
          </span>
        </div>
        {!hideJoinedGame && myJoinedGames && myJoinedGames.length > 0 && (
          <div className="flex flex-col mt-2 xs:text-base sm:text-lg md:text-lg xm:text-xl lg:text-2xl minmd:text-3xl minlg:text-4xl text-center text-black font-extrabold">
            <span>1 = Rock</span>
            <span>2 = Paper</span>
            <span>3 = Scissor</span>
          </div>
        )}
        <div className="flex flex-wrap justify-center mt-3 items-center">
          {!hideJoinedGame &&
            myJoinedGames &&
            myJoinedGames.length > 0 &&
            myJoinedGames.map((game) => <Card key={game.id} game={game} />)}
        </div>
      </div>
      <div>
        <div className="flex border-b justify-center items-center border-b-white xs:space-x-1">
          <h1 className=" ">List of Your Comitted Game:</h1>
          <span
            className=" font-bold text-fuchsia-700 cursor-pointer hover:text-fuchsia-800"
            onClick={() => setHideComittedGame(!hideComittedGame)}
          >
            {hideComittedGame == false ? "Hide List" : "Show List"}
          </span>
        </div>
        <div className="flex flex-wrap justify-center mt-5 items-center">
          {!hideComittedGame &&
            myComittedGames &&
            myComittedGames.length > 0 &&
            myComittedGames.map((game) => <Card key={game.id} game={game} />)}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
