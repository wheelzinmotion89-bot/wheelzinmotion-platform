"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed left-0 right-0 top-0 z-50"
    >
      <nav className="mx-auto mt-5 flex w-[95%] max-w-7xl items-center justify-between rounded-full border border-purple-500/20 bg-black/40 px-8 py-4 backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo/wheelzinmotion-main.png"
            alt="Wheelz In Motion"
            width={120}
            height={60}
            className="h-12 w-auto"
          />

          <span className="hidden text-xl font-black text-white lg:block">
            Wheelz<span className="text-purple-500">InMotion</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 font-semibold text-white lg:flex">
          <Link href="/">Home</Link>
          <Link href="/services">Services</Link>
          <Link href="/marketplace">Marketplace</Link>
          <Link href="/about">About</Link>
        </div>

      <a
  href="/pc-builder"
  className="hidden rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 px-6 py-3 font-bold text-white transition hover:scale-105 lg:block"
>
  Build a PC
</a>

        <button className="text-white lg:hidden" aria-label="Open menu">
          <Menu />
        </button>
      </nav>
    </motion.header>
  );
}