import { JSX, useEffect, useState } from "react";

const LoadingAnimation = () => {
  const [bubbles, setBubbles] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const bubblesArray: JSX.Element[] = [];
    for (let i = 0; i < 5; i++) {
      bubblesArray.push(<div key={i} className="bubble"></div>);
    }
    setBubbles(bubblesArray);
  }, []);

  return (
    <div className="w-screen h-screen">
      <div className="relative mx-auto size-[350px] sm:size-[500px] overflow-hidden" id="cooking">
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
      <h1 className="mt-5 text-center font-DanaMedium text-lg sm:text-xl">لطفا منتظر بمانید ...</h1>
    </div>
  );
};

export default LoadingAnimation;
