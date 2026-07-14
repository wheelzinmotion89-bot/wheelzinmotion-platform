"use client";

import Navbar from "@/components/layout/Navbar";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";

const deviceTypes = [
  "Desktop Computer",
  "Gaming PC",
  "Laptop",
  "Phone",
  "Tablet",
  "Game Console",
  "Graphics Card",
  "Processor (CPU)",
  "Motherboard",
  "Memory (RAM)",
  "Storage",
  "Power Supply",
  "Monitor",
  "Networking Equipment",
  "Drone",
  "Other",
];

const conditions = [
  "Brand New",
  "Like New",
  "Excellent",
  "Good",
  "Fair",
  "Needs Repair",
  "For Parts",
];

export default function SellTechnologyPage() {
  const [status, setStatus] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [wasSuccessful, setWasSuccessful] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSending) {
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    setIsSending(true);
    setWasSuccessful(false);
    setStatus("Sending your submission...");

    try {
      const response = await fetch("/api/marketplace/sell", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Unable to send your marketplace submission.",
        );
      }

      setWasSuccessful(true);
      setStatus(
        "Submission sent successfully. WheelzInMotion will review your technology and reply by email.",
      );

      form.reset();
    } catch (error) {
      setWasSuccessful(false);
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
        <section className="mx-auto max-w-4xl rounded-3xl border border-purple-500/30 bg-zinc-950 p-8 shadow-[0_0_50px_rgba(147,51,234,.3)] md:p-12">
          <p className="text-sm font-bold uppercase tracking-[0.4em] text-purple-400">
            WheelzInMotion Marketplace
          </p>

          <h1 className="mt-4 text-4xl font-black uppercase md:text-6xl">
            Sell Your Technology
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-300">
            Submit your device or component for review. WheelzInMotion will
            evaluate the information and contact you by email.
          </p>

          <form onSubmit={handleSubmit} className="mt-10 space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block font-bold text-purple-300"
                >
                  Full Name
                </label>

                <input
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-purple-500/30 bg-black p-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-purple-400"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block font-bold text-purple-300"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  required
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email address"
                  className="w-full rounded-xl border border-purple-500/30 bg-black p-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-purple-400"
                />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="deviceType"
                  className="mb-2 block font-bold text-purple-300"
                >
                  Device Type
                </label>

                <select
                  id="deviceType"
                  name="deviceType"
                  required
                  defaultValue=""
                  className="w-full rounded-xl border border-purple-500/30 bg-black p-4 text-white outline-none transition focus:border-purple-400"
                >
                  <option value="" disabled>
                    Select Device Type
                  </option>

                  {deviceTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="condition"
                  className="mb-2 block font-bold text-purple-300"
                >
                  Condition
                </label>

                <select
                  id="condition"
                  name="condition"
                  required
                  defaultValue=""
                  className="w-full rounded-xl border border-purple-500/30 bg-black p-4 text-white outline-none transition focus:border-purple-400"
                >
                  <option value="" disabled>
                    Select Condition
                  </option>

                  {conditions.map((condition) => (
                    <option key={condition} value={condition}>
                      {condition}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="brand"
                  className="mb-2 block font-bold text-purple-300"
                >
                  Brand
                </label>

                <input
                  id="brand"
                  name="brand"
                  required
                  placeholder="Example: Apple, Dell, Samsung"
                  className="w-full rounded-xl border border-purple-500/30 bg-black p-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-purple-400"
                />
              </div>

              <div>
                <label
                  htmlFor="model"
                  className="mb-2 block font-bold text-purple-300"
                >
                  Model
                </label>

                <input
                  id="model"
                  name="model"
                  required
                  placeholder="Enter the model"
                  className="w-full rounded-xl border border-purple-500/30 bg-black p-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-purple-400"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="askingPrice"
                className="mb-2 block font-bold text-purple-300"
              >
                Asking Price
              </label>

              <input
                id="askingPrice"
                name="askingPrice"
                type="number"
                min="0"
                step="0.01"
                placeholder="Optional"
                className="w-full rounded-xl border border-purple-500/30 bg-black p-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-purple-400"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="mb-2 block font-bold text-purple-300"
              >
                Item Description
              </label>

              <textarea
                id="description"
                name="description"
                required
                rows={7}
                placeholder="Describe the device, included accessories, defects, upgrades, repairs, battery condition, and anything else we should know."
                className="w-full resize-y rounded-xl border border-purple-500/30 bg-black p-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-purple-400"
              />
            </div>

            <div className="rounded-xl border border-purple-500/30 bg-black p-5">
              <label
                htmlFor="photos"
                className="block font-bold text-purple-300"
              >
                Upload Photos
              </label>

              <p className="mt-2 text-sm leading-6 text-zinc-400">
                Optional. Upload up to five images, with a maximum size of 5 MB
                each.
              </p>

              <input
                id="photos"
                name="photos"
                type="file"
                accept="image/*"
                multiple
                className="mt-4 w-full text-sm text-zinc-300 file:mr-4 file:rounded-full file:border-0 file:bg-purple-600 file:px-5 file:py-3 file:font-bold file:text-white hover:file:bg-purple-500"
              />
            </div>

            <button
              type="submit"
              disabled={isSending}
              className="w-full rounded-full bg-purple-600 py-4 text-lg font-bold transition hover:bg-purple-500 hover:shadow-[0_0_30px_rgba(147,51,234,.65)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSending ? (
                <LoadingSpinner label="Sending Submission..." />
              ) : (
                "Submit Your Technology"
              )}
            </button>

            {status && (
              <div
                aria-live="polite"
                className={`rounded-2xl border p-5 text-center ${
                  wasSuccessful
                    ? "border-green-500/30 bg-green-500/10 text-green-300"
                    : "border-purple-500/30 bg-purple-500/10 text-purple-300"
                }`}
              >
                {wasSuccessful && (
                  <CheckCircle2 className="mx-auto mb-3" size={32} />
                )}

                <p className="font-semibold">{status}</p>
              </div>
            )}
          </form>
        </section>
      </main>
    </>
  );
}