"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navigationLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Marketplace", href: "/marketplace" },
  { name: "About", href: "/about" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed left-0 right-0 top-0 z-50"
    >
      <nav className="relative mx-auto mt-5 w-[95%] max-w-7xl rounded-[2rem] border border-purple-500/20 bg-black/80 px-5 py-4 shadow-[0_0_30px_rgba(147,51,234,.15)] backdrop-blur-xl md:px-8">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            onClick={closeMenu}
            className="flex min-w-0 items-center gap-3"
          >
            <Image
              src="/logo/wheelzinmotion-main.png"
              alt="Wheelz In Motion"
              width={120}
              height={60}
              priority
              className="h-10 w-auto sm:h-12"
            />

            <span className="hidden text-xl font-black text-white sm:block">
              Wheelz<span className="text-purple-500">InMotion</span>
            </span>
          </Link>

          <div className="hidden items-center gap-8 font-semibold text-white lg:flex">
            {navigationLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="transition hover:text-purple-400"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <Link
            href="/pc-builder"
            className="hidden rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 px-6 py-3 font-bold text-white transition hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,.7)] lg:block"
          >
            Build a PC
          </Link>

          <button
            type="button"
            onClick={() => setIsOpen((current) => !current)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-purple-500/30 bg-purple-950/30 text-white transition hover:border-purple-400 hover:bg-purple-900/40 lg:hidden"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            {isOpen ? <X size={25} /> : <Menu size={25} />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-navigation"
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden lg:hidden"
            >
              <div className="mt-5 border-t border-purple-500/20 pt-5">
                <div className="flex flex-col gap-2">
                  {navigationLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={closeMenu}
                      className="rounded-xl px-4 py-3 font-semibold text-white transition hover:bg-purple-950/50 hover:text-purple-300"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>

                <Link
                  href="/pc-builder"
                  onClick={closeMenu}
                  className="mt-4 flex w-full items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 px-6 py-4 font-bold text-white transition hover:shadow-[0_0_30px_rgba(168,85,247,.7)]"
                >
                  Build a PC
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}