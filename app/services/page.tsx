"use client";

import Navbar from "@/components/layout/Navbar";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Gamepad2,
  Laptop,
  MonitorCog,
  Smartphone,
  Tablet,
  Drone,
  Code2,
  Globe,
  X,
} from "lucide-react";

const services = [
  {
    title: "Custom PC Builds",
    text: "High performance custom PCs built to fit your needs.",
    details:
      "Gaming PCs, streaming PCs, workstations, budget builds, upgrades, part selection, cable management, Windows setup, and performance testing.",
    icon: MonitorCog,
  },
  {
    title: "PC & Laptop Repair",
    text: "Diagnosis, repair, and upgrades for all PC and laptop issues.",
    details:
      "Slow computer fixes, virus cleanup, RAM upgrades, SSD upgrades, overheating, blue screen errors, Windows issues, hardware replacement, and diagnostics.",
    icon: Laptop,
  },
  {
    title: "Phone Repair",
    text: "Screen, battery, charging port, and more for major brands.",
    details:
      "Phone screen issues, battery problems, charging port problems, software troubleshooting, and general device diagnostics.",
    icon: Smartphone,
  },
  {
    title: "Tablet Repair",
    text: "iPad, Android tablets, and more. We fix it all.",
    details:
      "Tablet screen issues, battery problems, charging issues, software problems, setup help, and performance troubleshooting.",
    icon: Tablet,
  },
  {
    title: "Console Repair",
    text: "PlayStation, Xbox, and Nintendo repairs and maintenance.",
    details:
      "Console overheating, HDMI port issues, storage upgrades, cleaning, controller issues, system errors, and general troubleshooting.",
    icon: Gamepad2,
  },
  {
    title: "Drone Repair",
    text: "Diagnostics, part replacement, and performance tuning.",
    details:
      "Drone diagnostics, propeller replacement, motor issues, connection problems, camera/gimbal problems, firmware issues, and performance checks.",
    icon: Drone,
  },
  {
    title: "Software Development",
    text: "Custom applications, tools, and software solutions.",
    details:
      "Custom business tools, automation, dashboards, internal systems, customer portals, and software solutions built around your needs.",
    icon: Code2,
  },
  {
    title: "Website Development",
    text: "Modern responsive websites that represent your brand.",
    details:
      "Business websites, landing pages, portfolios, service pages, product pages, contact forms, SEO-ready structure, and mobile-friendly designs.",
    icon: Globe,
  },
];

export default function ServicesPage() {
  const [selected, setSelected] = useState<(typeof services)[number] | null>(
    null
  );

  return (
    <>
      <Navbar />

      <main className="relative min-h-screen overflow-hidden bg-black px-6 py-32 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(147,51,234,.28),transparent_60%)]" />

        <section className="relative z-10 mx-auto max-w-7xl">
          <motion.h1
            className="text-center text-5xl font-black uppercase tracking-wide md:text-7xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-purple-500">Services</span>{" "}
            <span className="text-zinc-200">I Offer</span>
          </motion.h1>

          <div className="mt-20 grid gap-8 md:grid-cols-2">
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <motion.button
                  type="button"
                  key={service.title}
                  onClick={() => setSelected(service)}
                  className="group rounded-3xl border border-purple-500/30 bg-zinc-950/80 p-8 text-left shadow-[0_0_30px_rgba(147,51,234,.18)] backdrop-blur-xl transition hover:-translate-y-2 hover:border-purple-400 hover:shadow-[0_0_55px_rgba(147,51,234,.45)]"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                >
                  <div className="flex gap-6">
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-purple-500 bg-black text-purple-400 transition group-hover:scale-110 group-hover:text-white">
                      <Icon size={42} />
                    </div>

                    <div>
                      <h2 className="text-2xl font-black uppercase text-purple-400">
                        {service.title}
                      </h2>
                      <p className="mt-3 text-lg leading-8 text-zinc-300">
                        {service.text}
                      </p>

                      <p className="mt-5 text-sm font-bold uppercase tracking-widest text-purple-300">
                        Click to learn more
                      </p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          <motion.p
            className="mt-20 text-center text-2xl font-black uppercase tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Tech solutions that{" "}
            <span className="text-purple-500">keep you moving forward</span>
          </motion.p>
        </section>

        {selected && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-6 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="relative w-full max-w-2xl rounded-3xl border border-purple-500/40 bg-zinc-950 p-8 shadow-[0_0_70px_rgba(147,51,234,.55)]"
            >
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="absolute right-5 top-5 rounded-full border border-purple-500/40 p-2 text-purple-300 hover:bg-purple-900/40"
                aria-label="Close"
              >
                <X size={22} />
              </button>

              <h2 className="pr-12 text-4xl font-black uppercase text-purple-400">
                {selected.title}
              </h2>

              <p className="mt-6 text-lg leading-8 text-zinc-300">
                {selected.details}
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href={`/services/request?service=${encodeURIComponent(
                    selected.title
                  )}`}
                  className="rounded-full bg-purple-600 px-8 py-4 text-center font-bold text-white transition hover:bg-purple-500"
                >
                  Request This Service
                </a>

                <a
                  href="mailto:wheelzinmotion89@gmail.com"
                  className="rounded-full border border-purple-500 px-8 py-4 text-center font-bold text-purple-300 transition hover:bg-purple-900/30"
                >
                  Email WheelzInMotion
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </main>
    </>
  );
}