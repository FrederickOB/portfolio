import Image from "next/image";
import React from "react";
import { FiFigma } from "react-icons/fi";
import { FaCss3, FaHtml5, FaJs, FaReact } from "react-icons/fa";
import {
  SiTypescript,
  SiTailwindcss,
  SiFirebase,
  SiNextdotjs,
} from "react-icons/si";
import { useThemeColor } from "@/context/ColorThemeContext";

export interface ProjectCardsProps {
  picture?: string;
  title?: string;
  description?: string;
  stack?: string[];
  video?: string;
}

export default function ProjectCards({
  picture,
  title,
  description,
  stack,
  video,
}: ProjectCardsProps) {
  const { color } = useThemeColor();
  return (
    <div className="relative flex flex-col w-full transition-all min-h-96 max-h-fit rounded-xl drop-shadow-[0_0_0.75rem_#6366F190]">
      {picture ? (
        <Image
          src={picture}
          width={900}
          height={600}
          className="object-cover w-full h-full max-h-[50%] aspect-video rounded-t-xl"
          alt={`${title} project`}
        />
      ) : null}

      <div className="flex flex-col justify-between h-full p-4 space-y-3 bg-white rounded-b-xl dark:bg-black dark:text-white">
        <div className="space-y-3">
          <h3
            className={`text-base font-bold leading-5 ${color.text} break-words lg:text-lg line-clamp-2`}
          >
            {title}
          </h3>

          <p className="text-xs font-thin line-clamp-4">{description}</p>
        </div>
        {stack && stack.length > 0 ? (
          <div className="space-y-1.5">
            <p className="text-xs underline">Stack</p>

            <div className={`flex space-x-4 ${color.text}`}>
              {stack.map((stack, idx) => showStackIcon(stack, idx))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

const showStackIcon = (stack: string, idx: number) => {
  switch (stack) {
    case "Next":
      return <SiNextdotjs key={idx} />;
      break;
    case "React":
      return <FaReact key={idx} />;
      break;
    case "Tailwind":
      return <SiTailwindcss key={idx} />;
      break;
    case "Typescript":
      return <SiTypescript key={idx} />;
      break;
    case "Firebase":
      return <SiFirebase key={idx} />;
      break;
    case "figma":
      return <FiFigma key={idx} />;
      break;
    case "Javascript":
      return <FaJs key={idx} />;
      break;
    case "Html":
      return <FaHtml5 key={idx} />;
      break;
    case "Css":
      return <FaCss3 key={idx} />;
      break;

    default:
      break;
  }
};
