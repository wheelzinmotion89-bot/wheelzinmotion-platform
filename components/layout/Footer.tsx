import Link from "next/link";
import { Mail, MonitorCog, Wrench, ShoppingBag } from "lucide-react";

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="border-t border-purple-500/20 bg-black px-6 py-14 text-white">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-3">
        <div>
          <h2 className="text-2xl font-black">
            Wheelz<span className="text-purple-500">InMotion</span>
          </h2>

          <p className="mt-4 max-w-sm leading-7 text-zinc-400">
            Custom PC builds, technology repairs, websites, applications, and
            reliable technology solutions built to keep you moving forward.
          </p>

          <a
            href="mailto:wheelzinmotion89@gmail.com"
            className="mt-6 inline-flex items-center gap-3 text-purple-300 transition hover:text-purple-400"
          >
            <Mail size={20} />
            wheelzinmotion89@gmail.com
          </a>
        </div>

        <div>
          <h3 className="text-lg font-black uppercase tracking-wider text-purple-400">
            Quick Links
          </h3>

          <nav className="mt-5 flex flex-col gap-4 text-zinc-300">
            <Link href="/" className="transition hover:text-purple-400">
              Home
            </Link>

            <Link
              href="/services"
              className="transition hover:text-purple-400"
            >
              Services
            </Link>

            <Link
              href="/marketplace"
              className="transition hover:text-purple-400"
            >
              Marketplace
            </Link>

            <Link href="/about" className="transition hover:text-purple-400">
              About
            </Link>
          </nav>
        </div>

        <div>
          <h3 className="text-lg font-black uppercase tracking-wider text-purple-400">
            Get Started
          </h3>

          <div className="mt-5 flex flex-col gap-4">
            <Link
              href="/pc-builder"
              className="flex items-center gap-3 rounded-xl border border-purple-500/30 bg-zinc-950 p-4 text-zinc-200 transition hover:border-purple-400 hover:bg-purple-950/30"
            >
              <MonitorCog className="text-purple-400" size={22} />
              Build a Custom PC
            </Link>

            <Link
              href="/services"
              className="flex items-center gap-3 rounded-xl border border-purple-500/30 bg-zinc-950 p-4 text-zinc-200 transition hover:border-purple-400 hover:bg-purple-950/30"
            >
              <Wrench className="text-purple-400" size={22} />
              Request a Service
            </Link>

            <Link
              href="/marketplace/sell"
              className="flex items-center gap-3 rounded-xl border border-purple-500/30 bg-zinc-950 p-4 text-zinc-200 transition hover:border-purple-400 hover:bg-purple-950/30"
            >
              <ShoppingBag className="text-purple-400" size={22} />
              Sell Your Technology
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-3 border-t border-zinc-800 pt-8 text-center text-sm text-zinc-500 md:flex-row md:items-center md:justify-between md:text-left">
        <p>© {currentYear} WheelzInMotion. All rights reserved.</p>

        <p>Technology built to keep you moving forward.</p>
      </div>
    </footer>
  );
}