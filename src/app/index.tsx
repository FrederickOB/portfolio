"use client";
import Projects from "./projects/projects";
import ADINKRA_ICONS from "../lib/lib";
import Contact from "./contact/contact";
import Navbar from "@/components/NavBar/Navbar";
import Intro from "./intro/intro";
import { useEffect, useState } from "react";
import { useThemeColor } from "@/context/ColorThemeContext";

export default function Index() {
  const [number, setNumber] = useState(0);
  const { color } = useThemeColor();
  useEffect(() => {
    // create interval
    const interval = setInterval(
      // set number every 5s
      () => setNumber(Math.floor(Math.random() * 9)),
      10000
    );

    // clean up interval on unmount
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div
      style={{
        backgroundImage: `url("${ADINKRA_ICONS(color.hex)[number]}")`,
      }}
      className="w-screen min-h-screen font-mono bg-fixed bg-white dark:bg-black "
    >
      <Navbar />

      <section className="" id="intro">
        <Intro />
      </section>
      <section className="" id="portfolio">
        <Projects />
      </section>
      <section className="" id="contact">
        <Contact />
      </section>
    </div>
  );
}
