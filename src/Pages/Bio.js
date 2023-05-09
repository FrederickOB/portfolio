import React from "react";
import LinePercentage from "../Components.js/LinePercentrage.js/LinePercentage";
import { HiOutlineDocumentDownload } from "react-icons/hi";

const Bio = () => {
  return (
    <div className="flex items-center p-8 md:h-screen">
      <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2">
        <div className="flex flex-col justify-between p-8 space-y-4 md:space-y-0">
          <h3 className="text-xl font-bold text-blue-400 md:text-4xl">
            Who Am I?
          </h3>
          <p className="text-sm text-white md:text-base 2xl:text-xl">
            I am an experienced Front-End developer who is constantly seeking
            out ways to improve my skills and also broaden my area of knowledge
            in every field I find myself in. I have four years of professional
            software and UI/UX development under my belt. I predominantly work
            as a frontend engineer where I mostly use React for building
            performant, user-friendly, and accessible web applications. I also
            double as a mobile application engineer using React Native for
            mobile application development. I generally consider myself a very
            teachable person who is always keen on learning new things from
            others. As a team player, I always try my best to do my part as a
            team member while offering help to others who may need it. I believe
            very much in hard work and live by the principle, "if it must be
            done it must be done well".
          </p>

          <div className="flex justify-end">
            <a
              href={require("../assets/Frederick_Osei_Ofori-Boadu_-_Frontend_Developer-2.pdf")}
              className="flex items-center py-2 pl-4 pr-5 text-sm text-black transition-transform bg-blue-400 rounded-lg md:text-base hover:scale-110"
              download
            >
              Download CV
              <HiOutlineDocumentDownload className="ml-2 md:text-xl" />
            </a>
          </div>
        </div>
        <div className="p-8 space-y-5 ">
          <LinePercentage label="html & css" percentage="94%" />
          <LinePercentage label="Javascript" percentage="88%" />
          <LinePercentage label="React" percentage="92%" />
          <LinePercentage label="Typescript" percentage="82%" />
          <LinePercentage label="UI/UX" percentage="84%" />
          <LinePercentage label="Node" percentage="66%" />
        </div>
      </div>
    </div>
  );
};

export default Bio;
