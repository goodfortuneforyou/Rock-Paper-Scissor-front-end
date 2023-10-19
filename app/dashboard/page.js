"use client";
import React, { useState, useEffect } from "react";
import Card from "@/components/Card";
import { viewFunctions } from "@/context/blockchain/viewFunctions";
const Dashboard = () => {
  const { myCreatedGames, myJoinedGames, getMyCreatedGames, getMyJoinedGames } =
    viewFunctions();
  const [hideCreatedGame, setHideCreatedGame] = useState(false);
  const [hideJoinedGame, setHideJoinedGame] = useState(false);
  useEffect(() => {
    getMyCreatedGames();
    getMyJoinedGames();
    console.log(myCreatedGames);
  }, []);
  return (
    <div className="flex flex-col justify-start text-black mt-5 items-center min-h-screen">
      <div>
        <div className="flex border-b border-b-white xs:space-x-1">
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
        <div className="flex border-b border-b-white xs:space-x-1">
          <h1 className=" ">List of Your Joined Game:</h1>
          <span
            className=" font-bold text-fuchsia-700 cursor-pointer hover:text-fuchsia-800"
            onClick={() => setHideJoinedGame(!hideJoinedGame)}
          >
            {hideJoinedGame == false ? "Hide List" : "Show List"}
          </span>
        </div>
        <div className="flex flex-wrap justify-center mt-5 items-center">
          {!hideJoinedGame &&
            myJoinedGames &&
            myJoinedGames.length > 0 &&
            myJoinedGames.map((game) => <Card key={game.id} game={game} />)}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
