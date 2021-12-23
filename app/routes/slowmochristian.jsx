import { useEffect, useRef, useState } from "react";

export let meta = { title: "Slow-Mo Christian" };

const SIDES = ["bottom", "right", "top", "left"];
let sideIndex = 0;
let interval;

export default function () {
  const img = useRef(null);

  const imgWidth = () => img.current.getBoundingClientRect().width;
  const imgHeight = () => img.current.getBoundingClientRect().height;
  const random = (max) => Math.floor(Math.random() * max);
  const randomWidth = () => random(window.innerWidth - imgWidth());
  const randomHeight = () => random(window.innerHeight - imgHeight());

  const move = () => {
    img.current.style.transition = `all ${speedInterval}ms`;

    const side = SIDES[sideIndex];

    if (side === "bottom") {
      img.current.style.top = window.innerHeight - imgHeight() + "px";
      img.current.style.left = randomWidth() + "px";
    } else if (side === "right") {
      img.current.style.left = window.innerWidth - imgWidth() + "px";
      img.current.style.top = randomHeight() + "px";
    } else if (side === "top") {
      img.current.style.top = "0px";
      img.current.style.left = randomWidth() + "px";
    } else if (side === "left") {
      img.current.style.left = "0px";
      img.current.style.top = randomHeight() + "px";
    }

    sideIndex = (sideIndex + 1) % SIDES.length;
  };

  const [speed, setSpeed] = useState(30);
  let speedInterval = 2200 - speed * 20;

  useEffect(() => {
    clearInterval(interval);

    move();

    interval = setInterval(() => {
      move();
    }, speedInterval);

    return () => clearInterval(interval);
  }, [speed]);

  return (
    <div className="bg-black h-screen">
      <img
        src="/img/christian.jpg"
        className="h-[30vh] rounded absolute top-0 left-0"
        ref={img}
      />

      <div className="bg-white/20 backdrop-blur-md fixed bottom-6 inset-x-0 mx-auto w-[calc(100vw-2rem)] max-w-[24rem] px-6 py-3 rounded-full">
        <div className="w-full">
          <input
            type="range"
            min="0"
            max="100"
            className="w-full"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
          />
        </div>
        <p
          className={`font-bold text-center text-white ${
            speed < 50 ? "" : "italic"
          }`}
        >
          {speed < 50 ? "Slow" : "Fast"}-Mo Christian
        </p>
      </div>
    </div>
  );
}
