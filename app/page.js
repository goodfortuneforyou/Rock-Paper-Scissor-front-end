"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { decrement, increment } from "../context/slices/counter/counterSlice";
import {
  counterValue,
  decrement,
  increment,
} from "../context/slices/counter/counterSlice";

function Counter() {
  // const [count, setcount] = useState("")
  const count = useSelector((state) => state.counter.value);
  console.log(count, counterValue);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(increment());
  }, []);

  return (
    <div className="flex flex-col text-white xm:text-green-600 sm:text-blue-800 xs:text-red-600 min-h-screen justify-center items-center py-2">
      {/* <div> */}
      <button
        aria-label="Increment value"
        onClick={() => dispatch(increment())}
      >
        Increment
      </button>
      <span>The Current Count Value: {count}</span>
      <button
        aria-label="Decrement value"
        onClick={() => dispatch(decrement())}
      >
        Decrement
      </button>
      {/* </div> */}
    </div>
  );
}
export default Counter;
