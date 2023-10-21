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
      <div className="flex flex-col justify-center items-center mt-24">
        <h1 className="xs:text-base sm:text-lg md:text-lg xm:text-xl lg:text-2xl minmd:text-3xl minlg:text-4xl text-center text-black font-extrabold">
          Welcome to the game! Here is the list of the available game which is
          waiting for you to join!
        </h1>
      </div>
      <div className="flex flex-wrap justify-center mt-5 items-center">
        {availableGames &&
          availableGames.length > 0 &&
          availableGames.map((game) => <Card key={game.id} game={game} />)}
      </div>
    </div>
  );
}
export default Home;
