import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import classNames from "classnames";
import Image from "next/image";
import ScrollLink from "../ScrollLink/ScrollLink";
import { BiMenuAltRight } from "react-icons/bi";
import { HiOutlineColorSwatch } from "react-icons/hi";
import { useThemeColor } from "@/context/ColorThemeContext";

export default function Navbar() {
  const { color } = useThemeColor();
  const [showColors, setShowColors] = useState(false);

  return (
    <>
      <div
        className={`fixed top-0 z-40 flex justify-center w-screen glass ${color.bg} bg-opacity-60`}
      >
        <nav className="relative z-10 flex flex-row flex-wrap items-center justify-between w-full px-6 py-4 ">
          <div className="flex items-center justify-start space-x-3">
            <Image
              src={"/logo.svg"}
              width={1000}
              height={431}
              alt="image"
              className="object-contain w-24 h-10 shadow-lg aspect-video "
            />
          </div>

          <div className="justify-center hidden divide-x divide-white dark:divide-black lg:flex ">
            <ScrollLink
              className="px-6 hover:underline hover:underline-offset-4"
              href="/#intro"
            >
              Intro
            </ScrollLink>
            <ScrollLink
              className="px-6 hover:underline hover:underline-offset-4"
              href="/#portfolio"
            >
              Portfolio
            </ScrollLink>
            <ScrollLink
              className="px-6 hover:underline hover:underline-offset-4"
              href="/#contact"
            >
              Contact Me
            </ScrollLink>
          </div>
          <Menu as="div" className="relative hidden lg:block">
            <div className="flex items-center justify-end w-full h-full">
              <Menu.Button className="flex justify-center px-4 py-2 space-x-2 text-sm font-medium text-white outline-none ring-0 w-fit dark:text-black focus:outline-none ">
                <p>theme</p>
                <HiOutlineColorSwatch className="w-5 h-5">
                  theme color
                </HiOutlineColorSwatch>
                <div
                  className={`w-5 h-5 border border-white dark:border-black rounded ${color.bg}`}
                ></div>
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 w-40 mt-4 origin-top-right bg-indigo-100 outline-none">
                <div className="py-1">
                  <ColorMenuItems />
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
          <div className="absolute top-0 right-0 flex w-full h-full lg:hidden">
            <Menu as="div" className="relative w-full h-full">
              <div className="flex items-center justify-end w-full h-full">
                <Menu.Button className="justify-center px-4 py-2 text-sm font-medium text-white outline-none w-fit dark:text-black focus:outline-none ">
                  <BiMenuAltRight className="w-8 h-8 " aria-hidden="true" />
                </Menu.Button>
              </div>
              {/* <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 -translate-y-160"
                enterTo="transform opacity-100 translate-y-0"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 translate-y-0"
                leaveTo="transform opacity-0 -translate-y-160"
              > */}
              <Menu.Items
                className={`z-10  w-screen outline-none ${color.bg} bg-opacity-70 backdrop-blur-[9.8px] shadow-[0_4px_0_#00000090]`}
              >
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <ScrollLink
                        className={classNames(
                          active
                            ? `${color.text} bg-white dark:bg-black`
                            : "dark:text-white text-black",
                          "block px-4 py-2 text-sm w-full text-left md:hidden"
                        )}
                        href="/#intro"
                      >
                        Intro
                      </ScrollLink>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <ScrollLink
                        className={classNames(
                          active
                            ? `${color.text} bg-white dark:bg-black`
                            : "dark:text-white text-black",
                          "block px-4 py-2 text-sm w-full text-left md:hidden"
                        )}
                        href="/#portfolio"
                      >
                        Portfolio
                      </ScrollLink>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <ScrollLink
                        className={classNames(
                          active
                            ? `${color.text} bg-white dark:bg-black`
                            : "dark:text-white text-black",
                          "block px-4 py-2 text-sm w-full text-left md:hidden"
                        )}
                        href="/#contact"
                      >
                        Contact Me
                      </ScrollLink>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={classNames(
                          active
                            ? `${color.text} bg-white dark:bg-black `
                            : "dark:text-white text-black",
                          "  flex space-x-3 px-4 py-2 text-sm w-full text-left md:hidden"
                        )}
                        onClick={(e) => {
                          e.preventDefault();
                          setShowColors((prev) => !prev);
                        }}
                      >
                        <p>theme</p>
                        <HiOutlineColorSwatch className="w-5 h-5">
                          theme color
                        </HiOutlineColorSwatch>
                        <div
                          className={`w-5 h-5 border border-white dark:border-black rounded ${color.bg}`}
                        ></div>
                      </button>
                    )}
                  </Menu.Item>
                  {showColors ? <ColorMenuItems /> : null}
                </div>
              </Menu.Items>
              {/* </Transition> */}
            </Menu>
          </div>
        </nav>
      </div>
    </>
  );
}

const ColorMenuItems = () => {
  const { setColor } = useThemeColor();
  return (
    <Fragment>
      <Menu.Item>
        {({ active }) => (
          <button
            onClick={() =>
              setColor({
                bg: "bg-indigo-500",
                text: "text-indigo-500",
                border: "border-indigo-500",
                hoverText: "hover:text-indigo-500",
                glow: "drop-shadow-[0_0_2rem_#6366F190]",
                hex: "6366F1",
              })
            }
            className="flex justify-between w-full px-4 py-2 space-x-2 text-sm font-medium text-white dark:text-black focus:outline-none "
          >
            <p>Indigo</p>
            <div
              className={`w-5 h-5 border border-white dark:border-black rounded bg-indigo-500`}
            ></div>
          </button>
        )}
      </Menu.Item>
      <Menu.Item>
        {({ active }) => (
          <button
            onClick={() =>
              setColor({
                bg: "bg-green-500",
                text: "text-green-500",
                border: "border-green-500",
                hoverText: "hover:text-green-500",
                glow: "drop-shadow-[0_0_2rem_#22C55E90]",
                hex: "22C55E",
              })
            }
            className="flex justify-between w-full px-4 py-2 space-x-2 text-sm font-medium text-white dark:text-black focus:outline-none "
          >
            <p>Green</p>
            <div
              className={`w-5 h-5 border border-white dark:border-black rounded bg-green-500`}
            ></div>
          </button>
        )}
      </Menu.Item>
      <Menu.Item>
        {({ active }) => (
          <button
            onClick={() =>
              setColor({
                bg: "bg-blue-500",
                text: "text-blue-500",
                border: "border-blue-500",
                hoverText: "hover:text-blue-500",
                glow: "drop-shadow-[0_0_2rem_#3B82F690]",
                hex: "3B82F6",
              })
            }
            className="flex justify-between w-full px-4 py-2 space-x-2 text-sm font-medium text-white dark:text-black focus:outline-none "
          >
            <p>Blue</p>
            <div
              className={`w-5 h-5 border border-white dark:border-black rounded bg-blue-500`}
            ></div>
          </button>
        )}
      </Menu.Item>
      <Menu.Item>
        {({ active }) => (
          <button
            onClick={() =>
              setColor({
                bg: "bg-red-500",
                text: "text-red-500",
                border: "border-red-500",
                hoverText: "hover:text-red-500",
                glow: "drop-shadow-[0_0_2rem_#EF444490]",
                hex: "EF4444",
              })
            }
            className="flex justify-between w-full px-4 py-2 space-x-2 text-sm font-medium text-white dark:text-black focus:outline-none "
          >
            <p>Red</p>
            <div
              className={`w-5 h-5 border border-white dark:border-black rounded bg-red-500`}
            ></div>
          </button>
        )}
      </Menu.Item>
      <Menu.Item>
        {({ active }) => (
          <button
            onClick={() =>
              setColor({
                bg: "bg-orange-500",
                text: "text-orange-500",
                border: "border-orange-500",
                hoverText: "hover:text-orange-500",
                glow: "drop-shadow-[0_0_2rem_#F9731690]",
                hex: "F97316",
              })
            }
            className="flex justify-between w-full px-4 py-2 space-x-2 text-sm font-medium text-white dark:text-black focus:outline-none "
          >
            <p>Orange</p>
            <div
              className={`w-5 h-5 border border-white dark:border-black rounded bg-orange-500`}
            ></div>
          </button>
        )}
      </Menu.Item>
    </Fragment>
  );
};
