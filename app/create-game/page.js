import React from "react";

const CreateGame = () => {
  return (
    <div className=" flex flex-col justify-center xs:space-y-5 sm:space-y-6 md:space-y-8 xm:space-y-9 lg:space-y-10 minmd:space-y-12 minlg:space-y-16 items-center min-h-screen text-black">
      <h1 className=" font-bold xs:text-base sm:text-base md:text-lg xm:text-lg lg:text-xl minmd:text-2xl minlg:text-3xl">
        Create a game!
      </h1>
      <div className="flex flex-col justify-center items-center xs:space-y-5 sm:space-y-6 md:space-y-8 xm:space-y-9 lg:space-y-10 minmd:space-y-12 minlg:space-y-16">
        <div className="flex justify-center items-center xs:space-x-2 sm:space-x-3 space-x-5 xs:text-sm sm:text-base md:text-lg xm:text-lg lg:text-xl minmd:text-2xl minlg:text-3xl">
          <p>Game Price: </p>
          <input
            type="number"
            placeholder="Enter stake amount"
            className=" rounded-lg text-center bg-cyan-100 text-black outline outline-blue-400 xs:h-6 sm:h-7 md:h-8 xm:h-9 lg:h-10 minmd:h-12 minlg:h-16"
          />
        </div>
        <button
          type="button"
          className="bg-pink-600 hover:bg-pink-800 cursor-pointer xs:w-16 sm:w-20 md:w-20 xm:w-24 lg:w-28 minmd:w-32 minlg:w-36 md:px-2 xs:px-2 xm:px-3 lg:px-3 minmd:px-4 minlg:px-4 lg:py-1 minmd:py-2 minlg:py-3 rounded-lg minmd:rounded-2xl xs:text-sm sm:text-base md:text-lg xm:text-lg lg:text-xl minmd:text-2xl minlg:text-3xl font-bold"
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateGame;
