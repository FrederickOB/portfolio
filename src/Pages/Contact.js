import React, { useState, useRef } from "react";
import { BiMailSend } from "react-icons/bi";
import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";
import ReCAPTCHA from "react-google-recaptcha";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [emailDetails, setEmailDetails] = useState({});
  const captchaRef = useRef(null);

  const handleChange = (e) => {
    setEmailDetails({
      ...emailDetails,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = () => {
    const token = captchaRef.current.getValue();
    captchaRef.current.reset();
    if (emailDetails.name && emailDetails.email && emailDetails.message) {
      emailjs
        .send(
          process.env.REACT_APP_MAIL_SERVICE_ID,
          process.env.REACT_APP_MAIL_TEMPLATE_ID,
          {
            to_name: "Frederick Ofori-Boadu Osei",
            from_name: emailDetails.name,
            from_email: emailDetails.email,
            message: emailDetails.message,
            "g-recaptcha-response": token,
          },
          process.env.REACT_APP_MAIL_API_KEY
        )
        .then(
          (result) => {
            setEmailDetails({ name: "", email: "", message: "" });
          },
          (error) => {
            console.log(error.text);
          }
        );
    }
  };
  return (
    <div className="flex items-center w-full p-10 md:h-screen">
      <div className="grid w-full grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col justify-between mt-4 text-white">
          <div className="w-full text ">
            <h1 className="mb-6 text-xl font-bold text-blue-400 md:text-4xl md:mb-0">
              Contact me
            </h1>
          </div>
          <div className="pr-10 text-sm md:text-xl">
            <p>
              Let collaborate to bring your visions into a reality. available to
              work remotely and locally.
            </p>
            <h3 className="mb-10">
              Reach on my following social media accounts and send me an email
              using the form.
            </h3>
          </div>
          <div className="space-y-4 md:space-y-10 ">
            <div className="">
              <a
                target="_blank"
                rel="noreferrer noopener"
                href="https://github.com/FrederickOB"
                className="flex transition-colors duration-700 md:text-2xl hover:text-blue-400 hover:animate-pulse"
              >
                <FiGithub />
                <span className="ml-4">@FrederickOB</span>
              </a>
            </div>
            <div>
              <a
                target="_blank"
                rel="noreferrer noopener"
                href="https://www.linkedin.com/in/frederick-ofori-boadu/"
                className="flex transition-colors duration-700 md:text-2xl hover:text-blue-400 hover:animate-pulse"
              >
                <FiLinkedin />
                <span className="ml-4"> Frederick Ofori-Boadu</span>
              </a>
            </div>
            <div>
              <a
                target="_blank"
                rel="noreferrer noopener"
                href="https://twitter.com/FRED_THE_THIRD"
                className="flex transition-colors duration-700 md:text-2xl hover:text-blue-400 hover:animate-pulse"
              >
                <FiTwitter />
                <span className="ml-4"> @FRED_THE_THIRD</span>
              </a>
            </div>
          </div>
          <div></div>
        </div>

        <div className="flex flex-col justify-end ">
          <div className="mt-4 mb-8 leading-10 text-white ">
            <div className="grid grid-cols-2 gap-6 ">
              <input
                type="text"
                name="name"
                value={emailDetails.name || ""}
                className="col-span-2 px-4 py-2 text-white bg-transparent border-2 border-white rounded-lg"
                placeholder="Full Name"
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                value={emailDetails.email || ""}
                className="col-span-2 px-4 py-2 bg-transparent bg-opacity-25 border-2 border-white rounded-lg"
                placeholder="E-Mail"
                onChange={handleChange}
              />

              <textarea
                name="message"
                id="message"
                cols="30"
                rows="10"
                value={emailDetails.message || ""}
                className="col-span-2 px-4 py-2 bg-transparent bg-opacity-25 border-2 border-white rounded-lg"
                placeholder="Enter Message"
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          <div className="md:justify-between md:flex ">
            <ReCAPTCHA
              sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
              ref={captchaRef}
            />

            <button
              onClick={onSubmit}
              disabled={
                !emailDetails.name ||
                !emailDetails.email ||
                !emailDetails.message
              }
              className="flex items-center py-2 pl-4 pr-5 text-base transition-transform bg-blue-400 rounded-lg hover:scale-110"
            >
              send mail
              <BiMailSend className="ml-2 text-xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
