import React from "react";
import LinePercentage from "../Components.js/LinePercentrage.js/LinePercentage";
import { HiOutlineDocumentDownload } from "react-icons/hi";

const Bio = () => {
  return (
    <div className="flex items-center h-screen p-8">
      <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2">
        <div className="flex flex-col justify-between p-8">
          <h3 className="text-4xl font-bold text-blue-400">Who Am I?</h3>
          <p className="text-xl text-white">
            I am an experience Front-End developer who constantly seeks out how
            to improve my skills and broaden my area of knowledge and expertise
            in every field I find myself in. I have three years of professional
            software and UI/UX development under my belt. I predominantly work
            with React for web application development and React Native for
            mobile application development. I am always looking for ways to
            improve myself and consider myself very teachable. I am a team
            player and always tries my best to do my part as a team member while
            offer my help to anyone who needs it. I believe very much and hard
            work and live by the principle, "if it must be done it must be done
            well".
          </p>

          <div className="flex justify-end">
            <button className="flex items-center py-2 pl-4 pr-5 text-base text-black transition-transform bg-blue-400 rounded-lg hover:scale-110">
              Download CV
              <HiOutlineDocumentDownload className="ml-2 text-xl" />
            </button>
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
