import Image from "next/image";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiFigma } from "react-icons/fi";
import {
  FaCss3,
  FaHtml5,
  FaJs,
  FaReact,
  FaGithub,
  FaExternalLinkAlt,
} from "react-icons/fa";
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
  githubLink?: string;
  liveLink?: string;
}

export default function ProjectCards({
  picture,
  title,
  description,
  stack,
  video,
  githubLink,
  liveLink,
}: ProjectCardsProps) {
  const { color } = useThemeColor();
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <motion.div
      className="group relative w-full rounded-2xl overflow-hidden bg-gray-10 border-2 dark:border-0 dark:bg-gray-900"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      layout
    >
      {/* Glass morphism effect for the card */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 dark:from-black/5 dark:to-black/10 backdrop-blur-sm z-0 rounded-2xl"></div>

      {/* Card content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Image container with parallax effect */}
        <div className="relative w-full h-64 overflow-hidden">
          {picture ? (
            <motion.div
              className="relative w-full h-full"
              style={{
                y: isHovered ? -10 : 0,
                transition: "transform 0.5s cubic-bezier(0.33, 1, 0.68, 1)",
              }}
            >
              <Image
                src={picture}
                width={1200}
                height={800}
                className="object-cover w-full h-full transition-transform duration-700"
                alt={`${title} project`}
                priority
              />

              {/* Gradient overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0.3 }}
                transition={{ duration: 0.5 }}
              />

              {/* Project title overlay on image */}
            </motion.div>
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
              <span className="text-gray-400">No image available</span>
            </div>
          )}

          {/* Action buttons */}
          <motion.div
            className="absolute top-4 right-4 flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {githubLink && (
              <motion.a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 text-white bg-black/80 backdrop-blur-md rounded-full hover:bg-black"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaGithub className="w-5 h-5" />
              </motion.a>
            )}
            {liveLink && (
              <motion.a
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center w-10 h-10 text-white ${color.bg} backdrop-blur-md rounded-full`}
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaExternalLinkAlt className="w-4 h-4" />
              </motion.a>
            )}
          </motion.div>
        </div>

        {/* Content section */}
        <motion.div className="relative flex flex-col flex-1 p-6" layout>
          <motion.div
            className=" text-white mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <motion.h3
              className={`text-2xl font-bold tracking-tight ${color.text}`}
              layout
            >
              {title}
            </motion.h3>
          </motion.div>
          {/* Tech stack pills */}
          {stack && stack.length > 0 && (
            <motion.div
              className="flex flex-wrap gap-2 mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {stack.map((tech, idx) => (
                <motion.div
                  key={idx}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full 
                    ${color.bg} text-white shadow-sm`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * idx, duration: 0.4 }}
                >
                  {showStackIcon(tech, idx)}
                  <span>{tech}</span>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Description with expand/collapse functionality */}
          <motion.div className="relative">
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isExpanded ? "max-h-[500px]" : "max-h-[4.5rem]"
              }`}
            >
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {description}
              </p>
            </div>

            {description && description.length > 150 && (
              <motion.button
                onClick={toggleExpand}
                className={`mt-2 text-xs font-medium ${color.text}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isExpanded ? "Show less" : "Read more"}
              </motion.button>
            )}
          </motion.div>
        </motion.div>

        {/* Hover effect overlay */}
        <motion.div
          className="absolute inset-0 dark:border-2 rounded-2xl pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            borderColor: color.border || "#3b82f6",
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
}

const showStackIcon = (stack: string, idx: number) => {
  switch (stack) {
    case "Next":
      return <SiNextdotjs className="w-3.5 h-3.5" />;
    case "React":
      return <FaReact className="w-3.5 h-3.5" />;
    case "Tailwind":
      return <SiTailwindcss className="w-3.5 h-3.5" />;
    case "Typescript":
      return <SiTypescript className="w-3.5 h-3.5" />;
    case "Firebase":
      return <SiFirebase className="w-3.5 h-3.5" />;
    case "figma":
      return <FiFigma className="w-3.5 h-3.5" />;
    case "Javascript":
      return <FaJs className="w-3.5 h-3.5" />;
    case "Html":
      return <FaHtml5 className="w-3.5 h-3.5" />;
    case "Css":
      return <FaCss3 className="w-3.5 h-3.5" />;
    default:
      return null;
  }
};
