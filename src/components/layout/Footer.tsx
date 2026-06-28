import { Link } from "react-router-dom";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { SITE_LINKS } from "@/content/site-copy";

export function Footer() {
  return (
    <footer className="glass mt-20 border-t border-gray-200 dark:border-gray-800">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <h3 className="text-lg font-semibold">Frederick Ofori-Boadu</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Frontend engineer by craft. Data analyst by curiosity. Based in Accra,
            Ghana.
          </p>
          <div className="mt-4 flex gap-4">
            <a
              href={SITE_LINKS.github}
              target="_blank"
              rel="noreferrer noopener"
              className="text-muted-foreground hover:text-foreground"
              aria-label="GitHub"
            >
              <FiGithub className="h-5 w-5" />
            </a>
            <a
              href={SITE_LINKS.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="text-muted-foreground hover:text-foreground"
              aria-label="LinkedIn"
            >
              <FiLinkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider">Quick Links</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/" className="hover:text-foreground">
                Home
              </Link>
            </li>
            <li>
              <Link to="/portfolio/frontend" className="hover:text-foreground">
                Frontend Engineering
              </Link>
            </li>
            <li>
              <Link to="/portfolio/data" className="hover:text-foreground">
                Data & Analytics
              </Link>
            </li>
            <li>
              <a href={SITE_LINKS.resume} target="_blank" rel="noreferrer noopener" className="hover:text-foreground">
                Resume
              </a>
            </li>
            <li>
              <a href="/#contact" className="hover:text-foreground">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <a href={`mailto:${SITE_LINKS.email}`} className="hover:text-foreground">
                {SITE_LINKS.email}
              </a>
            </li>
            <li>
              <a href={`tel:${SITE_LINKS.phoneTel}`} className="hover:text-foreground">
                {SITE_LINKS.phone}
              </a>
            </li>
            <li>Accra, Ghana</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-200 px-4 py-4 text-center text-xs text-muted-foreground dark:border-gray-800">
        © {new Date().getFullYear()} Frederick Ofori-Boadu. All rights reserved.
      </div>
    </footer>
  );
}
