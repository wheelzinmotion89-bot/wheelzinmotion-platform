"use client";

import Navbar from "@/components/layout/Navbar";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function ServiceRequestForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedService = searchParams.get("service") || "General Service";

  const [status, setStatus] = useState("");
  const [isSending, setIsSending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSending) {
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    setIsSending(true);
    setStatus("Sending your request...");

    try {
      const response = await fetch("/api/service-request", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Unable to send your service request.",
        );
      }

      const reference =
        typeof result.reference === "string"
          ? result.reference
          : "Request Received";

      const service =
        typeof result.service === "string"
          ? result.service
          : selectedService;

      const query = new URLSearchParams({
        reference,
        service,
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
    <section className="mx-auto max-w-3xl rounded-3xl border border-purple-500/30 bg-zinc-950 p-8 shadow-[0_0_45px_rgba(147,51,234,.35)] md:p-10">
      <p className="text-sm font-bold uppercase tracking-[0.4em] text-purple-400">
        WheelzInMotion Services
      </p>

      <h1 className="mt-4 text-4xl font-black uppercase text-white md:text-5xl">
        Request Service
      </h1>

      <p className="mt-4 leading-7 text-zinc-300">
        Complete the form below and WheelzInMotion will review your request and
        reply by email.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
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

        <div>
          <label
            htmlFor="service"
            className="mb-2 block font-bold text-purple-300"
          >
            Selected Service
          </label>

          <input
            id="service"
            name="service"
            value={selectedService}
            readOnly
            required
            className="w-full cursor-not-allowed rounded-xl border border-purple-500/30 bg-zinc-900 p-4 text-purple-300 outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="mb-2 block font-bold text-purple-300"
          >
            Project or Repair Details
          </label>

          <textarea
            id="message"
            name="message"
            required
            rows={7}
            placeholder="Describe the project, repair issue, device, symptoms, or assistance you need."
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
            <LoadingSpinner label="Sending Request..." />
          ) : (
            "Submit Service Request"
          )}
        </button>

        {status && (
          <div
            aria-live="polite"
            className="rounded-2xl border border-red-500/30 bg-red-500/10 p-5 text-center text-red-300"
          >
            <p className="font-semibold">{status}</p>
          </div>
        )}
      </form>
    </section>
  );
}

function RequestPageLoading() {
  return (
    <section className="mx-auto flex min-h-[500px] max-w-3xl items-center justify-center rounded-3xl border border-purple-500/30 bg-zinc-950 p-8">
      <LoadingSpinner label="Loading Service Request..." />
    </section>
  );
}

export default function ServiceRequestPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-6 py-32 text-white">
        <Suspense fallback={<RequestPageLoading />}>
          <ServiceRequestForm />
        </Suspense>
      </main>
    </>
  );
}