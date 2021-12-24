import { useEffect, useRef, useState } from "react";
import * as Slider from "@radix-ui/react-slider";

export let meta = { title: "Slow-Mo Christian" };
export let handle = { bgClass: "bg-black" };

const SIDES = ["right", "top", "left", "bottom"];
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

      <div className="bg-white/20 backdrop-blur-md fixed bottom-6 inset-x-0 mx-auto w-[calc(100vw-2rem)] max-w-[24rem] px-6 pb-3 pt-4 rounded-full">
        <div className="w-full">
          <Slider.Root
            min={0}
            max={100}
            value={[speed]}
            onValueChange={(value) => setSpeed(value)}
            className="relative flex items-center"
          >
            <Slider.Track className="relative h-1 w-full bg-white/30 rounded-full">
              <Slider.Range className="absolute bg-white/80 h-full rounded-l-full" />
            </Slider.Track>

            <Slider.Thumb className="block h-4 w-4 bg-white shadow rounded-full outline-none cursor-pointer" />
          </Slider.Root>
        </div>

        <p
          className={`mt-2 font-bold text-center text-white ${
            speed < 50 ? "" : "italic"
          }`}
        >
          {speed < 50 ? "Slow" : "Fast"}-Mo Christian
        </p>
      </div>
    </div>
  );
}
