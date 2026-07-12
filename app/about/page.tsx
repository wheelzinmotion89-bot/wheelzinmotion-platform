import Navbar from "@/components/layout/Navbar";
import {
  MonitorCog,
  Wrench,
  Globe,
  Smartphone,
  ShieldCheck,
  Star,
  Rocket,
  Cpu,
} from "lucide-react";

const values = [
  {
    title: "Custom PC Builds",
    text: "Gaming, streaming, business, and accessibility-focused builds made with care.",
    icon: MonitorCog,
  },
  {
    title: "Expert Repairs",
    text: "Computer, phone, tablet, console, and drone repairs handled with precision.",
    icon: Wrench,
  },
  {
    title: "Web Development",
    text: "Modern websites built to represent brands and help businesses grow online.",
    icon: Globe,
  },
  {
    title: "Mobile Apps",
    text: "Clean app experiences designed for customers on the go.",
    icon: Smartphone,
  },
  {
    title: "Honest Service",
    text: "Clear communication, fair pricing, and no confusing tech talk.",
    icon: ShieldCheck,
  },
  {
    title: "Built to Last",
    text: "Every project is handled with pride, quality, and attention to detail.",
    icon: Star,
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-6 py-32 text-white">
        <section className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.5em] text-purple-400">
              About WheelzInMotion
            </p>

            <h1 className="mt-4 text-5xl font-black uppercase md:text-7xl">
              Technology Built With Purpose
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-zinc-300">
              WheelzInMotion is built on reliability, creativity, and the
              belief that technology should help people stay connected,
              productive, and moving forward.
            </p>
          </div>

          <div className="mx-auto mt-20 max-w-5xl rounded-[2rem] border border-purple-500/30 bg-zinc-950/80 p-8 text-center shadow-[0_0_60px_rgba(147,51,234,.25)] md:p-14">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-purple-500 bg-black text-purple-400 shadow-[0_0_35px_rgba(147,51,234,.45)]">
              <Rocket size={42} />
            </div>

            <h2 className="mt-8 text-4xl font-black uppercase text-purple-400">
              Our Mission
            </h2>

            <p className="mt-8 text-xl font-bold text-white">
              Technology should empower people.
            </p>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-9 text-zinc-300">
              From custom PCs and electronic repairs to websites and mobile
              applications, our goal is to create solutions that are dependable,
              accessible, and built to perform.
            </p>
          </div>

          <div className="mt-20 grid gap-8 md:grid-cols-4">
            {[
              "Build",
              "Repair",
              "Upgrade",
              "Innovate",
            ].map((word) => (
              <div
                key={word}
                className="rounded-3xl border border-purple-500/30 bg-zinc-950 p-8 text-center shadow-[0_0_30px_rgba(147,51,234,.18)]"
              >
                <Cpu className="mx-auto text-purple-400" size={38} />
                <h3 className="mt-5 text-2xl font-black uppercase text-white">
                  {word}
                </h3>
              </div>
            ))}
          </div>

          <div className="mt-24 text-center">
            <h2 className="text-4xl font-black uppercase md:text-5xl">
              Why Choose{" "}
              <span className="text-purple-500">WheelzInMotion?</span>
            </h2>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {values.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group rounded-3xl border border-purple-500/30 bg-zinc-950/80 p-8 shadow-[0_0_30px_rgba(147,51,234,.16)] transition hover:-translate-y-2 hover:border-purple-400 hover:shadow-[0_0_55px_rgba(147,51,234,.45)]"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-purple-500 bg-black text-purple-400 transition group-hover:scale-110 group-hover:text-white">
                    <Icon size={34} />
                  </div>

                  <h3 className="mt-6 text-2xl font-black text-purple-400">
                    {item.title}
                  </h3>

                  <p className="mt-4 leading-7 text-zinc-300">{item.text}</p>
                </div>
              );
            })}
          </div>

          <div className="mx-auto mt-24 max-w-5xl rounded-[2rem] border border-purple-500/30 bg-gradient-to-r from-purple-950/60 to-black p-10 text-center shadow-[0_0_60px_rgba(147,51,234,.25)]">
            <h2 className="text-3xl font-black uppercase md:text-5xl">
              Built To Move You Forward
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-zinc-300">
              Every repair, every custom PC, every website, and every
              application is built with one goal in mind: helping people move
              forward through technology.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}