import { Fragment, useState, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import ScrollLink from "../ScrollLink/ScrollLink";
import { BiMenuAltRight } from "react-icons/bi";
import { HiOutlineColorSwatch } from "react-icons/hi";
import { FiMoon, FiSun, FiX } from "react-icons/fi";
import { useThemeColor } from "@/context/ColorThemeContext";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

// Move NavbarBlur component above the main Navbar component
const NavbarBlur = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/70 to-white/80 dark:from-black/80 dark:via-black/70 dark:to-black/80 backdrop-blur-md"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent"></div>
    </div>
  );
};

// Remove the duplicate export default and keep only one Navbar component
export default function Navbar({ activeSection = "intro" }) {
  const { color, setColor } = useThemeColor();
  const [showColors, setShowColors] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Intro", href: "/#intro" },
    { name: "Portfolio", href: "/#portfolio" },
    { name: "Contact", href: "/#contact" },
  ];

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  console.log("theme", theme);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.div
        className={`fixed top-0 z-40 w-full backdrop-blur-md transition-all  duration-300 ${
          isScrolled ? "py-2" : "py-4"
        } `}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="relative z-[1] flex items-center justify-between">
            <motion.div
              className={`flex items-center p-1 ${color.bg} rounded-full px-4`}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Image
                src={"/logo.svg"}
                width={1000}
                height={431}
                alt="Frederick's Logo"
                className="object-contain w-20 h-8 aspect-video invert dark:invert-0"
              />
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <ScrollLink
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 mx-1 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeSection === link.href.replace("/#", "")
                      ? `${color.bg} text-white`
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                  onClick={closeMobileMenu}
                >
                  {link.name}
                </ScrollLink>
              ))}
            </div>

            <div className="hidden md:flex items-center space-x-4">
              {/* Theme Toggle Button */}
              {mounted && (
                <motion.button
                  onClick={toggleTheme}
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                  whileHover={{ scale: 1.1, rotate: 15 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {theme === "dark" ? (
                    <FiSun className="w-5 h-5" />
                  ) : (
                    <FiMoon className="w-5 h-5" />
                  )}
                </motion.button>
              )}

              {/* Color Theme Menu */}
              <Menu as="div" className="relative">
                <Menu.Button
                  as={motion.button}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`flex items-center space-x-2 p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300`}
                >
                  <HiOutlineColorSwatch className="w-5 h-5" />
                  <div className={`w-3 h-3 rounded-full ${color.bg}`}></div>
                </Menu.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-xl bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-2">
                    <div className="py-1">
                      <ColorMenuItems />
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              >
                {mobileMenuOpen ? (
                  <FiX className="w-6 h-6" />
                ) : (
                  <BiMenuAltRight className="w-6 h-6" />
                )}
              </button>
            </div>
          </nav>
        </div>
      </motion.div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm"
              onClick={closeMobileMenu}
            ></div>

            <motion.div
              className="fixed right-0 top-0 bottom-0 w-3/4 max-w-sm bg-white dark:bg-gray-900 shadow-xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="flex flex-col h-full p-6">
                <div className="flex justify-end mb-8">
                  <button
                    onClick={closeMobileMenu}
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex flex-col space-y-4">
                  {navLinks.map((link) => (
                    <ScrollLink
                      key={link.name}
                      href={link.href}
                      className={`px-4 py-3 rounded-lg text-base font-medium ${
                        activeSection === link.href.replace("/#", "")
                          ? `${color.bg} text-white`
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                      onClick={closeMobileMenu}
                    >
                      {link.name}
                    </ScrollLink>
                  ))}
                </div>

                <div className="mt-auto">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-gray-100 dark:bg-gray-800">
                    {mounted && (
                      <button
                        onClick={toggleTheme}
                        className="flex items-center space-x-2 text-gray-700 dark:text-gray-300"
                      >
                        {theme === "dark" ? (
                          <>
                            <FiSun className="w-5 h-5" />
                            <span>Light Mode</span>
                          </>
                        ) : (
                          <>
                            <FiMoon className="w-5 h-5" />
                            <span>Dark Mode</span>
                          </>
                        )}
                      </button>
                    )}

                    <button
                      onClick={() => setShowColors(!showColors)}
                      className="flex items-center space-x-2 text-gray-700 dark:text-gray-300"
                    >
                      <HiOutlineColorSwatch className="w-5 h-5" />
                      <div className={`w-3 h-3 rounded-full ${color.bg}`}></div>
                    </button>
                  </div>

                  {showColors && (
                    <div className="mt-4 p-4 rounded-lg bg-gray-100 dark:bg-gray-800">
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Choose Theme Color
                      </h3>
                      <div className="grid grid-cols-3 gap-2">
                        <ColorMenuItemsMobile />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const ColorMenuItems = () => {
  const { setColor } = useThemeColor();

  const colorOptions = [
    {
      name: "Indigo",
      color: {
        bg: "bg-indigo-500",
        text: "text-indigo-500",
        border: "border-indigo-500",
        hoverText: "hover:text-indigo-500",
        glow: "drop-shadow-[0_0_2rem_#6366F190]",
        softGlow: "drop-shadow-[0_0_0.75rem_#6366F190]",
        hex: "6366F1",
      },
      bgClass: "bg-indigo-500",
    },
    {
      name: "Green",
      color: {
        bg: "bg-green-500",
        text: "text-green-500",
        border: "border-green-500",
        hoverText: "hover:text-green-500",
        glow: "drop-shadow-[0_0_2rem_#22C55E90]",
        softGlow: "drop-shadow-[0_0_0.75rem_#22C55E90]",
        hex: "22C55E",
      },
      bgClass: "bg-green-500",
    },
    {
      name: "Blue",
      color: {
        bg: "bg-blue-500",
        text: "text-blue-500",
        border: "border-blue-500",
        hoverText: "hover:text-blue-500",
        glow: "drop-shadow-[0_0_2rem_#3B82F690]",
        softGlow: "drop-shadow-[0_0_0.75rem_#3B82F690]",
        hex: "3B82F6",
      },
      bgClass: "bg-blue-500",
    },
    {
      name: "Red",
      color: {
        bg: "bg-red-500",
        text: "text-red-500",
        border: "border-red-500",
        hoverText: "hover:text-red-500",
        glow: "drop-shadow-[0_0_2rem_#EF444490]",
        softGlow: "drop-shadow-[0_0_0.75rem_#EF444490]",
        hex: "EF4444",
      },
      bgClass: "bg-red-500",
    },
    {
      name: "Orange",
      color: {
        bg: "bg-orange-500",
        text: "text-orange-500",
        border: "border-orange-500",
        hoverText: "hover:text-orange-500",
        glow: "drop-shadow-[0_0_2rem_#F9731690]",
        softGlow: "drop-shadow-[0_0_0.75rem_#F9731690]",
        hex: "F97316",
      },
      bgClass: "bg-orange-500",
    },
    {
      name: "Purple",
      color: {
        bg: "bg-purple-500",
        text: "text-purple-500",
        border: "border-purple-500",
        hoverText: "hover:text-purple-500",
        glow: "drop-shadow-[0_0_2rem_#A855F790]",
        softGlow: "drop-shadow-[0_0_0.75rem_#A855F790]",
        hex: "A855F7",
      },
      bgClass: "bg-purple-500",
    },
  ];

  return (
    <Fragment>
      {colorOptions.map((option) => (
        <Menu.Item key={option.name}>
          {({ active }) => (
            <button
              onClick={() => setColor(option.color)}
              className={`flex items-center justify-between w-full px-4 py-2 text-sm ${
                active ? "bg-gray-100 dark:bg-gray-700" : ""
              } rounded-lg`}
            >
              <span>{option.name}</span>
              <div className={`w-5 h-5 rounded-full ${option.bgClass}`}></div>
            </button>
          )}
        </Menu.Item>
      ))}
    </Fragment>
  );
};

const ColorMenuItemsMobile = () => {
  const { setColor } = useThemeColor();

  const colorOptions = [
    {
      name: "Indigo",
      color: {
        bg: "bg-indigo-500",
        text: "text-indigo-500",
        border: "border-indigo-500",
        hoverText: "hover:text-indigo-500",
        glow: "drop-shadow-[0_0_2rem_#6366F190]",
        softGlow: "drop-shadow-[0_0_0.75rem_#6366F190]",
        hex: "6366F1",
      },
      bgClass: "bg-indigo-500",
    },
    {
      name: "Green",
      color: {
        bg: "bg-green-500",
        text: "text-green-500",
        border: "border-green-500",
        hoverText: "hover:text-green-500",
        glow: "drop-shadow-[0_0_2rem_#22C55E90]",
        softGlow: "drop-shadow-[0_0_0.75rem_#22C55E90]",
        hex: "22C55E",
      },
      bgClass: "bg-green-500",
    },
    {
      name: "Blue",
      color: {
        bg: "bg-blue-500",
        text: "text-blue-500",
        border: "border-blue-500",
        hoverText: "hover:text-blue-500",
        glow: "drop-shadow-[0_0_2rem_#3B82F690]",
        softGlow: "drop-shadow-[0_0_0.75rem_#3B82F690]",
        hex: "3B82F6",
      },
      bgClass: "bg-blue-500",
    },
    {
      name: "Red",
      color: {
        bg: "bg-red-500",
        text: "text-red-500",
        border: "border-red-500",
        hoverText: "hover:text-red-500",
        glow: "drop-shadow-[0_0_2rem_#EF444490]",
        softGlow: "drop-shadow-[0_0_0.75rem_#EF444490]",
        hex: "EF4444",
      },
      bgClass: "bg-red-500",
    },
    {
      name: "Orange",
      color: {
        bg: "bg-orange-500",
        text: "text-orange-500",
        border: "border-orange-500",
        hoverText: "hover:text-orange-500",
        glow: "drop-shadow-[0_0_2rem_#F9731690]",
        softGlow: "drop-shadow-[0_0_0.75rem_#F9731690]",
        hex: "F97316",
      },
      bgClass: "bg-orange-500",
    },
    {
      name: "Purple",
      color: {
        bg: "bg-purple-500",
        text: "text-purple-500",
        border: "border-purple-500",
        hoverText: "hover:text-purple-500",
        glow: "drop-shadow-[0_0_2rem_#A855F790]",
        softGlow: "drop-shadow-[0_0_0.75rem_#A855F790]",
        hex: "A855F7",
      },
      bgClass: "bg-purple-500",
    },
    {
      name: "Teal",
      color: {
        bg: "bg-teal-500",
        text: "text-teal-500",
        border: "border-teal-500",
        hoverText: "hover:text-teal-500",
        glow: "drop-shadow-[0_0_2rem_#14B8A690]",
        softGlow: "drop-shadow-[0_0_0.75rem_#14B8A690]",
        hex: "14B8A6",
      },
      bgClass: "bg-teal-500",
    },
    {
      name: "Pink",
      color: {
        bg: "bg-pink-500",
        text: "text-pink-500",
        border: "border-pink-500",
        hoverText: "hover:text-pink-500",
        glow: "drop-shadow-[0_0_2rem_#EC489990]",
        softGlow: "drop-shadow-[0_0_0.75rem_#EC489990]",
        hex: "EC4899",
      },
      bgClass: "bg-pink-500",
    },
    {
      name: "Amber",
      color: {
        bg: "bg-amber-500",
        text: "text-amber-500",
        border: "border-amber-500",
        hoverText: "hover:text-amber-500",
        glow: "drop-shadow-[0_0_2rem_#F59E0B90]",
        softGlow: "drop-shadow-[0_0_0.75rem_#F59E0B90]",
        hex: "F59E0B",
      },
      bgClass: "bg-amber-500",
    },
  ];

  return (
    <>
      {colorOptions.map((option) => (
        <motion.button
          key={option.name}
          onClick={() => setColor(option.color)}
          className={`flex flex-col items-center justify-center p-2 rounded-lg`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <div
            className={`w-8 h-8 rounded-full ${option.bgClass} mb-1 shadow-md`}
          ></div>
          <span className="text-xs text-gray-700 dark:text-gray-300">
            {option.name}
          </span>
        </motion.button>
      ))}
    </>
  );
};
