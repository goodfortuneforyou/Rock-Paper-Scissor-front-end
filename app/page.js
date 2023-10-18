"use client";
import Card from "@/components/Card";
import { viewFunctions } from "@/context/blockchain/viewFunctions";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

function Home() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  const { availableGames, getAvailableGames } = viewFunctions();
  useEffect(() => {
    getAvailableGames();
    console.log(availableGames);
  }, []);

  return (
    <div className="flex flex-col text-white xm:text-green-600 sm:text-blue-800 xs:text-red-600 min-h-screen py-2">
      <div>Welcome to the game!</div>
      <div className="flex flex-wrap justify-center mt-3 items-center">
        {availableGames &&
          availableGames.length &&
          availableGames.map((game) => <Card key={game.id} game={game} />)}
      </div>
    </div>
  );
}
export default Home;
