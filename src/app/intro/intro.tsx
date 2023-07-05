"use client";
import React, { useState } from "react";
import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";
import Image from "next/image";
import { useThemeColor } from "@/context/ColorThemeContext";
import { HiOutlineDocumentDownload } from "react-icons/hi";

export default function Intro() {
  const { color } = useThemeColor();
  return (
    <main className="flex items-center justify-center w-screen h-full min-h-screen px-8 pt-20 pb-12 lg:p-0 scroll-smooth">
      <section className="grid w-full grid-cols-1 max-w-[75rem] lg:grid-cols-12 gap-10 ">
        <div
          className={`order-2 w-full space-y-6 text-xl ${color.text} col-span-full lg:col-span-8 lg:order-2 extrabold md:text-4xl`}
        >
          <div>Frederick Ofori-Boadu Osei 🇬🇭</div>
          <div className={`text-sm font-bold ${color.text} md:text-xl`}>
            Front-End Developer And UI/UX Designer
          </div>

          <div
            className={`py-3 space-y-4 text-xs font-thin ${color.text} border-t-2 ${color.border} md:text-sm`}
          >
            <p className="leading-6 ">
              Join me on an epic coding adventure as your trusty front-end
              developer 🚀! With expertise in ReactJS, NextJS, React Native,
              Typescript, and the magic of Figma, I'm here to create
              mind-blowing web designs that wow users. From solving complex
              issues to prioritizing performance and user experience, I'm the
              adaptable, collaborative wizard you need. Together, we'll
              revolutionize the digital landscape and craft unforgettable
              websites. So, buckle up and explore my interactive portfolio.
              Let's make the web a more delightful place 😊, one line of code at
              a time!
            </p>
            <div className="flex space-x-4 md:space-x-4">
              <a
                target="_blank"
                rel="noreferrer noopener"
                href="https://github.com/FrederickOB"
                className={`flex space-x-4 text-2xl transition-colors duration-700 ${color.hoverText} hover:animate-pulse`}
              >
                <FiGithub />
              </a>

              <a
                target="_blank"
                rel="noreferrer noopener"
                href="https://www.linkedin.com/in/frederick-ofori-boadu/"
                className={`flex items-center space-x-4 text-2xl transition-colors duration-700 ${color.hoverText} hover:animate-pulse`}
              >
                <FiLinkedin />
              </a>

              <a
                target="_blank"
                rel="noreferrer noopener"
                href="https://twitter.com/FRED_THE_THIRD"
                className={`flex items-center space-x-4 text-2xl transition-colors duration-700 ${color.hoverText} hover:animate-pulse`}
              >
                <FiTwitter />
              </a>
              <a
                href="https://drive.google.com/file/d/1wYa-ItRGthDkWAVMXS-GuY635lebQ4wK/view?usp=sharing"
                className={`${color.border} border px-2 py-1 rounded flex items-center space-x-2`}
                target="_blank"
              >
                <p>Resume</p>
                <HiOutlineDocumentDownload></HiOutlineDocumentDownload>
              </a>
            </div>
          </div>
        </div>
        <div
          className={`flex items-center justify-center order-1 w-full text-center ${color.text} col-span-full lg:col-span-4 lg:order-2`}
        >
          <Image
            className={`relative lg:scale-150 ${color.glow} pulseAnimation`}
            src="/memoji.gif"
            alt="Next.js Logo"
            width={300}
            height={300}
            priority
          />
        </div>
      </section>
    </main>
  );
}
