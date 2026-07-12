"use client";

import { motion } from "framer-motion";

export default function AnimatedLogo() {
  return (
    <motion.div
      className="relative mx-auto w-full max-w-3xl"
      initial={{ opacity: 0, scale: 0.85, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="absolute inset-0 rounded-full bg-purple-600/30 blur-[90px]" />

      <motion.img
        src="/logo/wheelzinmotion-logo.png"
        alt="Wheelz In Motion Logo"
        className="relative z-10 mx-auto w-full drop-shadow-[0_0_45px_#9333ea]"
        animate={{
          y: [0, -10, 0],
          filter: [
            "drop-shadow(0 0 30px #9333ea)",
            "drop-shadow(0 0 65px #a855f7)",
            "drop-shadow(0 0 30px #9333ea)",
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      />
    </motion.div>
  );
}
