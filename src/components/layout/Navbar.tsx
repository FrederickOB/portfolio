import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { FiMoon, FiSun } from "react-icons/fi";
import { HiOutlineColorSwatch } from "react-icons/hi";
import { BiMenuAltRight } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import { SITE_LINKS } from "@/content/site-copy";
import { useThemeColor } from "@/context/ColorThemeContext";
import { THEME_COLOR_OPTIONS } from "@/lib/theme-colors";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { name: "Home", href: "/", external: false },
  { name: "Frontend Engineering", href: "/portfolio/frontend", external: false },
  { name: "Data & Analytics", href: "/portfolio/data", external: false },
  { name: "Resume", href: SITE_LINKS.resume, external: true },
  { name: "Contact", href: "/#contact", external: false, hash: true },
];

export function Navbar() {
  const { color, setColor } = useThemeColor();
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string, hash?: boolean) => {
    if (hash) return location.pathname === "/" && location.hash === "#contact";
    if (href === "/") return location.pathname === "/" && location.hash !== "#contact";
    return location.pathname === href;
  };

  const NavLink = ({
    href,
    name,
    external,
    hash,
  }: {
    href: string;
    name: string;
    external?: boolean;
    hash?: boolean;
  }) => {
    const active = isActive(href, hash);
    const className = cn(
      "px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap",
      active
        ? `${color.bg} text-white`
        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
    );

    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          className={className}
          onClick={() => setMobileOpen(false)}
        >
          {name}
        </a>
      );
    }

    if (hash || href.includes("#")) {
      return (
        <a href={href} className={className} onClick={() => setMobileOpen(false)}>
          {name}
        </a>
      );
    }

    return (
      <Link to={href} className={className} onClick={() => setMobileOpen(false)}>
        {name}
      </Link>
    );
  };

  const ColorPicker = ({ onSelect }: { onSelect?: () => void }) => (
    <div className="grid grid-cols-3 gap-2 p-2">
      {THEME_COLOR_OPTIONS.map((option) => (
        <button
          key={option.name}
          type="button"
          title={option.name}
          onClick={() => {
            setColor(option.color);
            onSelect?.();
          }}
          className={cn(
            "flex items-center gap-2 rounded-lg px-2 py-2 text-xs hover:bg-gray-100 dark:hover:bg-gray-800",
            color.hex === option.color.hex && "ring-2 ring-offset-2 ring-gray-400",
          )}
        >
          <span className={cn("h-4 w-4 rounded-full", option.color.bg)} />
          {option.name}
        </button>
      ))}
    </div>
  );

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 z-40 w-full backdrop-blur-md transition-all duration-300",
          isScrolled ? "py-2" : "py-4",
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between gap-4">
            <Link
              to="/"
              className={cn("flex shrink-0 items-center rounded-full px-4 py-1", color.bg)}
            >
              <img
                src="/logo.svg"
                alt="Frederick's Logo"
                className="h-8 w-20 object-contain invert dark:invert-0"
              />
            </Link>

            <div className="hidden items-center gap-1 lg:flex">
              {navLinks.map((link) => (
                <NavLink key={link.name} {...link} />
              ))}
            </div>

            <div className="hidden items-center gap-3 md:flex">
              {mounted && (
                <button
                  type="button"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="rounded-full bg-gray-100 p-2 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? (
                    <FiSun className="h-5 w-5" />
                  ) : (
                    <FiMoon className="h-5 w-5" />
                  )}
                </button>
              )}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="flex items-center gap-2 rounded-full bg-gray-100 p-2 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                    aria-label="Choose accent color"
                  >
                    <HiOutlineColorSwatch className="h-5 w-5" />
                    <span className={cn("h-3 w-3 rounded-full", color.bg)} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52">
                  <ColorPicker />
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <button
              type="button"
              className="rounded-full bg-gray-100 p-2 lg:hidden dark:bg-gray-800"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <BiMenuAltRight className="h-6 w-6" />
            </button>
          </nav>
        </div>
      </motion.header>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <motion.div
            className="absolute right-0 top-0 bottom-0 w-3/4 max-w-sm overflow-y-auto bg-white p-6 shadow-xl dark:bg-gray-900"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
          >
            <div className="flex flex-col gap-3 pt-8">
              {navLinks.map((link) => (
                <NavLink key={link.name} {...link} />
              ))}
            </div>
            <div className="mt-8 space-y-4 border-t pt-6 dark:border-gray-800">
              {mounted && (
                <button
                  type="button"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="flex items-center gap-2 text-sm"
                >
                  {theme === "dark" ? <FiSun /> : <FiMoon />}
                  {theme === "dark" ? "Light mode" : "Dark mode"}
                </button>
              )}
              <p className="text-sm font-medium">Accent color</p>
              <ColorPicker onSelect={() => setMobileOpen(false)} />
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
