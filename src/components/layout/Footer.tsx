import { motion } from "framer-motion";
import { Link } from "wouter";
import { SiBehance, SiInstagram, SiFacebook, SiX, SiYoutube } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";
import logo from "@assets/icon_1776665343507.png";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FaLinkedinIn, href: "https://www.linkedin.com/company/inomadic/?originalSubdomain=in", label: "LinkedIn" },
    { icon: SiBehance, href: "https://www.behance.net/innomadic", label: "Behance" },
    { icon: SiInstagram, href: "https://www.instagram.com/_inomadic_", label: "Instagram" },
    { icon: SiFacebook, href: "https://www.facebook.com/INomadic2020/", label: "Facebook" },
    { icon: SiX, href: "https://x.com/i_nomadic", label: "X (Twitter)" },
    { icon: SiYoutube, href: "https://www.youtube.com/@inomadicofficial2701", label: "YouTube" },
  ];

  return (
    <footer className="border-t border-white/10 bg-black/80 backdrop-blur-md pt-16 pb-8">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            {/* Logo replacing INOMADIC text */}
            <Link href="/">
              <img
                src={logo}
                alt="INOMADIC"
                className="h-12 w-auto mb-5 cursor-pointer drop-shadow-[0_0_10px_rgba(0,255,136,0.3)] hover:drop-shadow-[0_0_20px_rgba(0,255,136,0.6)] transition-all duration-300"
              />
            </Link>
            <p className="text-gray-400 max-w-md mb-6 leading-relaxed">
              We Don't Just Create. We Captivate. Visual storytelling agency crafting brand films, motion graphics & immersive digital experiences.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 w-10 rounded-full glass-panel flex items-center justify-center text-gray-400 hover:text-primary glow-border transition-all"
                    aria-label={link.label}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6 tracking-wide uppercase text-sm">Navigation</h3>
            <ul className="flex flex-col gap-3">
              {[
                { label: "Home", path: "/" },
                { label: "About", path: "/about" },
                { label: "Our Works", path: "/our-works" },
                { label: "Submission", path: "/contact" },
                { label: "Connect Us", path: "/connect" },
              ].map((item) => (
                <li key={item.path}>
                  <Link href={item.path}>
                    <span className="text-gray-400 hover:text-primary transition-colors cursor-pointer text-sm">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6 tracking-wide uppercase text-sm">Contact</h3>
            <ul className="flex flex-col gap-3 text-sm text-gray-400">
              <li>
                <a href="mailto:innomadic.official@gmail.com" className="hover:text-primary transition-colors">
                  innomadic.official@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+919046684054" className="hover:text-primary transition-colors">
                  +91 90466 84054
                </a>
              </li>
              <li className="mt-4">
                Based in India.<br />
                Working Worldwide.
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} INOMADIC. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="/privacy-policy">
              <span className="hover:text-gray-300 transition-colors cursor-pointer">Privacy Policy</span>
            </Link>
            <Link href="/terms-of-service">
              <span className="hover:text-gray-300 transition-colors cursor-pointer">Terms of Service</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
