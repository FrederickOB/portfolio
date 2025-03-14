import React from "react";
import { motion } from "framer-motion";
import Tabs from "@/components/Tabs/Tabs";
import { useThemeColor } from "@/context/ColorThemeContext";

export default function Projects() {
  const { color } = useThemeColor();
  return (
    <motion.main
      className="flex items-center justify-center w-full min-h-screen py-16 lg:py-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <section className="w-full  relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-12 max-w-2xl"
        >
          <h1
            className={`text-sm font-medium tracking-wider uppercase mb-2 ${color.text}`}
          >
            Portfolio Showcase
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Explore my latest work across different domains. Each project
            represents my commitment to quality, innovation, and user-centered
            design.
          </p>
        </motion.div>

        <Tabs
          list={[
            { id: 1, name: "Front-End Dev" },
            { id: 2, name: "UI/UX" },
          ]}
        />
      </section>
    </motion.main>
  );
}
