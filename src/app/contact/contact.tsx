import React, { useState, useRef } from "react";
import { BiMailSend } from "react-icons/bi";
import {
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiMail,
  FiMapPin,
} from "react-icons/fi";
import ReCAPTCHA from "react-google-recaptcha";
import emailjs from "@emailjs/browser";
import Heading from "@/components/Heading/Heading";
import { useThemeColor } from "@/context/ColorThemeContext";
import { motion } from "framer-motion";

interface EmailDetails {
  name: string;
  email: string;
  message: string;
}

export default function Contact() {
  const { color } = useThemeColor();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [emailDetails, setEmailDetails] = useState<EmailDetails>({
    name: "",
    email: "",
    message: "",
  });
  const captchaRef = useRef<ReCAPTCHA>(null);

  const handleChange = (e: {
    target: HTMLInputElement | HTMLTextAreaElement;
  }) => {
    setEmailDetails({
      ...emailDetails,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = () => {
    setIsSubmitting(true);
    const token = captchaRef?.current?.getValue();
    captchaRef?.current?.reset();
    if (
      emailDetails.name &&
      emailDetails.email &&
      emailDetails.message &&
      process.env.NEXT_PUBLIC_MAIL_SERVICE_ID &&
      process.env.NEXT_PUBLIC_MAIL_TEMPLATE_ID
    ) {
      emailjs
        .send(
          process.env.NEXT_PUBLIC_MAIL_SERVICE_ID,
          process.env.NEXT_PUBLIC_MAIL_TEMPLATE_ID,
          {
            to_name: "Frederick Ofori-Boadu Osei",
            from_name: emailDetails.name,
            from_email: emailDetails.email,
            message: emailDetails.message,
            "g-recaptcha-response": token,
          },
          process.env.NEXT_PUBLIC_MAIL_API_KEY
        )
        .then(
          (result) => {
            setEmailDetails({ name: "", email: "", message: "" });
            setIsSubmitting(false);
            setIsSuccess(true);
            setTimeout(() => setIsSuccess(false), 5000);
          },
          (error) => {
            setIsSubmitting(false);
          }
        );
    } else {
      setIsSubmitting(false);
    }
  };

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
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      className="flex justify-center w-full h-full pb-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-10 h-fit">
        <motion.div
          className="flex flex-col space-y-8 text-black dark:text-white"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <Heading text="Contact Me" />
          </motion.div>

          <motion.div
            className="text-sm lg:text-base backdrop-blur-sm bg-white/5 dark:bg-black/5 p-6 rounded-xl border border-gray-200 dark:border-gray-800"
            variants={itemVariants}
          >
            <p className="mb-4">
              Let&apos;s collaborate to bring your visions into a reality. I am
              available to work remotely and locally.
            </p>
            <p>
              Reach me on my social media accounts below or send me an email
              using the form.
            </p>
          </motion.div>

          <motion.div
            className="space-y-6 md:space-y-6"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <div className="flex items-center space-x-4 p-4 rounded-xl backdrop-blur-sm bg-white/5 dark:bg-black/5 border border-gray-200 dark:border-gray-800">
                <div className={`p-3 rounded-full ${color.bg} bg-opacity-20`}>
                  <FiMail className={`text-xl ${color.text}`} />
                </div>
                <div>
                  <h3 className="text-sm font-medium">Email</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    friedosei@gmail.com
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="flex items-center space-x-4 p-4 rounded-xl backdrop-blur-sm bg-white/5 dark:bg-black/5 border border-gray-200 dark:border-gray-800">
                <div className={`p-3 rounded-full ${color.bg} bg-opacity-20`}>
                  <FiMapPin className={`text-xl ${color.text}`} />
                </div>
                <div>
                  <h3 className="text-sm font-medium">Location</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Ghana 🇬🇭
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-4 pt-4"
              variants={itemVariants}
            >
              <a
                target="_blank"
                rel="noreferrer noopener"
                data-umami-event="github link"
                href="https://github.com/FrederickOB"
                className={`flex items-center gap-3 px-4 py-3 rounded-xl backdrop-blur-sm bg-white/5 dark:bg-black/5 border border-gray-200 dark:border-gray-800 hover:${color.bg} hover:bg-opacity-10 transition-all duration-300`}
              >
                <FiGithub className={`text-xl ${color.text}`} />
                <span>GitHub</span>
              </a>

              <a
                target="_blank"
                rel="noreferrer noopener"
                href="https://www.linkedin.com/in/frederick-ofori-boadu/"
                data-umami-event="linkedin link"
                className={`flex items-center gap-3 px-4 py-3 rounded-xl backdrop-blur-sm bg-white/5 dark:bg-black/5 border border-gray-200 dark:border-gray-800 hover:${color.bg} hover:bg-opacity-10 transition-all duration-300`}
              >
                <FiLinkedin className={`text-xl ${color.text}`} />
                <span>LinkedIn</span>
              </a>

              <a
                target="_blank"
                rel="noreferrer noopener"
                href="https://twitter.com/FRED_THE_THIRD"
                data-umami-event="twitter link"
                className={`flex items-center gap-3 px-4 py-3 rounded-xl backdrop-blur-sm bg-white/5 dark:bg-black/5 border border-gray-200 dark:border-gray-800 hover:${color.bg} hover:bg-opacity-10 transition-all duration-300`}
              >
                <FiTwitter className={`text-xl ${color.text}`} />
                <span>Twitter</span>
              </a>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex flex-col justify-end"
          variants={containerVariants}
        >
          <motion.div
            className="p-6 rounded-xl backdrop-blur-sm bg-white/5 dark:bg-black/5 border border-gray-200 dark:border-gray-800"
            variants={itemVariants}
          >
            <h3 className={`text-xl font-medium mb-6 ${color.text}`}>
              Send me a message
            </h3>

            <div className="grid grid-cols-1 gap-6">
              <motion.div
                className="relative"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <input
                  type="text"
                  name="name"
                  value={emailDetails.name || ""}
                  className={`w-full py-3 px-4 text-sm bg-white/10 dark:bg-black/10 rounded-lg border ${color.border} focus:ring-2 focus:${color.text} focus:outline-none transition-all duration-300`}
                  placeholder="Full Name"
                  onChange={handleChange}
                />
              </motion.div>

              <motion.div
                className="relative"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <input
                  type="email"
                  name="email"
                  value={emailDetails.email || ""}
                  className={`w-full py-3 px-4 text-sm bg-white/10 dark:bg-black/10 rounded-lg border ${color.border} focus:ring-2 focus:${color.text} focus:outline-none transition-all duration-300`}
                  placeholder="Email Address"
                  onChange={handleChange}
                />
              </motion.div>

              <motion.div
                className="relative"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <textarea
                  name="message"
                  id="message"
                  rows={5}
                  value={emailDetails.message || ""}
                  className={`w-full py-3 px-4 text-sm bg-white/10 dark:bg-black/10 rounded-lg border ${color.border} focus:ring-2 focus:${color.text} focus:outline-none transition-all duration-300`}
                  placeholder="Your Message"
                  onChange={handleChange}
                ></textarea>
              </motion.div>
            </div>

            <motion.div
              className="mt-6 flex flex-col gap-4"
              variants={itemVariants}
            >
              <motion.button
                onClick={onSubmit}
                disabled={
                  !emailDetails.name ||
                  !emailDetails.email ||
                  !emailDetails.message ||
                  isSubmitting
                }
                data-umami-event="send email button"
                className={`flex items-center justify-center py-3 px-6 text-base font-medium ${color.bg} text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </span>
                ) : isSuccess ? (
                  <span className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    Message Sent!
                  </span>
                ) : (
                  <span className="flex items-center">
                    Send Message
                    <BiMailSend className="ml-2 text-xl" />
                  </span>
                )}
              </motion.button>
            </motion.div>
          </motion.div>
          {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
            <div className="relative w-full flex justify-center ">
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                ref={captchaRef}
                size="invisible"
                // theme={theme === "dark" ? "dark" : "light"}
                // className="transform scale-90 origin-center"
              />
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
