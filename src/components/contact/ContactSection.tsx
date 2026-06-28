import { useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { BiMailSend } from "react-icons/bi";
import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiPhone,
  FiTwitter,
} from "react-icons/fi";
import { SITE_LINKS } from "@/content/site-copy";
import { useThemeColor } from "@/context/ColorThemeContext";
import { SectionHeading } from "@/components/content/SectionHeading";

interface EmailDetails {
  name: string;
  email: string;
  message: string;
}

export function ContactSection() {
  const { color } = useThemeColor();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [emailDetails, setEmailDetails] = useState<EmailDetails>({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setEmailDetails({ ...emailDetails, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey =
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY ||
      import.meta.env.VITE_EMAILJS_API_KEY;

    if (
      !emailDetails.name ||
      !emailDetails.email ||
      !emailDetails.message ||
      !serviceId ||
      !templateId ||
      !publicKey
    ) {
      return;
    }

    setIsSubmitting(true);
    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          to_name: "Frederick Ofori-Boadu",
          from_name: emailDetails.name,
          from_email: emailDetails.email,
          message: emailDetails.message,
        },
        publicKey,
      );
      setEmailDetails({ name: "", email: "", message: "" });
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="scroll-mt-32">
      <motion.div
        className="grid w-full grid-cols-1 gap-10 md:grid-cols-2"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="space-y-8">
          <SectionHeading>Contact Me</SectionHeading>
          <div className="glass rounded-xl border p-6 text-sm md:text-base">
            <p className="mb-4 font-medium">Let&apos;s build something.</p>
            <p className="text-muted-foreground">
              Open to frontend, data, or full-stack-of-insight roles and projects.
              Reach me directly or send a message using the form.
            </p>
          </div>

          <div className="space-y-4">
            <div className="glass flex items-center gap-4 rounded-xl border p-4">
              <div className={`rounded-full p-3 ${color.bg} bg-opacity-20`}>
                <FiMail className={`text-xl ${color.text}`} />
              </div>
              <div>
                <h3 className="text-sm font-medium">Email</h3>
                <a
                  href={`mailto:${SITE_LINKS.email}`}
                  className="text-xs text-muted-foreground hover:underline"
                >
                  {SITE_LINKS.email}
                </a>
              </div>
            </div>
            <div className="glass flex items-center gap-4 rounded-xl border p-4">
              <div className={`rounded-full p-3 ${color.bg} bg-opacity-20`}>
                <FiPhone className={`text-xl ${color.text}`} />
              </div>
              <div>
                <h3 className="text-sm font-medium">Phone</h3>
                <a
                  href={`tel:${SITE_LINKS.phoneTel}`}
                  className="text-xs text-muted-foreground hover:underline"
                >
                  {SITE_LINKS.phone}
                </a>
              </div>
            </div>
            <div className="glass flex items-center gap-4 rounded-xl border p-4">
              <div className={`rounded-full p-3 ${color.bg} bg-opacity-20`}>
                <FiMapPin className={`text-xl ${color.text}`} />
              </div>
              <div>
                <h3 className="text-sm font-medium">Location</h3>
                <p className="text-xs text-muted-foreground">Accra, Ghana</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            {[
              { href: SITE_LINKS.github, icon: FiGithub, label: "GitHub" },
              { href: SITE_LINKS.linkedin, icon: FiLinkedin, label: "LinkedIn" },
              { href: SITE_LINKS.twitter, icon: FiTwitter, label: "Twitter" },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                className="glass flex items-center gap-3 rounded-xl border px-4 py-3 text-sm transition hover:bg-white/40 dark:hover:bg-black/30"
              >
                <Icon className={color.text} /> {label}
              </a>
            ))}
          </div>
        </div>

        <div className="glass rounded-xl border p-6">
          <h3 className={`mb-6 text-xl font-medium ${color.text}`}>
            Send me a message
          </h3>
          <div className="grid gap-4">
            <input
              type="text"
              name="name"
              value={emailDetails.name}
              onChange={handleChange}
              placeholder="Full Name"
              className={`w-full rounded-lg border bg-white/10 px-4 py-3 text-sm dark:bg-black/10 ${color.border} focus:outline-none focus:ring-2`}
            />
            <input
              type="email"
              name="email"
              value={emailDetails.email}
              onChange={handleChange}
              placeholder="Email Address"
              className={`w-full rounded-lg border bg-white/10 px-4 py-3 text-sm dark:bg-black/10 ${color.border} focus:outline-none focus:ring-2`}
            />
            <textarea
              name="message"
              rows={5}
              value={emailDetails.message}
              onChange={handleChange}
              placeholder="Your Message"
              className={`w-full rounded-lg border bg-white/10 px-4 py-3 text-sm dark:bg-black/10 ${color.border} focus:outline-none focus:ring-2`}
            />
            <button
              type="button"
              onClick={onSubmit}
              disabled={
                !emailDetails.name ||
                !emailDetails.email ||
                !emailDetails.message ||
                isSubmitting
              }
              className={`flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-medium text-white disabled:cursor-not-allowed disabled:opacity-50 ${color.bg}`}
            >
              {isSubmitting ? (
                "Sending..."
              ) : isSuccess ? (
                "Message Sent!"
              ) : (
                <>
                  Send Message <BiMailSend />
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
