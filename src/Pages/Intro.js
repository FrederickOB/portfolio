import Typewriter from "typewriter-effect";
import { useState } from "react";
import picture from "../assets/memoji.gif";
import { FiFigma, FiGithub, FiLinkedin } from "react-icons/fi";
import {
  FaCss3,
  FaHtml5,
  FaJs,
  FaNodeJs,
  FaReact,
  FaTelegram,
} from "react-icons/fa";
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
        <div className="w-full mb-8 text-6xl font-extrabold text-center text-white ">
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
          <div className="mt-12 text-4xl font-bold text-white">
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
          <p className="text-6xl text-blue-500">
            <FaCss3 />
          </p>
          <p className="text-6xl text-blue-500">
            <FaHtml5 />
          </p>
          <p className="text-6xl text-blue-500">
            <FaJs />
          </p>
          <p className="text-6xl text-blue-500">
            <FaReact />
          </p>
          <p className="text-6xl text-blue-500">
            <FaNodeJs />
          </p>
          <p className="text-6xl text-blue-500">
            <GrGatsbyjs />
          </p>
          <p className="text-6xl text-blue-500">
            <FiFigma />
          </p>
          <p className="text-6xl text-blue-500">
            <SiAdobexd />
          </p>
        </div>
      </div>
    </>
  );
}

export default Intro;
