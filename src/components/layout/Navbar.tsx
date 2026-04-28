import { Link, useLocation } from "wouter";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "@/assets/icon_1776665343507.png";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Our Works", path: "/our-works" },
  { name: "Submission", path: "/contact" },
];

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsOpen(false);
  }, [location]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const closeSidebar = useCallback(() => setIsOpen(false), []);
  const openSidebar = useCallback(() => setIsOpen(true), []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-[padding,background-color] duration-200 ${
          scrolled ? "nav-scrolled py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo - Left */}
          <Link href="/">
            <div className="cursor-pointer h-14 w-auto group relative">
              <img
                src={logo}
                alt="INOMADIC"
                className="h-full w-auto object-contain drop-shadow-[0_0_12px_rgba(0,255,136,0.35)] group-hover:drop-shadow-[0_0_24px_rgba(0,255,136,0.65)] transition-[filter] duration-300"
              />
            </div>
          </Link>

          {/* Desktop Nav - Right */}
          <nav className="hidden md:flex items-center gap-5">
            {navLinks.map((link) => (
              <Link key={link.path} href={link.path}>
                <span
                  className={`text-xs font-medium tracking-wider uppercase transition-colors hover:text-primary hover:text-glow cursor-pointer ${
                    location === link.path ? "text-primary text-glow" : "text-gray-400"
                  }`}
                >
                  {link.name}
                </span>
              </Link>
            ))}

            {/* Connect Us — 3D glowing button */}
            <Link href="/connect">
              <span
                className={`cursor-pointer text-xs font-semibold tracking-wider uppercase px-4 py-1.5 rounded-xl border select-none transition-all duration-200
                  ${location === "/connect"
                    ? "bg-primary/20 border-primary text-primary shadow-[0_0_14px_rgba(0,255,136,0.6),0_4px_12px_rgba(0,255,136,0.25),inset_0_1px_0_rgba(255,255,255,0.15)] text-glow"
                    : "bg-primary/10 border-primary/60 text-primary hover:bg-primary/20 hover:border-primary hover:shadow-[0_0_14px_rgba(0,255,136,0.5),0_4px_12px_rgba(0,255,136,0.2),inset_0_1px_0_rgba(255,255,255,0.12)] shadow-[0_2px_6px_rgba(0,255,136,0.15),inset_0_1px_0_rgba(255,255,255,0.08)]"
                  }`}
                style={{ textShadow: "0 0 8px rgba(0,255,136,0.5)" }}
              >
                Connect Us
              </span>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-primary transition-colors"
            onClick={openSidebar}
            aria-label="Open menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeSidebar}
              className="fixed inset-0 bg-black/80 z-[60]"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
              className="fixed top-0 left-0 bottom-0 w-3/4 max-w-sm bg-zinc-950/95 border-r border-white/10 z-[70] flex flex-col p-8"
            >
              <button
                className="self-end text-gray-400 hover:text-primary transition-colors mb-12"
                onClick={closeSidebar}
                aria-label="Close menu"
              >
                <X size={28} />
              </button>

              <nav className="flex flex-col gap-8">
                {navLinks.map((link) => (
                  <Link key={link.path} href={link.path}>
                    <span
                      className={`text-xl font-bold tracking-widest uppercase transition-colors hover:text-primary hover:text-glow cursor-pointer ${
                        location === link.path ? "text-primary text-glow" : "text-gray-300"
                      }`}
                    >
                      {link.name}
                    </span>
                  </Link>
                ))}

                {/* Connect Us mobile */}
                <Link href="/connect">
                  <span
                    className={`cursor-pointer text-xl font-bold tracking-widest uppercase inline-block px-5 py-2 rounded-2xl border transition-all duration-200
                      ${location === "/connect"
                        ? "bg-primary/20 border-primary text-primary shadow-[0_0_18px_rgba(0,255,136,0.6)] text-glow"
                        : "bg-primary/10 border-primary/60 text-primary hover:bg-primary/20 hover:border-primary hover:shadow-[0_0_18px_rgba(0,255,136,0.5)] shadow-[0_2px_8px_rgba(0,255,136,0.15)]"
                      }`}
                  >
                    Connect Us
                  </span>
                </Link>
              </nav>

              <div className="mt-auto">
                <img src={logo} alt="INOMADIC" className="h-10 w-auto opacity-60" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
