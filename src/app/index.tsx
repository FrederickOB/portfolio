"use client";
import ADINKRA_ICONS from "../lib/lib";
import Contact from "./contact/contact";
import Navbar from "@/components/NavBar/Navbar";
import Intro from "./intro/intro";
import { useEffect, useState, useCallback, useRef } from "react";
import { useThemeColor } from "@/context/ColorThemeContext";
import { useTheme } from "next-themes";
import { FaArrowUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Projects from "./projects/projects";

export default function Index() {
  const [number, setNumber] = useState(0);
  const [prevNumber, setPrevNumber] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("intro");
  const { color } = useThemeColor();
  const { systemTheme } = useTheme();
  const sectionsRef = useRef<HTMLElement[]>([]);

  const iconsOpacity = systemTheme === "dark" ? "0.15" : "0.08";

  // Handle background pattern change with transition
  useEffect(() => {
    const interval = setInterval(() => {
      setPrevNumber(number);
      setNumber(Math.floor(Math.random() * 9));
    }, 15000);

    return () => {
      clearInterval(interval);
    };
  }, [number]);

  // Scroll to top functionality
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Show/hide scroll-to-top button based on scroll position
  const toggleVisibility = useCallback(() => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, []);

  // Track active section for navigation highlighting
  const handleScroll = useCallback(() => {
    toggleVisibility();

    const scrollPosition = window.scrollY + 200;

    sectionsRef.current.forEach((section) => {
      if (!section) return;

      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        setActiveSection(section.id);
      }
    });
  }, [toggleVisibility]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Initialize section refs
  useEffect(() => {
    sectionsRef.current = [
      document.getElementById("intro") as HTMLElement,
      document.getElementById("portfolio") as HTMLElement,
      document.getElementById("contact") as HTMLElement,
    ].filter(Boolean);
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url("${
          ADINKRA_ICONS(color.hex, iconsOpacity)[number]
        }")`,
        transition: "background-image 1.5s ease-in-out",
      }}
      className="w-screen min-h-screen font-mono bg-fixed bg-white dark:bg-black relative "
    >
      <Navbar activeSection={activeSection} />

      <main className="container px-4 md:px-8 lg:px-12 xl:px-40 mx-auto">
        <motion.section
          id="intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Intro />
        </motion.section>

        <motion.section
          id="portfolio"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Projects />
        </motion.section>

        <motion.section
          id="contact"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Contact />
        </motion.section>
      </main>

      <footer className="py-12 text-center text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800 backdrop-blur-sm bg-white/30 dark:bg-black/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-left">
              <h3 className={`text-lg font-bold ${color.text} mb-4`}>
                Frederick Ofori-Boadu
              </h3>
              <p className="text-sm">Front-End Developer & UI/UX Designer</p>
            </div>
            <div className="text-left">
              <h3 className={`text-lg font-bold ${color.text} mb-4`}>
                Quick Links
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#intro" className="hover:underline">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#portfolio" className="hover:underline">
                    Portfolio
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:underline">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div className="text-left">
              <h3 className={`text-lg font-bold ${color.text} mb-4`}>
                Let's Connect
              </h3>
              <p className="text-sm mb-2">
                Available for freelance and full-time opportunities
              </p>
              <p className="text-sm">Based in Ghana 🇬🇭</p>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
            <p>
              © {new Date().getFullYear()} - Built with Next.js, TypeScript &
              Tailwind CSS
            </p>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {isVisible && (
          <motion.button
            onClick={scrollToTop}
            className={`fixed bottom-8 right-8 p-3 rounded-full ${color.bg} text-white shadow-lg hover:scale-110 transition-all duration-300 z-40`}
            aria-label="Scroll to top"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <FaArrowUp />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
