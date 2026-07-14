"use client";

import { CheckCircle2, Home, Wrench } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function SuccessContent() {
  const searchParams = useSearchParams();

  const reference =
    searchParams.get("reference") || "Request Received";

  const service =
    searchParams.get("service") || "Service Request";

  return (
    <section className="w-full max-w-3xl rounded-3xl border border-purple-500/30 bg-zinc-950 p-8 text-center shadow-[0_0_60px_rgba(147,51,234,.35)] md:p-12">
      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-green-400/40 bg-green-400/10 text-green-400">
        <CheckCircle2 size={52} />
      </div>

      <p className="mt-8 text-sm font-bold uppercase tracking-[0.4em] text-purple-400">
        Request Received
      </p>

      <h1 className="mt-4 text-4xl font-black uppercase text-white md:text-6xl">
        Thank You
      </h1>

      <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-zinc-300">
        Your request for{" "}
        <span className="font-bold text-purple-300">{service}</span> was
        submitted successfully. WheelzInMotion will review your information and
        reply by email.
      </p>

      <div className="mx-auto mt-10 max-w-md rounded-2xl border border-purple-500/30 bg-black p-6">
        <p className="text-sm font-bold uppercase tracking-widest text-zinc-400">
          Reference Number
        </p>

        <p className="mt-3 break-all text-2xl font-black text-purple-400">
          {reference}
        </p>

        <p className="mt-3 text-sm text-zinc-500">
          Keep this number for your records.
        </p>
      </div>

      <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-purple-600 px-8 py-4 font-bold text-white transition hover:bg-purple-500"
        >
          <Home size={20} />
          Return Home
        </Link>

        <Link
          href="/services"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-purple-500 px-8 py-4 font-bold text-purple-300 transition hover:bg-purple-950/40"
        >
          <Wrench size={20} />
          View Services
        </Link>
      </div>
    </section>
  );
}