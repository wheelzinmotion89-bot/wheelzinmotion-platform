"use client";

import Navbar from "@/components/layout/Navbar";
import { useState } from "react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
const computerUses = [
  "Gaming",
  "Streaming",
  "Business",
  "School",
  "Video Editing",
  "Music Production",
  "Software Development",
  "Everyday Use",
  "Other",
];

const budgets = [
  "Under $750",
  "$750 - $1,000",
  "$1,000 - $1,500",
  "$1,500 - $2,000",
  "$2,000 - $3,000",
  "$3,000+",
  "Not Sure",
];

export default function PCBuilderPage() {
  const [status, setStatus] = useState("");
  const [isSending, setIsSending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSending) return;

    const form = event.currentTarget;
    const formData = new FormData(form);

    setIsSending(true);
    setStatus("Sending your custom PC request...");

    try {
      const response = await fetch("/api/pc-builder", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to submit your request.");
      }

      setStatus("Your custom PC request was sent successfully!");
      form.reset();
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSending(false);
    }
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-6 py-32 text-white">
        <section className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.45em] text-purple-400">
              WheelzInMotion Custom PCs
            </p>

            <h1 className="mt-5 text-5xl font-black uppercase md:text-7xl">
              Build Your Dream PC
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-zinc-300">
              Tell us how you plan to use your computer, your budget, and your
              preferred features. WheelzInMotion will review your request and
              contact you by email.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-16 space-y-8 rounded-3xl border border-purple-500/30 bg-zinc-950 p-8 shadow-[0_0_50px_rgba(147,51,234,.3)] md:p-12"
          >
            <div>
              <h2 className="text-2xl font-black uppercase text-purple-400">
                Contact Information
              </h2>

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <input
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="Full Name"
                  className="rounded-xl border border-purple-500/30 bg-black p-4 outline-none transition focus:border-purple-400"
                />

                <input
                  name="email"
                  required
                  type="email"
                  autoComplete="email"
                  placeholder="Email Address"
                  className="rounded-xl border border-purple-500/30 bg-black p-4 outline-none transition focus:border-purple-400"
                />
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-purple-400">
                Build Information
              </h2>

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <select
                  name="computerUse"
                  required
                  defaultValue=""
                  className="rounded-xl border border-purple-500/30 bg-black p-4 outline-none transition focus:border-purple-400"
                >
                  <option value="" disabled>
                    What will you use the PC for?
                  </option>

                  {computerUses.map((use) => (
                    <option key={use} value={use}>
                      {use}
                    </option>
                  ))}
                </select>

                <select
                  name="budget"
                  required
                  defaultValue=""
                  className="rounded-xl border border-purple-500/30 bg-black p-4 outline-none transition focus:border-purple-400"
                >
                  <option value="" disabled>
                    Select Your Budget
                  </option>

                  {budgets.map((budget) => (
                    <option key={budget} value={budget}>
                      {budget}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-purple-400">
                Component Preferences
              </h2>

              <p className="mt-2 text-sm text-zinc-400">
                Leave a field blank when you want WheelzInMotion to recommend
                the best option.
              </p>

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <input
                  name="cpuPreference"
                  placeholder="CPU Preference — Intel, AMD, or Not Sure"
                  className="rounded-xl border border-purple-500/30 bg-black p-4 outline-none transition focus:border-purple-400"
                />

                <input
                  name="gpuPreference"
                  placeholder="GPU Preference — NVIDIA, AMD, or Not Sure"
                  className="rounded-xl border border-purple-500/30 bg-black p-4 outline-none transition focus:border-purple-400"
                />

                <select
                  name="memory"
                  defaultValue="Not Sure"
                  className="rounded-xl border border-purple-500/30 bg-black p-4 outline-none transition focus:border-purple-400"
                >
                  <option>Not Sure</option>
                  <option>16GB RAM</option>
                  <option>32GB RAM</option>
                  <option>64GB RAM</option>
                  <option>128GB RAM</option>
                </select>

                <select
                  name="storage"
                  defaultValue="Not Sure"
                  className="rounded-xl border border-purple-500/30 bg-black p-4 outline-none transition focus:border-purple-400"
                >
                  <option>Not Sure</option>
                  <option>1TB SSD</option>
                  <option>2TB SSD</option>
                  <option>4TB SSD</option>
                  <option>Multiple Drives</option>
                </select>

                <select
                  name="caseSize"
                  defaultValue="No Preference"
                  className="rounded-xl border border-purple-500/30 bg-black p-4 outline-none transition focus:border-purple-400"
                >
                  <option>No Preference</option>
                  <option>Small Form Factor</option>
                  <option>Mid Tower</option>
                  <option>Full Tower</option>
                </select>

                <select
                  name="operatingSystem"
                  defaultValue="Windows 11"
                  className="rounded-xl border border-purple-500/30 bg-black p-4 outline-none transition focus:border-purple-400"
                >
                  <option>Windows 11</option>
                  <option>Linux</option>
                  <option>No Operating System</option>
                  <option>Not Sure</option>
                </select>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-purple-400">
                Additional Features
              </h2>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <label className="flex items-center gap-3 rounded-xl border border-purple-500/30 bg-black p-4">
                  <input
                    type="checkbox"
                    name="features"
                    value="Wi-Fi and Bluetooth"
                    className="h-5 w-5 accent-purple-600"
                  />
                  Wi-Fi and Bluetooth
                </label>

                <label className="flex items-center gap-3 rounded-xl border border-purple-500/30 bg-black p-4">
                  <input
                    type="checkbox"
                    name="features"
                    value="RGB Lighting"
                    className="h-5 w-5 accent-purple-600"
                  />
                  RGB Lighting
                </label>

                <label className="flex items-center gap-3 rounded-xl border border-purple-500/30 bg-black p-4">
                  <input
                    type="checkbox"
                    name="features"
                    value="Liquid Cooling"
                    className="h-5 w-5 accent-purple-600"
                  />
                  Liquid Cooling
                </label>

                <label className="flex items-center gap-3 rounded-xl border border-purple-500/30 bg-black p-4">
                  <input
                    type="checkbox"
                    name="features"
                    value="Accessibility Setup"
                    className="h-5 w-5 accent-purple-600"
                  />
                  Accessibility Setup
                </label>
              </div>
            </div>

            <textarea
              name="notes"
              rows={7}
              placeholder="Tell us about the games, software, performance goals, color preferences, accessories, or other features you want."
              className="w-full resize-y rounded-xl border border-purple-500/30 bg-black p-4 outline-none transition focus:border-purple-400"
            />

          <button
  type="submit"
  disabled={isSending}
  className="w-full rounded-full bg-purple-600 py-4 text-lg font-bold transition hover:bg-purple-500 hover:shadow-[0_0_30px_rgba(147,51,234,.65)] disabled:cursor-not-allowed disabled:opacity-60"
>
  {isSending ? (
    <LoadingSpinner label="Sending Build Request..." />
  ) : (
    "Submit Build Request"
  )}
</button>

            {status && (
              <p
                aria-live="polite"
                className="text-center font-semibold text-purple-300"
              >
                {status}
              </p>
            )}
          </form>
        </section>
      </main>
    </>
  );
}