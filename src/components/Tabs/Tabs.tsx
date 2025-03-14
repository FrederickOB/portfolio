import { QueryData, useGetProjects, useGetUIUX } from "@/api";
import { Tab } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCards from "../Cards/ProjectCards";
import Heading from "../Heading/Heading";
import { useThemeColor } from "@/context/ColorThemeContext";
import { useState, useEffect } from "react";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export interface List {
  id: number;
  name: string;
}

interface TabProps {
  list: List[];
}

export default function Tabs({ list }: TabProps) {
  const { projects } = useGetProjects();
  const { color } = useThemeColor();
  const { uiux } = useGetUIUX();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <>
      <motion.div
        className="relative w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <div className="flex flex-col gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
            >
              <Heading text="My Portfolio" />
              <div
                className={`relative p-1 ${color.bg} rounded-full shadow-lg w-full  `}
              >
                <Tab.List className="flex space-x-1">
                  <div className="flex items-center w-full">
                    {list.map((item: List, idx: number) => (
                      <Tab
                        key={item.id || idx}
                        className={({ selected }) =>
                          classNames(
                            "w-full min-w-[6rem] lg:min-w-[10rem] py-3 text-sm font-medium leading-5 rounded-full transition-all duration-300 ease-in-out",
                            "focus:outline-none relative z-10",
                            selected
                              ? `bg-white shadow-md ${color.text}`
                              : "text-white/80 hover:text-white hover:bg-white/10"
                          )
                        }
                      >
                        <span className="flex items-center justify-center gap-2">
                          {item.name === "Front-End Dev" ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-4 h-4"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-4 h-4"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <circle cx="12" cy="12" r="10" />
                              <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                              <line x1="9" y1="9" x2="9.01" y2="9" />
                              <line x1="15" y1="9" x2="15.01" y2="9" />
                            </svg>
                          )}
                          {item.name}
                        </span>
                      </Tab>
                    ))}
                  </div>
                </Tab.List>
              </div>
            </motion.div>
          </div>

          <AnimatePresence mode="wait">
            <Tab.Panels className="mt-3 lg:mt-8">
              {isLoading ? (
                <motion.div
                  className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 min-h-[400px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="bg-gray-100 dark:bg-gray-800 rounded-xl h-[350px] animate-pulse"
                    ></div>
                  ))}
                </motion.div>
              ) : (
                <>
                  <Tab.Panel
                    className={classNames("rounded-xl focus:outline-none")}
                  >
                    <motion.div
                      className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {projects && projects.length > 0 ? (
                        projects.map((item: QueryData) => (
                          <motion.div key={item.id} variants={itemVariants}>
                            <ProjectCards
                              title={item.title}
                              description={item.description}
                              stack={item.stack}
                              picture={item.image}
                            />
                          </motion.div>
                        ))
                      ) : (
                        <motion.div
                          className="col-span-full text-center py-12"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <p className="text-gray-500 dark:text-gray-400">
                            No projects available
                          </p>
                        </motion.div>
                      )}
                    </motion.div>
                  </Tab.Panel>
                  <Tab.Panel
                    className={classNames("rounded-xl focus:outline-none")}
                  >
                    <motion.div
                      className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {uiux && uiux.length > 0 ? (
                        uiux.map((item: QueryData) => (
                          <motion.div key={item.id} variants={itemVariants}>
                            <ProjectCards
                              title={item.title}
                              description={item.description}
                              stack={item.stack}
                              picture={item.image}
                            />
                          </motion.div>
                        ))
                      ) : (
                        <motion.div
                          className="col-span-full text-center py-12"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <p className="text-gray-500 dark:text-gray-400">
                            No UI/UX projects available
                          </p>
                        </motion.div>
                      )}
                    </motion.div>
                  </Tab.Panel>
                </>
              )}
            </Tab.Panels>
          </AnimatePresence>
        </Tab.Group>
      </motion.div>
    </>
  );
}
