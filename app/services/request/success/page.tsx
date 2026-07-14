import Navbar from "@/components/layout/Navbar";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { Suspense } from "react";
import SuccessContent from "./SuccessContent";

function SuccessPageLoading() {
  return (
    <section className="flex min-h-[500px] w-full max-w-3xl items-center justify-center rounded-3xl border border-purple-500/30 bg-zinc-950 p-8">
      <LoadingSpinner label="Loading Confirmation..." />
    </section>
  );
}

export default function ServiceRequestSuccessPage() {
  return (
    <>
      <Navbar />

      <main className="flex min-h-screen items-center justify-center bg-black px-6 py-32 text-white">
        <Suspense fallback={<SuccessPageLoading />}>
          <SuccessContent />
        </Suspense>
      </main>
    </>
  );
}