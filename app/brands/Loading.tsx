"use client";

import { JSX, useEffect, useState } from "react";

const Loading = () => {
  const [bubbles, setBubbles] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const bubblesArray: JSX.Element[] = [];
    for (let i = 0; i < 5; i++) {
      bubblesArray.push(<div key={i} className="bubble"></div>);
    }
    setBubbles(bubblesArray);
  }, []);

  return (
    <div className="">
        <h1 className="mt-5 text-center font-DanaMedium text-lg sm:text-xl">
        لطفا منتظر بمانید ...
      </h1>
      <div
        className="relative mx-auto size-[300px] overflow-hidden"
        id="cooking"
      >
        {bubbles}
        <div id="area">
          <div id="sides">
            <div id="pan"></div>
            <div id="handle"></div>
          </div>
          <div id="pancake">
            <div id="pastry"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
