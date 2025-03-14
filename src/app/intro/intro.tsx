"use client";
import React, { useState, useEffect } from "react";
import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import { motion } from "framer-motion";
import { useThemeColor } from "@/context/ColorThemeContext";

export default function Intro() {
  const { color } = useThemeColor();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const skills = [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "React Native",
    "Figma",
  ];

  return (
    <main className="flex items-center justify-center pt-20 xl:pt-0 w-full h-full min-h-screen scroll-smooth">
      <motion.section
        className="grid w-full grid-cols-1  lg:grid-cols-12 gap-10"
        variants={container}
        initial="hidden"
        animate={isLoaded ? "show" : "hidden"}
      >
        <motion.div
          className="order-2 w-full space-y-8 lg:col-span-8 lg:order-1"
          variants={item}
        >
          <div className="space-y-3">
            <motion.div
              className={`text-sm font-medium ${color.text} tracking-wider uppercase`}
              variants={item}
            >
              Hello, I'm
            </motion.div>
            <motion.h1
              className={`text-4xl md:text-6xl font-bold ${color.text}`}
              variants={item}
            >
              Frederick Ofori-Boadu Osei
            </motion.h1>
            <motion.div
              className={`text-xl font-medium ${color.text} md:text-2xl mt-2`}
              variants={item}
            >
              Front-End Developer & UI/UX Designer
            </motion.div>
          </div>

          <motion.div
            className="py-6 space-y-6 text-sm md:text-base text-black dark:text-white"
            variants={item}
          >
            <p className="leading-relaxed">
              Join me on an epic coding adventure as your trusty front-end
              developer 🚀! With expertise in ReactJS, NextJS, React Native,
              Typescript, and the magic of Figma, I'm here to create
              mind-blowing web designs that wow users. From solving complex
              issues to prioritizing performance and user experience, I'm the
              adaptable, collaborative wizard you need.
            </p>
            <p className="leading-relaxed">
              Together, we'll revolutionize the digital landscape and craft
              unforgettable websites. Let's make the web a more delightful place
              😊, one line of code at a time!
            </p>
          </motion.div>

          <motion.div className="flex flex-wrap gap-2 pt-4" variants={item}>
            {skills.map((skill, index) => (
              <span
                key={index}
                className={`px-3 py-1 text-sm rounded-full ${color.bg} bg-opacity-10 ${color.text} border ${color.border}`}
              >
                {skill}
              </span>
            ))}
          </motion.div>

          <motion.div className="flex flex-wrap gap-6 pt-6" variants={item}>
            <a
              target="_blank"
              rel="noreferrer noopener"
              href="https://github.com/FrederickOB"
              data-umami-event="github link"
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full border ${color.border} ${color.text} hover:${color.bg} hover:bg-opacity-10 transition-all duration-300`}
            >
              <FiGithub />
              <span>GitHub</span>
            </a>

            <a
              target="_blank"
              rel="noreferrer noopener"
              href="https://www.linkedin.com/in/frederick-ofori-boadu/"
              data-umami-event="linkedin link"
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full border ${color.border} ${color.text} hover:${color.bg} hover:bg-opacity-10 transition-all duration-300`}
            >
              <FiLinkedin />
              <span>LinkedIn</span>
            </a>

            <a
              target="_blank"
              rel="noreferrer noopener"
              href="https://twitter.com/FRED_THE_THIRD"
              data-umami-event="twitter link"
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full border ${color.border} ${color.text} hover:${color.bg} hover:bg-opacity-10 transition-all duration-300`}
            >
              <FiTwitter />
              <span>Twitter</span>
            </a>

            <a
              href="https://drive.google.com/file/d/1wYa-ItRGthDkWAVMXS-GuY635lebQ4wK/view?usp=sharing"
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full ${color.bg} text-white hover:opacity-90 transition-all duration-300`}
              target="_blank"
              data-umami-event="download resume"
            >
              <span>Download Resume</span>
              <HiOutlineDocumentDownload />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex items-center justify-center order-1 w-full lg:col-span-4 lg:order-2"
          variants={item}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="relative">
            <div
              className={`absolute inset-0 rounded-full ${color.bg} opacity-20 blur-3xl -z-10`}
            ></div>
            <img
              className={`relative z-10 ${color.softGlow}`}
              src="https://firebasestorage.googleapis.com/v0/b/portoflio-79eeb.appspot.com/o/memoji.gif?alt=media&token=b6027028-1d21-4948-88ae-de0b5092c953"
              alt="Frederick's Avatar"
              width={300}
              height={300}
            />
          </div>
        </motion.div>
      </motion.section>
    </main>
  );
}
