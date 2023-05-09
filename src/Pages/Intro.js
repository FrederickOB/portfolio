import Typewriter from "typewriter-effect";
import { useState } from "react";
import picture from "../assets/memoji.gif";
import { FiFigma } from "react-icons/fi";
import { FaCss3, FaHtml5, FaJs, FaNodeJs, FaReact } from "react-icons/fa";
import { SiAdobexd } from "react-icons/si";
import { GrGatsbyjs } from "react-icons/gr";

function Intro() {
  const [done, setDone] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center justify-center w-screen h-screen font-mono">
        <div className="flex items-center justify-center text-center text-white h-60 w-60 ">
          <div className="">
            <img
              src={picture}
              alt="this slowpoke moves"
              className="w-full h-full"
            />
          </div>
        </div>
        <div className="w-full font-extrabold text-center text-white md-8 md:text-6xl ">
          <div className="flex justify-center ">
            <h1 className="mr-3 text">I am : </h1>
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .pauseFor(1000)
                  .typeString("Frederick Ofori-Boadu Osei")
                  .callFunction(() => {
                    setDone(true);
                  })
                  .start();
              }}
            />
          </div>
          <div className="text-sm font-bold text-white md:mt-12 md:text-4xl">
            {done && (
              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .pauseFor(1000)
                    .typeString("You are welcome")
                    .pauseFor(2000)
                    .deleteAll()
                    .typeString("UI/UX Designer and Front-End Developer")
                    .start();
                }}
              />
            )}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-6 mt-10">
          <p className="text-lg text-blue-500 md:text-6xl">
            <FaCss3 />
          </p>
          <p className="text-lg text-blue-500 md:text-6xl">
            <FaHtml5 />
          </p>
          <p className="text-lg text-blue-500 md:text-6xl">
            <FaJs />
          </p>
          <p className="text-lg text-blue-500 md:text-6xl ">
            <FaReact />
          </p>
          <p className="text-lg text-blue-500 md:text-6xl">
            <FaNodeJs />
          </p>
          <p className="text-lg text-blue-500 md:text-6xl">
            <GrGatsbyjs />
          </p>
          <p className="text-blue-500 md:text-6xl">
            <FiFigma />
          </p>
          <p className="text-lg text-blue-500 md:text-6xl">
            <SiAdobexd />
          </p>
        </div>
      </div>
    </>
  );
}

export default Intro;
