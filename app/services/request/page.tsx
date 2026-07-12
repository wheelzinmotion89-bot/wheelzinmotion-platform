"use client";

import Navbar from "@/components/layout/Navbar";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ServiceRequestPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedService = searchParams.get("service") || "";

  const [status, setStatus] = useState("");
  const [isSending, setIsSending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSending) {
      return;
    }

    setIsSending(true);
    setStatus("Sending your request...");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/service-request", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong.");
      }

      const query = new URLSearchParams({
        reference: result.reference,
        service: result.service,
      });

      router.push(`/services/request/success?${query.toString()}`);
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );

      setIsSending(false);
    }
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-6 py-32 text-white">
        <section className="mx-auto max-w-3xl rounded-3xl border border-purple-500/30 bg-zinc-950 p-8 shadow-[0_0_45px_rgba(147,51,234,.35)] md:p-10">
          <h1 className="text-4xl font-black uppercase text-purple-400">
            Request Service
          </h1>

          <p className="mt-4 text-zinc-300">
            Complete the form below and we&apos;ll reply by email after
            reviewing your request.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <input
              name="name"
              required
              autoComplete="name"
              placeholder="Full Name"
              className="w-full rounded-xl border border-purple-500/30 bg-black p-4 text-white outline-none transition focus:border-purple-400"
            />

            <input
              name="email"
              required
              type="email"
              autoComplete="email"
              placeholder="Email Address"
              className="w-full rounded-xl border border-purple-500/30 bg-black p-4 text-white outline-none transition focus:border-purple-400"
            />

            <input
              name="service"
              value={selectedService}
              readOnly
              required
              className="w-full rounded-xl border border-purple-500/30 bg-zinc-900 p-4 text-purple-300 outline-none"
            />

            <textarea
              name="message"
              required
              rows={6}
              placeholder="Tell us about your project or repair..."
              className="w-full resize-y rounded-xl border border-purple-500/30 bg-black p-4 text-white outline-none transition focus:border-purple-400"
            />

            <div className="rounded-xl border border-purple-500/30 bg-black p-4">
              <label
                htmlFor="photos"
                className="block font-bold text-purple-300"
              >
                Upload Photos
              </label>

              <p className="mt-1 text-sm text-zinc-400">
                Optional. Upload up to 5 images, with a maximum size of 5 MB
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
              className="w-full rounded-full bg-purple-600 py-4 text-lg font-bold transition hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSending ? "Sending Request..." : "Submit Service Request"}
            </button>

            {status && (
              <p
                aria-live="polite"
                className="text-center text-sm text-purple-300"
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