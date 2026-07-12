"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 py-16 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(147,51,234,.35),transparent_60%)]" />

      <motion.div
        className="relative z-10 mx-auto max-w-6xl text-center"
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
      >
        <motion.img
          src="/logo/wheelzinmotion-main.png"
          alt="Wheelz In Motion"
          className="mx-auto mb-10 w-full max-w-3xl drop-shadow-[0_0_45px_#9333ea]"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

       <div className="mt-12 flex flex-col justify-center gap-5 sm:flex-row">
  <a
    href="/services"
    className="rounded-full bg-purple-600 px-10 py-4 font-bold transition hover:bg-purple-500 hover:shadow-[0_0_35px_#9333ea]"
  >
    View Services
  </a>

  <a
    href="/contact"
    className="rounded-full border border-purple-500 px-10 py-4 font-bold text-purple-300 transition hover:bg-purple-900/30"
  >
    Contact Us
  </a>
</div>
      </motion.div>
    </section>
  );
}