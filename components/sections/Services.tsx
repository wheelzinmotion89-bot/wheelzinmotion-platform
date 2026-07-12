"use client";

import { motion } from "framer-motion";
import {
  MonitorCog,
  Laptop,
  Smartphone,
  Tablet,
  Gamepad2,
  Drone,
  Code2,
  Globe,
} from "lucide-react";

const services = [
  ["Custom PC Builds", "High-performance custom PCs built to fit your needs.", MonitorCog],
  ["PC & Laptop Repair", "Diagnosis, repair, and upgrades for all PC and laptop issues.", Laptop],
  ["Phone Repair", "Screen, battery, charging port, and more for major brands.", Smartphone],
  ["Tablet Repair", "iPad, Android tablets, and more. We fix it all.", Tablet],
  ["Console Repair", "PlayStation, Xbox, and Nintendo repairs and maintenance.", Gamepad2],
  ["Drone Repair", "Diagnostics, part replacement, and performance tuning.", Drone],
  ["Software Development", "Custom applications, tools, and software solutions.", Code2],
  ["Website Development", "Modern responsive websites that represent your brand.", Globe],
];

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-black px-6 py-28 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(147,51,234,.28),transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.h2
          className="text-center text-5xl font-black uppercase md:text-7xl"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-purple-500">Services</span>{" "}
          <span className="text-zinc-200">I Offer</span>
        </motion.h2>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {services.map(([title, text, Icon], index) => (
            <motion.div
              key={title as string}
              className="group rounded-3xl border border-purple-500/30 bg-zinc-950/80 p-8 shadow-[0_0_30px_rgba(147,51,234,.18)] backdrop-blur-xl transition hover:-translate-y-2 hover:border-purple-400 hover:shadow-[0_0_55px_rgba(147,51,234,.45)]"
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.07 }}
              viewport={{ once: true }}
            >
              <div className="flex gap-6">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-purple-500 bg-black text-purple-400 transition group-hover:scale-110 group-hover:text-white">
                  <Icon size={42} />
                </div>

                <div>
                  <h3 className="text-2xl font-black uppercase text-purple-400">
                    {title as string}
                  </h3>
                  <p className="mt-3 text-lg leading-8 text-zinc-300">
                    {text as string}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-16 text-center text-2xl font-black uppercase tracking-widest">
          Tech solutions that{" "}
          <span className="text-purple-500">keep you moving forward</span>
        </p>
      </div>
    </section>
  );
}