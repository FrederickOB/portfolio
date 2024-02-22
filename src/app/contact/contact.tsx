import React, { useState, useRef } from "react";
import { BiMailSend } from "react-icons/bi";
import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";
import ReCAPTCHA from "react-google-recaptcha";
import emailjs from "@emailjs/browser";
import Heading from "@/components/Heading/Heading";
import { useThemeColor } from "@/context/ColorThemeContext";

interface EmailDetails {
  name: string;
  email: string;
  message: string;
}

export default function Contact() {
  const { color } = useThemeColor();

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
          },
          (error) => {
            // console.log(error.text);
          }
        );
    }
  };
  return (
    <main className="flex justify-center w-screen h-full min-h-screen px-8 py-12 lg:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-[75rem] gap-10 h-fit">
        <div className="flex flex-col space-y-8 text-white dark:text-white">
          <Heading text="Contact Me" />
          <div className="text-xs text-black bg-white lg:text-base dark:text-white dark:bg-black">
            <p>
              Let&apos;s collaborate to bring your visions into a reality. I am
              available to work remotely and locally.
            </p>
            <p>
              Reach me on my social media accounts below or send me an email
              using the form.
            </p>
          </div>
          <div className="space-y-4 bg-white md:space-y-4 dark:bg-black">
            <a
              target="_blank"
              rel="noreferrer noopener"
              data-umami-event="github link"
              href="https://github.com/FrederickOB"
              className={`flex items-center space-x-4 transition-colors duration-700 ${color.hoverText} hover:animate-pulse ${color.text}`}
            >
              <FiGithub />
              <span>@FrederickOB</span>
            </a>

            <a
              target="_blank"
              rel="noreferrer noopener"
              href="https://www.linkedin.com/in/frederick-ofori-boadu/"
              data-umami-event="linkedin link"
              className={`flex items-center space-x-4 transition-colors duration-700 ${color.hoverText} hover:animate-pulse ${color.text}`}
            >
              <FiLinkedin />
              <span className="ml-4"> Frederick Ofori-Boadu</span>
            </a>

            <a
              target="_blank"
              rel="noreferrer noopener"
              href="https://twitter.com/FRED_THE_THIRD"
              data-umami-event="twitter link"
              className={`flex items-center space-x-4 transition-colors duration-700 ${color.hoverText} hover:animate-pulse ${color.text}`}
            >
              <FiTwitter />
              <span className="ml-4"> @FRED_THE_THIRD</span>
            </a>
          </div>
        </div>

        <div className="flex flex-col justify-end ">
          <div className="mt-4 mb-8 leading-10 ">
            <div className="grid grid-cols-2 gap-6 ">
              <input
                type="text"
                name="name"
                value={emailDetails.name || ""}
                className={`col-span-2 py-1 text-xs ${color.text} bg-transparent border-b-2 ${color.border} lg:text-sm focus:outline-none`}
                placeholder="Full Name"
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                value={emailDetails.email || ""}
                className={`col-span-2 py-1 text-xs ${color.text} bg-transparent bg-opacity-25 border-b-2 ${color.border} lg:text-sm focus:outline-none`}
                placeholder="E-Mail"
                onChange={handleChange}
              />

              <textarea
                name="message"
                id="message"
                cols={30}
                rows={5}
                value={emailDetails.message || ""}
                className={`col-span-2 py-1 text-xs ${color.text} bg-transparent bg-opacity-25 border-b-2 ${color.border} lg:text-sm focus:outline-none`}
                placeholder="Enter Message"
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          <div className="flex-col space-y-6 md:justify-between md:flex lg:flex-row">
            {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                ref={captchaRef}
                size="invisible"
              />
            )}
            <button
              onClick={onSubmit}
              disabled={
                !emailDetails.name ||
                !emailDetails.email ||
                !emailDetails.message
              }
              data-umami-event="send email button"
              className={`flex items-center justify-center py-2 pl-4 pr-5 text-base transition-transform ${color.bg} rounded-lg h-fit hover:scale-110 disabled:grayscale`}
            >
              <p> send mail</p>
              <BiMailSend className="ml-2 text-xl" />
            </button>
            {/* {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                ref={captchaRef}
              />
            )} */}
          </div>
        </div>
      </div>
    </main>
  );
}
